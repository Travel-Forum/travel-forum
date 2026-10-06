import { supabase } from "../config/supabaseClient";
import { toFriendlyError } from "../utils/errors";
import { getSignedMediaUrls, deletePostMedia } from "./mediaService";

export const AUTHOR_FIELDS = "id, username, first_name, last_name, avatar_url";
const NOT_OWNER_ERROR = { message: "You can only change your own posts." };
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

export const deletePost = async (postId) => {

  const { error: deleteError } = await deletePostMedia(postId);
  
  if (deleteError) {
    return { error: deleteError };
  }
  

  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId)
    .select("id");

  if (error) {
    console.error("Delete post error:", error.message);
    return { error: toFriendlyError(error) };
  }

  if (data.length === 0) {
    return { error: NOT_OWNER_ERROR };
  }

  return {};
};

export const updatePost = async (postId, { title, content, visibility }) => {

  const { data, error } = await supabase
    .from("posts")
    .update({ title, content, visibility })
    .eq("id", postId)
    .select("id")
  
  if (error) {
    console.error("Update post error:", error.message);
    return { error: toFriendlyError(error) };
  }

  if (data.length === 0) return { error: NOT_OWNER_ERROR };

  return {};
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
      comments(count),
      post_media (
        id,
        storage_path,
        media_type
      )
    `)
    .order("created_at", { ascending: false })
    .order("created_at", { referencedTable: "post_media", ascending: true });

  if (error) {
    console.error("Get feed posts error:", error.message);
    return { error: toFriendlyError(error) };
  }

  return { data: await withMediaUrls(data) };
};
const withMediaUrls = async (posts) => {
  const paths = posts.flatMap((post) =>
    post.post_media.map((media) => media.storage_path),
  );
  const { data: urlsByPath = {} } = await getSignedMediaUrls(paths);

  return posts.map(({ post_media, ...post }) => ({
    ...post,
    media: post_media
      .map((media) => ({
        id: media.id,
        type: media.media_type,
        url: urlsByPath[media.storage_path],
      }))
      .filter((media) => media.url),
  }));
};

export const getPostById = async (postId) => {
  const { data, error } = await supabase
    .from("posts")
    .select(`
      id,
      title,
      content,
      created_at,
      author:profiles!author_id (${AUTHOR_FIELDS}),
      post_likes(count),
      comments (
        id,
        parent_comment_id,
        content,
        created_at,
        author:profiles!author_id (${AUTHOR_FIELDS})
      ),
      post_media (
        id,
        storage_path,
        media_type
      )
    `)
    .eq("id", postId)
    .order("created_at", { referencedTable: "comments", ascending: true })
    .order("created_at", { referencedTable: "post_media", ascending: true })
    .maybeSingle();

  if (error) {
    console.error("Get post by id error:", error.message);
    return { error: toFriendlyError(error) };
  }

  if (!data) return { data: null };

  const [post] = await withMediaUrls([data]);
  return { data: post };
};
