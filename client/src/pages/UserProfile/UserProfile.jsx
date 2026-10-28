import { useParams, Navigate } from "react-router-dom";
import { GridItem, Text, VStack } from "@chakra-ui/react";

import { useProfile } from "../../hooks/useProfile";
import { useUserProfile } from "./useUserProfile";
import { sharePost } from "../../utils/share";

import PageGrid from "../../components/ui/PageGrid/PageGrid";
import Loading from "../../components/ui/Loading/Loading";
import ErrorState from "../../components/ui/ErrorState/ErrorState";
import ProfileCard from "../../components/profile/ProfileCard/ProfileCard";
import PostList from "../../components/posts/PostList/PostList";
import PostDetailsModal from "../../components/posts/PostDetailsModal/PostDetailsModal";

const UserProfileContent = ({ username }) => {
  const {
    profile,
    loading,
    posts,
    currentUserId,
    isBlocked,
    openPost,
    modalProps,
    isLiked,
    getLikeCount,
    toggleLike,
  } = useUserProfile(username);

  if (loading) return <Loading />;

  if (profile === null) return <ErrorState message="User not found" />;

  return (
    <PageGrid minH={{ lg: "0" }}>
      {/* On smaller screens both columns stack and the whole page scrolls */}
      <GridItem overflowY={{ lg: "auto" }}>
        <ProfileCard profile={profile} />
      </GridItem>

      <GridItem overflowY={{ lg: "auto" }}>
        <VStack gap={4} align="stretch">
          <PostDetailsModal {...modalProps} disabled={isBlocked} />

          {posts.length === 0 && (
            <Text color="fg.muted" textAlign="center" mt={4}>
              @{profile.username} hasn't posted anything yet.
            </Text>
          )}

          <PostList
            posts={posts}
            isLiked={isLiked}
            getLikeCount={getLikeCount}
            onToggleLike={toggleLike}
            onOpen={openPost}
            currentUserId={currentUserId}
            onShare={sharePost}
            disabled={isBlocked}
          />
        </VStack>
      </GridItem>
    </PageGrid>
  );
};

// Your own username goes to /profile; `key` resets the page state
// when moving from one user to another.
const UserProfile = () => {
  const { username } = useParams();
  const { profile } = useProfile();

  if (username === profile.username) {
    return <Navigate to="/profile" replace />;
  }

  return <UserProfileContent key={username} username={username} />;
};

export default UserProfile;
