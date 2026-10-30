import { useEffect, useState } from "react";
import { getFeedPosts } from "../services/postsService";
import { showError } from "../utils/toast";

/**
 * Loads the feed posts, or only one author's posts when `authorId` is given.
 * `reload` fetches again without showing the loading state, so the list
 * doesn't flash while likes or comments are refreshed.
 * @param {{ authorId?: string | null, enabled?: boolean }} [options]
 *   `enabled: false` waits, e.g. until the author's profile is loaded.
 * @returns {{ posts: object[], setPosts: Function, loading: boolean, reload: () => void }}
 */
export const usePosts = ({ authorId = null, enabled = true } = {}) => {
  const [posts, setPosts] = useState([]);
  const [loadedFor, setLoadedFor] = useState(undefined);
  const [refreshKey, setRefreshKey] = useState(0);

  const loading = enabled && loadedFor !== authorId;

  useEffect(() => {
    if (!enabled) return;

    let ignore = false;

    getFeedPosts({ authorId }).then(({ data, error }) => {
      if (ignore) return;

      if (error) {
        showError("Could not load posts", error);
      } else {
        setPosts(data);
      }

      setLoadedFor(authorId);
    });

    return () => {
      ignore = true;
    };
  }, [authorId, enabled, refreshKey]);

  const reload = () => setRefreshKey((previous) => previous + 1);

  return { posts, setPosts, loading, reload };
};
