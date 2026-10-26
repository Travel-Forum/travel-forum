import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Grid, GridItem, Text, VStack } from "@chakra-ui/react";

import { useProfile } from "../../hooks/useProfile";
import { usePostModal } from "../../hooks/usePostModal";
import { getProfileByUsername } from "../../services/profileService";
import { getFeedPosts } from "../../services/postsService";
import { showError } from "../../utils/toast";
import { getPostLikeCount } from "../../utils/post";

import Loading from "../../components/ui/Loading/Loading";
import ErrorState from "../../components/ui/ErrorState/ErrorState";
import ProfileCard from "../../components/profile/ProfileCard/ProfileCard";
import FeedPostCard from "../../components/posts/FeedPostCard/FeedPostCard";
import PostDetailsModal from "../../components/posts/PostDetailsModal/PostDetailsModal";

const UserProfileContent = ({ username }) => {
  const { profile: currentProfile } = useProfile();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const isBlocked = currentProfile.is_blocked;

  const reloadPosts = async () => {
    const { data } = await getFeedPosts({ authorId: profile.id });

    if (data) setPosts(data);
  };

  const { openPost, modalProps, isLiked, getLikeCount, toggleLike } =
    usePostModal({
      userId: currentProfile.id,
      onCommentsChange: reloadPosts,
    });

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      const { data: profileData, error: profileError } =
        await getProfileByUsername(username);

      if (ignore) return;

      if (profileError) {
        showError("Failed to load user by username", profileError);
        setLoading(false);
        return;
      }

      if (profileData === null) {
        setLoading(false);
        return;
      }

      const { data: postsData, error: postsError } = await getFeedPosts({
        authorId: profileData.id,
      });

      if (ignore) return;

      if (postsError) {
        showError("Failed to load posts for author", postsError);
      }

      setProfile(profileData);
      setPosts(postsData ?? []);
      setLoading(false);
    };

    load();

    return () => {
      ignore = true;
    };
  }, [username]);

  if (loading) return <Loading />;

  if (profile === null) return <ErrorState message="User not found" />;

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "1fr 2fr 1fr" }}
      templateRows={{ lg: "minmax(0, 1fr)" }}
      gap={{ base: 4, lg: 6 }}
      maxW="1200px"
      w="full"
      mx="auto"
      p={{ base: 2, md: 4 }}
      pt={{ base: 3, md: 6 }}
      flex="1"
      minH={{ lg: "0" }}
    >
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

          {posts.map((post) => {
            const likeCount = getLikeCount(post.id, getPostLikeCount(post));

            return (
              <FeedPostCard
                key={post.id}
                post={post}
                onOpen={openPost}
                liked={isLiked(post.id)}
                likeCount={likeCount}
                onToggleLike={() => toggleLike(post.id, likeCount)}
                currentUserId={currentProfile.id}
                disabled={isBlocked}
              />
            );
          })}
        </VStack>
      </GridItem>
    </Grid>
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
