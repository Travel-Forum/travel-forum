import { useState } from "react";
import { getPostById } from "../services/postsService";
import { showError } from "../utils/toast";

/**
 * Loads the post shown in the details modal. `reloadPost` keeps the already
 * signed media URLs, so images don't reload after a new comment.
 * @returns {{ post: object | null, loading: boolean, isOpen: boolean, openPost: (postId: string) => Promise<void>, closePost: () => void, reloadPost: () => Promise<void> }}
 */
export const usePostDetails = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const openPost = async (postId) => {
    setLoading(true);
    const { data, error } = await getPostById(postId);
    setLoading(false);

    if (error) {
      showError("Could not open post", error);
      return;
    }

    if (!data) {
      showError("Post not found", {
        message: "This post doesn't exist or was deleted.",
      });
      return;
    }

    setPost(data);
  };

  const closePost = () => setPost(null);

  const reloadPost = async () => {
    if (!post) return;

    const { data, error } = await getPostById(post.id);

    if (error) {
      showError("Could not refresh post", error);
      return;
    }

    setPost((current) => current && data && { ...data, media: current.media });
  };

  return {
    post,
    loading,
    isOpen: loading || post !== null,
    openPost,
    closePost,
    reloadPost,
  };
};
