import { useEffect, useState } from "react";
import { Input, Stack } from "@chakra-ui/react";
import PostSortButtons from "../posts/PostSortButtons";
import AdminPostList from "./AdminPostList";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { getFeedPosts } from "../../services/postsService";
import { usePostActions } from "../../hooks/usePostActions";
import { matchesSearch, sortPosts } from "../../utils/postFilters";
import { showError } from "../../utils/toast";

const AdminPostsTab = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("newest");

  const { startDelete, deleteDialogProps } = usePostActions({
    onDeleted: (postId) =>
      setPosts((previous) => previous.filter((post) => post.id !== postId)),
  });

  useEffect(() => {
    let ignore = false;

    getFeedPosts().then(({ data, error }) => {
      if (ignore) return;

      if (error) {
        showError("Could not load posts", error);
      } else {
        setPosts(data);
      }
    });

    return () => {
      ignore = true;
    };
  }, []);

  const visiblePosts = sortPosts(
    posts.filter((post) => matchesSearch(post, searchText)),
    sort,
  );

  return (
    <Stack gap={4}>
      <Input
        borderRadius="full"
        placeholder="Search posts"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />

      <PostSortButtons value={sort} onChange={setSort} />

      <AdminPostList posts={visiblePosts} onDelete={startDelete} />

      <ConfirmDialog {...deleteDialogProps} />
    </Stack>
  );
};

export default AdminPostsTab;
