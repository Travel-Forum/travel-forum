import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GridItem, Spinner, Text, VStack } from "@chakra-ui/react";

import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { usePosts } from "../../hooks/usePosts";
import { usePostModal } from "../../hooks/usePostModal";
import { usePostActions } from "../../hooks/usePostActions";
import { createPost, deletePost } from "../../services/postsService";
import { uploadPostMedia } from "../../services/mediaService";
import { showError, showSuccess } from "../../utils/toast";
import { filterAndSortPosts } from "../../utils/postFilters";

import PageGrid from "../../components/ui/PageGrid/PageGrid";
import ProfileCard from "../../components/profile/ProfileCard/ProfileCard";
import CreatePostTrigger from "../../components/posts/CreatePostTrigger/CreatePostTrigger";
import CreatePostModal from "../../components/posts/CreatePostModal/CreatePostModal";
import PostList from "../../components/posts/PostList/PostList";
import PostDetailsModal from "../../components/posts/PostDetailsModal/PostDetailsModal";
import ConfirmDialog from "../../components/ui/ConfirmDialog/ConfirmDialog";
import PostSortButtons from "../../components/posts/PostSortButtons/PostSortButtons";
import Footer from "../../components/sections/Footer/Footer";

const Feed = () => {
  const { user } = useAuth();
  const { profile, isBlocked } = useProfile();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const sort = searchParams.get("sort") ?? "newest";

  const { posts, loading, reload: refreshFeed } = usePosts();
  const visiblePosts = filterAndSortPosts(posts, query, sort);

  const handleSortChange = (nextSort) => {
    setSearchParams(
      (params) => {
        params.set("sort", nextSort);
        return params;
      },
      { replace: true },
    );
  };

  const {
    openPost,
    closePost,
    reloadPost,
    modalProps,
    isLiked,
    getLikeCount,
    toggleLike,
  } = usePostModal({
    userId: user?.id,
    onCommentsChange: refreshFeed,
  });

  const isOpenInDetails = (postId) => modalProps.post?.id === postId;

  const { startEdit, startDelete, editModalProps, deleteDialogProps } =
    usePostActions({
      onUpdated: (postId) => {
        refreshFeed();
        if (isOpenInDetails(postId)) reloadPost();
      },
      onDeleted: (postId) => {
        refreshFeed();
        if (isOpenInDetails(postId)) closePost();
      },
    });

  const handleCreatePost = async (formData) => {
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

  return (
    <PageGrid>
      {/* On smaller screens only the posts are shown; the info links move to the profile menu */}
      <GridItem overflowY="auto" hideBelow="lg">
        <ProfileCard profile={profile} to="/profile" />
        <Footer />
      </GridItem>
      <GridItem overflowY="auto" id="feed-scroll">
        <VStack gap={4} align="stretch">
          <CreatePostTrigger
            onOpenModal={() => setIsCreateOpen(true)}
            disabled={isBlocked}
          />
          <PostSortButtons value={sort} onChange={handleSortChange} />

          <CreatePostModal
            open={isCreateOpen}
            onClose={() => setIsCreateOpen(false)}
            onSubmit={handleCreatePost}
          />

          <PostDetailsModal
            {...modalProps}
            onEditPost={startEdit}
            onDeletePost={startDelete}
            disabled={isBlocked}
          />
          <CreatePostModal {...editModalProps} />
          <ConfirmDialog {...deleteDialogProps} />

          {loading && (
            <Spinner alignSelf="center" color="colorPalette.solid" mt={4} />
          )}

          {!loading && posts.length === 0 && (
            <Text color="fg.muted" textAlign="center" mt={4}>
              No posts yet. Be the first to share your travel story!
            </Text>
          )}

          {!loading && posts.length > 0 && visiblePosts.length === 0 && (
            <Text color="fg.muted" textAlign="center" mt={4}>
              No posts match "{query}"
            </Text>
          )}

          <PostList
            posts={visiblePosts}
            isLiked={isLiked}
            getLikeCount={getLikeCount}
            onToggleLike={toggleLike}
            onOpen={openPost}
            currentUserId={user?.id}
            onEdit={startEdit}
            onDelete={startDelete}
            disabled={isBlocked}
          />
        </VStack>
      </GridItem>
    </PageGrid>
  );
};

export default Feed;
