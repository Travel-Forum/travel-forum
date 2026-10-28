import { GridItem, Spinner, Text, VStack } from "@chakra-ui/react";
import { useFeed } from "./useFeed";
import { sharePost } from "../../utils/share";

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
  const {
    userId,
    profile,
    isBlocked,
    query,
    sort,
    changeSort,
    posts,
    visiblePosts,
    loading,
    createModalProps,
    openCreate,
    openPost,
    modalProps,
    isLiked,
    getLikeCount,
    toggleLike,
    startEdit,
    startDelete,
    editModalProps,
    deleteDialogProps,
  } = useFeed();

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
            profile={profile}
            onOpenModal={openCreate}
            disabled={isBlocked}
          />
          <PostSortButtons value={sort} onChange={changeSort} />

          <CreatePostModal {...createModalProps} />

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
            currentUserId={userId}
            onEdit={startEdit}
            onDelete={startDelete}
            onShare={sharePost}
            disabled={isBlocked}
          />
        </VStack>
      </GridItem>
    </PageGrid>
  );
};

export default Feed;
