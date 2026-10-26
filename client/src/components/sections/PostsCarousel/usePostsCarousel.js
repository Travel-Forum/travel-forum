import { useEffect, useState } from "react";
import {
  getLatestPosts,
  getMostCommentedPosts,
} from "../../../services/postsService";

const PAGE_SIZE = 3;
const LIST_SIZE = 10;

// Two public lists for the home page, shown three posts at a time.
export const usePostsCarousel = () => {
  const [tab, setTab] = useState("latest");
  const [page, setPage] = useState(0);
  const [latest, setLatest] = useState([]);
  const [commented, setCommented] = useState([]);

  useEffect(() => {
    let ignore = false;

    Promise.all([
      getLatestPosts(LIST_SIZE),
      getMostCommentedPosts(LIST_SIZE),
    ]).then(([latestRes, commentedRes]) => {
      if (ignore) return;
      if (!latestRes.error) setLatest(latestRes.data);
      if (!commentedRes.error) setCommented(commentedRes.data);
    });

    return () => {
      ignore = true;
    };
  }, []);

  const posts = tab === "latest" ? latest : commented;
  const pageCount = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const visiblePosts = posts.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const switchTab = (next) => {
    setTab(next);
    setPage(0);
  };

  return {
    tab,
    switchTab,
    page,
    pageCount,
    hasPosts: posts.length > 0,
    visiblePosts,
    goToPrevious: () => setPage((p) => Math.max(0, p - 1)),
    goToNext: () => setPage((p) => Math.min(pageCount - 1, p + 1)),
  };
};
