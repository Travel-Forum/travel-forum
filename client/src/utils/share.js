import { appUrl } from "../config/environments";
import { showSuccess, showError } from "./toast";

/**
 * Shares a link that opens the post in the feed: the phone's share sheet
 * when there is one, otherwise the link is copied. Closing the share sheet
 * is not treated as an error.
 * @param {{ id: string, title: string }} post
 * @returns {Promise<void>}
 */
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
