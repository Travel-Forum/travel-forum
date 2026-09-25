import { supabase } from "../config/supabaseClient";
import { toFriendlyError } from "../utils/errors";

export const getLatestPosts = async (limit = 10) => {
  const { data, error } = await supabase
    .from("posts_with_comment_count")
    .select("id, title, content, created_at, comment_count")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Get latest posts error:", error.message);
    return { error: toFriendlyError(error) };
  }
  return { data };
};

export const getMostCommentedPosts = async (limit = 10) => {
  const { data, error } = await supabase
    .from("posts_with_comment_count")
    .select("id, title, content, created_at, comment_count")
    .order("comment_count", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Get most commented posts error:", error.message);
    return { error: toFriendlyError(error) };
  }
  return { data };
};

export const createPost = async ({ authorId, title, content, visibility }) => {
  const { data, error } = await supabase
    .from("posts")
    .insert({ author_id: authorId, title, content, visibility })
    .select()
    .single();

  if (error) {
    console.error("Create post error:", error.message);
    return { error: toFriendlyError(error) };
  }
  return { data };
};

export const getFeedPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select(`
      id,
      title,
      content,
      created_at,
      author:profiles!author_id (
        id,
        username,
        first_name,
        last_name,
        avatar_url
      ),
      post_likes(count),
      comments(count)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get feed posts error:", error.message);
    return { error: toFriendlyError(error) };
  }
  return { data };
};
