import { supabase } from "../config/supabaseClient";
import { toFriendlyError } from "../utils/errors";

export const getProfile = (userId) =>
  supabase.from("profiles").select("*").eq("id", userId).maybeSingle();

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
    console.error("Failed to update profile:", error.message);
    return { error: toFriendlyError(error) };
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

export const searchProfiles = async (query) => {
  const search = (query ?? "").trim();

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
    console.error("Cannot find profiles:", error.message);
    return { error: toFriendlyError(error) };
  }

  return { data };
};

export const setUserBlocked = async (userId, isBlocked) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      is_blocked: isBlocked,
    })
    .eq("id", userId)
    .select("id");

  if (error) {
    console.error("Update blocked status error:", error.message);
    return { error: toFriendlyError(error) };
  }

  if (data.length === 0) {
    return { error: { message: "Only admins can change other users." } };
  }

  return {};
};

export const setUserAdmin = async (userId, isAdmin) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      is_admin: isAdmin,
    })
    .eq("id", userId)
    .select("id");

  if (error) {
    console.error("Update admin status error:", error.message);
    return { error: toFriendlyError(error) };
  }

  if (data.length === 0) {
    return { error: { message: "Only admins can change other users." } };
  }

  return {};
};

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

export const getProfileByUsername = async (username) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, first_name, last_name, is_admin, avatar_url")
    .eq("username", username)
    .maybeSingle();

  if (error) {
    console.error("Failed to get user by username:", error.message);
    return { error: toFriendlyError(error) };
  }

  return { data };
};
