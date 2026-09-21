import { supabase } from "../../config/supabaseClient.js";

export const getLatestPosts = async (limit = 10) => {
  const { data, error } = await supabase
    .from("posts_with_comment_count")
    .select("id, title, content, created_at, comment_count")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.log("Get latest posts error:", error.message);
    return { error };
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
    console.log("Get most commented posts error:", error.message);
    return { error };
  }
  return { data };
};