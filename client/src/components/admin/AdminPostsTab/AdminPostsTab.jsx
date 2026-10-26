import { Input, Stack } from "@chakra-ui/react";
import PostSortButtons from "../../posts/PostSortButtons/PostSortButtons";
import AdminPostList from "../AdminPostList/AdminPostList";
import ConfirmDialog from "../../ui/ConfirmDialog/ConfirmDialog";
import { useAdminPosts } from "./useAdminPosts";

const AdminPostsTab = () => {
  const {
    searchText,
    setSearchText,
    sort,
    setSort,
    visiblePosts,
    startDelete,
    deleteDialogProps,
  } = useAdminPosts();

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
