import { supabase } from "../config/supabaseClient";
import { failWith } from "../utils/errors";

/**
 * Adds a comment to a post, or a reply when `parentCommentId` is given.
 * @param {{ postId: string, authorId: string, content: string, parentCommentId?: string | null }} comment
 * @returns {Promise<{ error?: Error }>}
 */
export const createComment = async ({
  postId,
  authorId,
  content,
  parentCommentId = null,
}) => {
  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    author_id: authorId,
    content,
    parent_comment_id: parentCommentId,
  });

  if (error) {
    return failWith("Create comment error", error);
  }
  return {};
};

const NOT_OWNER_ERROR = { message: "You can only change your own comments." };

/**
 * Changes the text of a comment.
 * @param {{ commentId: string, content: string }} comment
 * @returns {Promise<{ error?: Error }>} An error also when RLS matched no row,
 *   which means the comment isn't the user's.
 */
export const updateComment = async ({ commentId, content }) => {
  const { data, error } = await supabase
    .from("comments")
    .update({ content })
    .eq("id", commentId)
    .select("id");

  if (error) {
    return failWith("Update comment error", error);
  }
  if (data.length === 0) return { error: NOT_OWNER_ERROR };
  return {};
};

/**
 * Deletes a comment (its replies are removed by the database).
 * @param {string} commentId
 * @returns {Promise<{ error?: Error }>} An error also when RLS matched no row.
 */
export const deleteComment = async (commentId) => {
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .select("id");

  if (error) {
    return failWith("Delete comment error", error);
  }
  if (data.length === 0) return { error: NOT_OWNER_ERROR };
  return {};
};
