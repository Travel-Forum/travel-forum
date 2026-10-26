import { Box, Heading, Tabs, Text } from "@chakra-ui/react";
import { LuFileText, LuUsers } from "react-icons/lu";
import AdminUsersTab from "../../components/admin/AdminUsersTab/AdminUsersTab";
import AdminPostsTab from "../../components/admin/AdminPostsTab/AdminPostsTab";

const AdminPanel = () => {
  return (
    <Box maxW="900px" w="full" mx="auto" px={4} py={{ base: 6, md: 10 }}>
      <Heading as="h1" size="2xl" mb={1}>
        Admin panel
      </Heading>
      <Text color="fg.muted" mb={6}>
        Manage users and posts.
      </Text>

      <Tabs.Root defaultValue="users" variant="line" lazyMount>
        <Tabs.List mb={4}>
          <Tabs.Trigger value="users">
            <LuUsers /> Users
          </Tabs.Trigger>
          <Tabs.Trigger value="posts">
            <LuFileText /> Posts
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="users">
          <AdminUsersTab />
        </Tabs.Content>
        <Tabs.Content value="posts">
          <AdminPostsTab />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default AdminPanel;
