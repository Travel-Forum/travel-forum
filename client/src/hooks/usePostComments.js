import {
  createComment,
  deleteComment,
  updateComment,
} from "../services/commentsService";
import { showError } from "../utils/toast";

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
    runAction(updateComment({ commentId, content }), "Could not update comment");

  const removeComment = (commentId) =>
    runAction(deleteComment(commentId), "Could not delete comment");

  return { addComment, editComment, removeComment };
};