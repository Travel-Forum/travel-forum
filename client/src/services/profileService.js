import { supabase } from "../config/supabaseClient";
import { failWith, toFriendlyError } from "../utils/errors";

/**
 * Loads the signed-in user's own profile, with private columns.
 * @param {string} userId
 * @returns {Promise<{ data?: object | null, error?: Error }>} `null` when the
 *   profile isn't completed yet.
 */
export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    return failWith("Get profile error", error);
  }

  return { data };
};

/**
 * Creates the profile after sign up. The database only accepts the email of
 * the signed-in account.
 * @param {{ id: string, email: string, firstName: string, lastName: string, username: string, phone: string }} profile
 * @returns {Promise<{ error?: Error }>}
 */
export const createProfile = async ({
  id,
  email,
  firstName,
  lastName,
  username,
  phone,
}) => {
  const { error } = await supabase.from("profiles").insert({
    id,
    email,
    first_name: firstName,
    last_name: lastName,
    username,
    phone,
  });

  if (error) {
    console.error("Failed to create profile:", error.message);

    if (error.code === "23505") {
      return { error: { message: "This username is already taken." } };
    }

    return { error: toFriendlyError(error) };
  }

  return {};
};

/**
 * Changes the user's name and phone (username and email can't be changed).
 * @param {string} userId
 * @param {{ firstName: string, lastName: string, phone: string }} changes
 * @returns {Promise<{ data?: object, error?: Error }>} The updated profile.
 */
export const updateProfile = async (userId, { firstName, lastName, phone }) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      first_name: firstName,
      last_name: lastName,
      phone,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    return failWith("Failed to update profile", error);
  }

  return { data };
};

const AVATARS_BUCKET = "avatars";
const MAX_AVATAR_SIZE = 10 * 1024 * 1024;
const AVATAR_EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/**
 * Uploads a JPEG, PNG or WebP image (up to 10 MB) and saves it as the avatar.
 * The upload is removed again if the profile can't be updated.
 * @param {string} userId
 * @param {File} file
 * @returns {Promise<{ data?: object, error?: Error }>} The updated profile.
 */
export const uploadAvatar = async (userId, file) => {
  if (!file || !AVATAR_EXTENSIONS[file.type]) {
    return {
      error: new Error("Please choose a JPEG, PNG, or WebP image."),
    };
  }

  if (file.size > MAX_AVATAR_SIZE) {
    return {
      error: new Error("Avatar image must be smaller than 10 MB."),
    };
  }

  const path = `${userId}/${crypto.randomUUID()}.${AVATAR_EXTENSIONS[file.type]}`;

  const { error: uploadError } = await supabase.storage
    .from(AVATARS_BUCKET)
    .upload(path, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    console.error("Upload avatar error:", uploadError.message);
    return { error: new Error("The avatar could not be uploaded.") };
  }

  const { data: publicUrlData } = supabase.storage
    .from(AVATARS_BUCKET)
    .getPublicUrl(path);

  const { data, error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrlData.publicUrl })
    .eq("id", userId)
    .select()
    .single();

  if (updateError) {
    console.error("Update avatar URL error:", updateError.message);
    const { error: cleanupError } = await supabase.storage
      .from(AVATARS_BUCKET)
      .remove([path]);

    if (cleanupError) {
      console.error("Cleanup avatar upload error:", cleanupError.message);
    }

    return { error: toFriendlyError(updateError) };
  }

  return { data };
};

/**
 * Admin search by username, email or name (up to 20 results).
 * @param {string} query
 * @returns {Promise<{ data?: object[], error?: Error }>}
 */
export const searchProfiles = async (query) => {
  // The text goes inside a PostgREST filter string, where , ( ) " \ split
  // or break the filter and % * act as wildcards, so they are dropped.
  const search = (query ?? "").replace(/[,()"\\%*]/g, "").trim();

  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, username, first_name, last_name, email, avatar_url, is_admin, is_blocked",
    )
    .or(
      `username.ilike.%${search}%,email.ilike.%${search}%,first_name.ilike.%${search}%,last_name.ilike.%${search}%`,
    )
    .order("username")
    .limit(20);

  if (error) {
    return failWith("Cannot find profiles", error);
  }

  return { data };
};

/**
 * Blocks or unblocks a user (admins only).
 * @param {string} userId
 * @param {boolean} isBlocked
 * @returns {Promise<{ error?: Error }>}
 */
export const setUserBlocked = async (userId, isBlocked) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      is_blocked: isBlocked,
    })
    .eq("id", userId)
    .select("id");

  if (error) {
    return failWith("Update blocked status error", error);
  }

  if (data.length === 0) {
    return { error: { message: "Only admins can change other users." } };
  }

  return {};
};

/**
 * Gives or removes admin rights (admins only).
 * @param {string} userId
 * @param {boolean} isAdmin
 * @returns {Promise<{ error?: Error }>}
 */
export const setUserAdmin = async (userId, isAdmin) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      is_admin: isAdmin,
    })
    .eq("id", userId)
    .select("id");

  if (error) {
    return failWith("Update admin status error", error);
  }

  if (data.length === 0) {
    return { error: { message: "Only admins can change other users." } };
  }

  return {};
};

/**
 * Listens in real time for changes to the user's profile, e.g. being blocked.
 * @param {string} userId
 * @param {(payload: { new: object }) => void} onChange
 * @returns {() => void} Stops listening; call it in the effect cleanup.
 */
export const subscribeToProfile = (userId, onChange) => {
  const channel = supabase
    .channel(`profiles:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "profiles",
        filter: `id=eq.${userId}`,
      },
      onChange,
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
};

/**
 * Loads another user's public profile (no email or phone).
 * @param {string} username
 * @returns {Promise<{ data?: object | null, error?: Error }>} `null` when no
 *   user has this username.
 */
export const getProfileByUsername = async (username) => {
  const { data, error } = await supabase
    .from("public_profiles")
    .select("id, username, first_name, last_name, is_admin, avatar_url")
    .eq("username", username)
    .maybeSingle();

  if (error) {
    return failWith("Failed to get user by username", error);
  }

  return { data };
};
