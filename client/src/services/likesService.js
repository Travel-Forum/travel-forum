import { supabase } from "../config/supabaseClient";
import { toFriendlyError } from "../utils/errors";

export const likePost = async ({ postId, userId }) => {
  const { error } = await supabase
    .from("post_likes")
    .insert({ post_id: postId, user_id: userId });

  if (error) {
    console.error("Like post error:", error.message);
    return { error: toFriendlyError(error) };
  }
  return {};
};

export const unlikePost = async ({ postId, userId }) => {
  const { error } = await supabase
    .from("post_likes")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId);

  if (error) {
    console.error("Unlike post error:", error.message);
    return { error: toFriendlyError(error) };
  }
  return {};
};