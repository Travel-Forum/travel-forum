import { supabase } from "../config/supabaseClient";
import { toFriendlyError } from "../utils/errors";

const BUCKET = "post-media";
const SIGNED_URL_TTL_SECONDS = 60 * 60;

const buildStoragePath = (userId, postId, file) => {
  const extension = file.name.split(".").pop();
  return `${userId}/${postId}/${crypto.randomUUID()}.${extension}`;
};

const getMediaType = (file) =>
  file.type.startsWith("video/") ? "video" : "image";

const removeUploadedFiles = async (paths) => {
  if (paths.length === 0) return;

  const { error } = await supabase.storage.from(BUCKET).remove(paths);
  if (error) console.error("Remove uploaded media error:", error.message);
};

export const uploadPostMedia = async ({ userId, postId, files }) => {
  const uploadedPaths = [];

  for (const file of files) {
    const path = buildStoragePath(userId, postId, file);

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, file);

    if (uploadError) {
      console.error(`Upload ${file.name} error:`, uploadError.message);
      await removeUploadedFiles(uploadedPaths);
      return { error: new Error(`"${file.name}" could not be uploaded.`) };
    }

    const { error: insertError } = await supabase.from("post_media").insert({
      post_id: postId,
      storage_path: path,
      media_type: getMediaType(file),
    });

    if (insertError) {
      console.error(`Insert media record for ${file.name} error:`, insertError.message);
      await removeUploadedFiles(uploadedPaths);
      return { error: new Error(`"${file.name}" could not be saved.`) };
    }

    uploadedPaths.push(path);
  }

  return { data: uploadedPaths };
};

export const getSignedMediaUrls = async (paths) => {
  if (paths.length === 0) return { data: {} };

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrls(paths, SIGNED_URL_TTL_SECONDS);

  if (error) {
    console.error("Create signed media URLs error:", error.message);
    return { error };
  }

  const urlsByPath = Object.fromEntries(
    data
      .filter((item) => item.signedUrl)
      .map((item) => [item.path, item.signedUrl]),
  );
  return { data: urlsByPath };
};


export const deletePostMedia = async (postId) => {

  const { data, error } = await supabase
    .from("post_media")
    .select("storage_path")
    .eq("post_id", postId);

  if (error) {
    console.error("Cannot delete a post", error.message);
    return { error: toFriendlyError(error) };
  };

  const paths = data.map((media) => media.storage_path);

  await removeUploadedFiles(paths);

  return {};

};