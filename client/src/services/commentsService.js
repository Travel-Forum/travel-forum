import { supabase } from "../config/supabaseClient";
import { toFriendlyError } from "../utils/errors";

// parentCommentId is null for a comment on the post itself,
// or the id of the comment this one replies to.
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