import { supabase } from "../config/supabaseClient";

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

export const createPost = async ({ authorId, title, content }) => {
  const { data, error } = await supabase
    .from("posts")
    .insert({ author_id: authorId, title, content })
    .select()
    .single();

  if (error) {
    console.log("Create post error:", error.message);
    return { error };
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
    console.log("Get feed posts error:", error.message);
    return { error };
  }
  return { data };
};