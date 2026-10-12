import { Input, Stack } from "@chakra-ui/react";
import PostSortButtons from "../posts/PostSortButtons";
import AdminPostList from "./AdminPostList";

const AdminPostsTab = () => {
  return (
    <Stack gap={4}>
      <Input borderRadius="full" placeholder="Search posts" />

      <PostSortButtons value="newest" />

      <AdminPostList posts={[]} />
    </Stack>
  );
};

export default AdminPostsTab;
