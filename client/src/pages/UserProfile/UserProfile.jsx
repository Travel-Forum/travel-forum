import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { GridItem, Text, VStack } from "@chakra-ui/react";

import { useProfile } from "../../hooks/useProfile";
import { usePosts } from "../../hooks/usePosts";
import { usePostModal } from "../../hooks/usePostModal";
import { getProfileByUsername } from "../../services/profileService";
import { showError } from "../../utils/toast";

import PageGrid from "../../components/ui/PageGrid/PageGrid";
import Loading from "../../components/ui/Loading/Loading";
import ErrorState from "../../components/ui/ErrorState/ErrorState";
import ProfileCard from "../../components/profile/ProfileCard/ProfileCard";
import PostList from "../../components/posts/PostList/PostList";
import PostDetailsModal from "../../components/posts/PostDetailsModal/PostDetailsModal";

const UserProfileContent = ({ username }) => {
  const { profile: currentProfile, isBlocked } = useProfile();
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const {
    posts,
    loading: postsLoading,
    reload: reloadPosts,
  } = usePosts({ authorId: profile?.id, enabled: profile !== null });

  const { openPost, modalProps, isLiked, getLikeCount, toggleLike } =
    usePostModal({
      userId: currentProfile.id,
      onCommentsChange: reloadPosts,
    });

  useEffect(() => {
    let ignore = false;

    getProfileByUsername(username).then(({ data, error }) => {
      if (ignore) return;

      if (error) {
        showError("Failed to load user by username", error);
      } else {
        setProfile(data);
      }

      setProfileLoading(false);
    });

    return () => {
      ignore = true;
    };
  }, [username]);

  if (profileLoading || postsLoading) return <Loading />;

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
            currentUserId={currentProfile.id}
            disabled={isBlocked}
          />
        </VStack>
      </GridItem>
    </PageGrid>
  );
};

const UserProfile = () => {
  const { username } = useParams();
  const { profile } = useProfile();

  if (username === profile.username) {
    return <Navigate to="/profile" replace />;
  }

  return <UserProfileContent key={username} username={username} />;
};

export default UserProfile;
