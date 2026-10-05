import { supabase } from "../config/supabaseClient";
import { toFriendlyError } from "../utils/errors";

export const getProfile = (userId) =>
  supabase.from("profiles").select("*").eq("id", userId).maybeSingle();

export const createProfile = ({ id, email, firstName, lastName, username, phone }) =>
  supabase.from("profiles").insert({
    id,
    email,
    first_name: firstName,
    last_name: lastName,
    username,
    phone,
  });

export const updateProfile = async (userId, { firstName, lastName, email, phone }) => {

  const { data, error } = await supabase
    .from("profiles")
    .update({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
    })
    .eq("id", userId)
    .select().single();

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