import { useState } from "react";
import { getPostById } from "../services/postsService";
import { showError } from "../utils/toast";

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