import { useEffect, useRef, useState } from "react";
import {
  getLikedPostIds,
  likePost,
  unlikePost,
} from "../services/likesService";
import { showError } from "../utils/toast";

const toggleId = (ids, id) =>
  ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];

/**
 * Likes with optimistic UI: the heart and the count change at once and are
 * rolled back if the request fails. A second click on the same post is
 * ignored until the first request finishes.
 * @param {string} userId
 * @returns {{ isLiked: (postId: string) => boolean, getLikeCount: (postId: string, initialCount: number) => number, toggleLike: (postId: string, currentCount: number) => Promise<void> }}
 */
export const usePostLikes = (userId) => {
  const [likedPostIds, setLikedPostIds] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const pendingPostIds = useRef(new Set());

  useEffect(() => {
    if (!userId) return;

    let ignore = false;

    getLikedPostIds(userId).then(({ data }) => {
      if (!ignore && data) setLikedPostIds(data);
    });

    return () => {
      ignore = true;
    };
  }, [userId]);

  const isLiked = (postId) => likedPostIds.includes(postId);

  const getLikeCount = (postId, initialCount) =>
    likeCounts[postId] ?? initialCount;

  const toggleLike = async (postId, currentCount) => {
    if (pendingPostIds.current.has(postId)) return;
    pendingPostIds.current.add(postId);

    const wasLiked = isLiked(postId);
    const nextCount = wasLiked ? currentCount - 1 : currentCount + 1;

    setLikedPostIds((prev) => toggleId(prev, postId));
    setLikeCounts((prev) => ({ ...prev, [postId]: nextCount }));

    const { error } = wasLiked
      ? await unlikePost({ postId, userId })
      : await likePost({ postId, userId });

    if (error) {
      setLikedPostIds((prev) => toggleId(prev, postId));
      setLikeCounts((prev) => ({ ...prev, [postId]: currentCount }));
      showError("Could not update like", error);
    }

    pendingPostIds.current.delete(postId);
  };

  return { isLiked, getLikeCount, toggleLike };
};
