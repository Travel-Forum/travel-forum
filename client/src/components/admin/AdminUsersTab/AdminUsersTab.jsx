import { Input, Stack } from "@chakra-ui/react";
import AdminUserList from "../AdminUserList/AdminUserList";
import { useAdminUsers } from "./useAdminUsers";

const AdminUsersTab = () => {
  const {
    searchText,
    setSearchText,
    users,
    currentUserId,
    toggleBlock,
    toggleAdmin,
  } = useAdminUsers();

  return (
    <Stack gap={4}>
      <Input
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        borderRadius="full"
        placeholder="Search by username, email or name"
      />

      <AdminUserList
        users={users}
        currentUserId={currentUserId}
        onToggleBlock={toggleBlock}
        onToggleAdmin={toggleAdmin}
      />
    </Stack>
  );
};

export default AdminUsersTab;
