import { appUrl } from "../config/environments";
import { showSuccess, showError } from "./toast";

export const sharePost = async (post) => {
  try {
    const link = `${appUrl}/feed?post=${post.id}`;

    if (navigator.share) {
      await navigator.share({ title: post.title, url: link });
      return;
    }

    await navigator.clipboard.writeText(link);
    showSuccess("Link copied");
  } catch (error) {
    if (error.name === "AbortError") return;

    showError("Could not share the post", error);
  }
};
