import { useState } from "react";
import { usePosts } from "../../../hooks/usePosts";
import { usePostActions } from "../../../hooks/usePostActions";
import { filterAndSortPosts } from "../../../utils/postFilters";

// Every post (admins see private ones too), with local search and sort.
export const useAdminPosts = () => {
  const { posts, setPosts } = usePosts();
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("newest");

  const { startDelete, deleteDialogProps } = usePostActions({
    onDeleted: (postId) =>
      setPosts((previous) => previous.filter((post) => post.id !== postId)),
  });

  return {
    searchText,
    setSearchText,
    sort,
    setSort,
    visiblePosts: filterAndSortPosts(posts, searchText, sort),
    startDelete,
    deleteDialogProps,
  };
};
