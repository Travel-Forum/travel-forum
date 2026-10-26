import { supabase } from "../config/supabaseClient";
import { failWith } from "../utils/errors";

export const likePost = async ({ postId, userId }) => {
  const { error } = await supabase
    .from("post_likes")
    .insert({ post_id: postId, user_id: userId });

  if (error) {
    return failWith("Like post error", error);
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
    return failWith("Unlike post error", error);
  }
  return {};
};

export const getLikedPostIds = async (userId) => {
  const { data, error } = await supabase
    .from("post_likes")
    .select("post_id")
    .eq("user_id", userId);

  if (error) {
    return failWith("Get liked posts error", error);
  }
  return { data: data.map((like) => like.post_id) };
};
