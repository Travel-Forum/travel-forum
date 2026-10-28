import { useState, useEffect, useEffectEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { usePosts } from "../../hooks/usePosts";
import { usePostModal } from "../../hooks/usePostModal";
import { usePostActions } from "../../hooks/usePostActions";
import { createPost, deletePost } from "../../services/postsService";
import { uploadPostMedia } from "../../services/mediaService";
import { showError, showSuccess } from "../../utils/toast";
import { filterAndSortPosts } from "../../utils/postFilters";

export const useFeed = () => {
  const { user } = useAuth();
  const { profile, isBlocked } = useProfile();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const sort = searchParams.get("sort") ?? "newest";
  const sharedPostId = searchParams.get("post");

  const { posts, loading, reload: refreshFeed } = usePosts();
  const visiblePosts = filterAndSortPosts(posts, query, sort);

  const changeSort = (nextSort) => {
    setSearchParams(
      (params) => {
        params.set("sort", nextSort);
        return params;
      },
      { replace: true },
    );
  };

  const postModal = usePostModal({
    userId: user?.id,
    onCommentsChange: refreshFeed,
  });

  const openSharedPost = useEffectEvent((id) => postModal.openPost(id));

  const isOpenInDetails = (postId) => postModal.modalProps.post?.id === postId;

  const postActions = usePostActions({
    onUpdated: (postId) => {
      refreshFeed();
      if (isOpenInDetails(postId)) postModal.reloadPost();
    },
    onDeleted: (postId) => {
      refreshFeed();
      if (isOpenInDetails(postId)) closePost();
    },
  });

  const createNewPost = async (formData) => {
    const { data: post, error } = await createPost({
      authorId: user.id,
      ...formData,
    });

    if (error) {
      showError("Could not create post", error);
      return;
    }

    const { error: mediaError } = await uploadPostMedia({
      userId: user.id,
      postId: post.id,
      files: formData.media,
    });

    if (mediaError) {
      // Roll back so a retry doesn't create a duplicate post
      await deletePost(post.id);
      showError("Could not upload media", mediaError);
      return;
    }

    showSuccess("Post created", "Your post is now live.");
    setIsCreateOpen(false);
    refreshFeed();
  };

  useEffect(() => {
    if (sharedPostId) openSharedPost(sharedPostId);
  }, [sharedPostId]);

  const closePost = () => {
    postModal.closePost();
    setSearchParams(
      (params) => {
        params.delete("post");
        return params;
      },
      { replace: true },
    );
  };

  return {
    userId: user?.id,
    profile,
    isBlocked,
    query,
    sort,
    changeSort,
    posts,
    visiblePosts,
    loading,
    createModalProps: {
      open: isCreateOpen,
      onClose: () => setIsCreateOpen(false),
      onSubmit: createNewPost,
    },
    openCreate: () => setIsCreateOpen(true),
    openPost: postModal.openPost,
    modalProps: { ...postModal.modalProps, onClose: closePost },
    isLiked: postModal.isLiked,
    getLikeCount: postModal.getLikeCount,
    toggleLike: postModal.toggleLike,
    startEdit: postActions.startEdit,
    startDelete: postActions.startDelete,
    editModalProps: postActions.editModalProps,
    deleteDialogProps: postActions.deleteDialogProps,
  };
};
