import { useState } from "react";
import { Input, Stack } from "@chakra-ui/react";
import PostSortButtons from "../../posts/PostSortButtons/PostSortButtons";
import AdminPostList from "../AdminPostList/AdminPostList";
import ConfirmDialog from "../../ui/ConfirmDialog/ConfirmDialog";
import { usePosts } from "../../../hooks/usePosts";
import { usePostActions } from "../../../hooks/usePostActions";
import { filterAndSortPosts } from "../../../utils/postFilters";

const AdminPostsTab = () => {
  const { posts, setPosts } = usePosts();
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("newest");

  const { startDelete, deleteDialogProps } = usePostActions({
    onDeleted: (postId) =>
      setPosts((previous) => previous.filter((post) => post.id !== postId)),
  });

  const visiblePosts = filterAndSortPosts(posts, searchText, sort);

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
