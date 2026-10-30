import {
  createComment,
  deleteComment,
  updateComment,
} from "../services/commentsService";
import { showError } from "../utils/toast";

/**
 * Add, edit and delete comments on one post. Each action shows a toast on
 * error and calls `onChange` on success so the post can be reloaded.
 * @param {{ postId: string, userId: string, onChange: () => Promise<void> }} options
 * @returns {{ addComment: (content: string, parentCommentId?: string | null) => Promise<boolean>, editComment: (commentId: string, content: string) => Promise<boolean>, removeComment: (commentId: string) => Promise<boolean> }}
 *   Each action resolves to `true` when it succeeded.
 */
export const usePostComments = ({ postId, userId, onChange }) => {
  const runAction = async (request, errorTitle) => {
    const { error } = await request;

    if (error) {
      showError(errorTitle, error);
      return false;
    }

    await onChange();
    return true;
  };

  const addComment = (content, parentCommentId = null) =>
    runAction(
      createComment({ postId, authorId: userId, content, parentCommentId }),
      "Could not add comment",
    );

  const editComment = (commentId, content) =>
    runAction(
      updateComment({ commentId, content }),
      "Could not update comment",
    );

  const removeComment = (commentId) =>
    runAction(deleteComment(commentId), "Could not delete comment");

  return { addComment, editComment, removeComment };
};
