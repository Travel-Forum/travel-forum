import { useEffect, useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import { usePosts } from "../../hooks/usePosts";
import { usePostModal } from "../../hooks/usePostModal";
import { getProfileByUsername } from "../../services/profileService";
import { showError } from "../../utils/toast";

// Loads another user's public profile and their posts.
export const useUserProfile = (username) => {
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

  return {
    profile,
    loading: profileLoading || postsLoading,
    posts,
    currentUserId: currentProfile.id,
    isBlocked,
    openPost,
    modalProps,
    isLiked,
    getLikeCount,
    toggleLike,
  };
};
