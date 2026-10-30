import { usePostDetails } from "./usePostDetails";
import { usePostLikes } from "./usePostLikes";
import { usePostComments } from "./usePostComments";
import { getPostLikeCount } from "../utils/post";

/**
 * Everything the post details modal needs in one place: the post, its likes
 * and its comments. Spread `modalProps` on PostDetailsModal.
 * @param {{ userId: string, onCommentsChange?: () => void }} options
 *   `onCommentsChange` lets the page refresh its comment counts.
 * @returns {{ openPost: (postId: string) => Promise<void>, closePost: () => void, reloadPost: () => Promise<void>, modalProps: object, isLiked: Function, getLikeCount: Function, toggleLike: Function }}
 */
export const usePostModal = ({ userId, onCommentsChange }) => {
  const { post, loading, isOpen, openPost, closePost, reloadPost } =
    usePostDetails();
  const { isLiked, getLikeCount, toggleLike } = usePostLikes(userId);

  const handleCommentsChange = async () => {
    await reloadPost();
    onCommentsChange?.();
  };

  const { addComment, editComment, removeComment } = usePostComments({
    postId: post?.id,
    userId,
    onChange: handleCommentsChange,
  });

  const likeCount = post ? getLikeCount(post.id, getPostLikeCount(post)) : 0;

  const modalProps = {
    open: isOpen,
    post,
    loading,
    onClose: closePost,
    liked: post ? isLiked(post.id) : false,
    likeCount,
    onToggleLike: () => toggleLike(post.id, likeCount),
    currentUserId: userId,
    onAddComment: addComment,
    onReplyComment: (parentId, content) => addComment(content, parentId),
    onEditComment: editComment,
    onDeleteComment: removeComment,
  };

  return {
    openPost,
    closePost,
    reloadPost,
    modalProps,
    isLiked,
    getLikeCount,
    toggleLike,
  };
};
