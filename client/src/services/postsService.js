import { supabase } from "../config/supabaseClient";
import { failWith } from "../utils/errors";
import { getSignedMediaUrls, deletePostMedia } from "./mediaService";

/** The public author columns selected together with posts, comments and notifications. */
export const AUTHOR_FIELDS = "id, username, first_name, last_name, avatar_url";
const NOT_OWNER_ERROR = { message: "You can only change your own posts." };

/**
 * Loads the newest posts for the home page (RLS shows guests only public ones).
 * @param {number} [limit=10]
 * @returns {Promise<{ data?: object[], error?: Error }>}
 */
export const getLatestPosts = async (limit = 10) => {
  const { data, error } = await supabase
    .from("posts_with_comment_count")
    .select("id, title, content, created_at, comment_count")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return failWith("Get latest posts error", error);
  }
  return { data };
};

/**
 * Loads the most commented posts for the home page.
 * @param {number} [limit=10]
 * @returns {Promise<{ data?: object[], error?: Error }>}
 */
export const getMostCommentedPosts = async (limit = 10) => {
  const { data, error } = await supabase
    .from("posts_with_comment_count")
    .select("id, title, content, created_at, comment_count")
    .order("comment_count", { ascending: false })
    .limit(limit);

  if (error) {
    return failWith("Get most commented posts error", error);
  }
  return { data };
};

/**
 * Creates a post. Its media is uploaded afterwards with uploadPostMedia.
 * @param {{ authorId: string, title: string, content: string, visibility: "public" | "private" }} post
 * @returns {Promise<{ data?: object, error?: Error }>} The new post row.
 */
export const createPost = async ({ authorId, title, content, visibility }) => {
  const { data, error } = await supabase
    .from("posts")
    .insert({ author_id: authorId, title, content, visibility })
    .select()
    .single();

  if (error) {
    return failWith("Create post error", error);
  }
  return { data };
};

/**
 * Deletes a post's files from Storage and then the post itself (its comments,
 * likes and media rows are removed by the database).
 * @param {string} postId
 * @returns {Promise<{ error?: Error }>} An error also when RLS matched no row,
 *   which means the user is neither the author nor an admin.
 */
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
    return failWith("Delete post error", error);
  }

  if (data.length === 0) {
    return { error: NOT_OWNER_ERROR };
  }

  return {};
};

/**
 * Changes a post's title, text or visibility.
 * @param {string} postId
 * @param {{ title: string, content: string, visibility: "public" | "private" }} changes
 * @returns {Promise<{ error?: Error }>} An error also when RLS matched no row.
 */
export const updatePost = async (postId, { title, content, visibility }) => {
  const { data, error } = await supabase
    .from("posts")
    .update({ title, content, visibility })
    .eq("id", postId)
    .select("id");

  if (error) {
    return failWith("Update post error", error);
  }

  if (data.length === 0) return { error: NOT_OWNER_ERROR };

  return {};
};

/**
 * Loads the feed, newest first, with authors, like and comment counts and
 * signed media URLs. RLS leaves out other users' private posts.
 * @param {{ authorId?: string }} [options] Only this author's posts when given.
 * @returns {Promise<{ data?: object[], error?: Error }>}
 */
export const getFeedPosts = async ({ authorId } = {}) => {
  let query = supabase
    .from("posts")
    .select(
      `
      id,
      title,
      content,
      visibility,
      created_at,
      author:public_profiles!author_id (
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
    `,
    )
    .order("created_at", { ascending: false })
    .order("created_at", { referencedTable: "post_media", ascending: true });

  if (authorId) {
    query = query.eq("author_id", authorId);
  }

  const { data, error } = await query;

  if (error) {
    return failWith("Get feed posts error", error);
  }

  return { data: await withMediaUrls(data) };
};

// Replaces each post's post_media rows with { id, type, url } items,
// signing all paths in one request.
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

/**
 * Loads one post with its comments (oldest first), likes and media.
 * @param {string} postId
 * @returns {Promise<{ data?: object | null, error?: Error }>} `null` when the
 *   post doesn't exist or the user can't see it.
 */
export const getPostById = async (postId) => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      title,
      content,
      visibility,
      created_at,
      author:public_profiles!author_id (${AUTHOR_FIELDS}),
      post_likes(count),
      comments (
        id,
        parent_comment_id,
        content,
        created_at,
        author:public_profiles!author_id (${AUTHOR_FIELDS})
      ),
      post_media (
        id,
        storage_path,
        media_type
      )
    `,
    )
    .eq("id", postId)
    .order("created_at", { referencedTable: "comments", ascending: true })
    .order("created_at", { referencedTable: "post_media", ascending: true })
    .maybeSingle();

  if (error) {
    return failWith("Get post by id error", error);
  }

  if (!data) return { data: null };

  const [post] = await withMediaUrls([data]);
  return { data: post };
};
