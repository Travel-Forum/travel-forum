import { supabase } from "../config/supabaseClient";
import { toFriendlyError } from "../utils/errors";

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
    console.error("Create comment error:", error.message);
    return { error: toFriendlyError(error) };
  }
  return {};
};

const NOT_OWNER_ERROR = { message: "You can only change your own comments." };

export const updateComment = async ({ commentId, content }) => {
  const { data, error } = await supabase
    .from("comments")
    .update({ content })
    .eq("id", commentId)
    .select("id");

  if (error) {
    console.error("Update comment error:", error.message);
    return { error: toFriendlyError(error) };
  }
  if (data.length === 0) return { error: NOT_OWNER_ERROR };
  return {};
};

export const deleteComment = async (commentId) => {
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .select("id");

  if (error) {
    console.error("Delete comment error:", error.message);
    return { error: toFriendlyError(error) };
  }
  if (data.length === 0) return { error: NOT_OWNER_ERROR };
  return {};
};