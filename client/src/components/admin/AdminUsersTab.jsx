import { useState, useEffect } from "react";
import { Input, Stack } from "@chakra-ui/react";
import AdminUserList from "./AdminUserList";
import {
  searchProfiles,
  setUserBlocked,
  setUserAdmin,
} from "../../services/profileService";
import { showError, showSuccess } from "../../utils/toast";
import { useAuth } from "../../hooks/useAuth";

const AdminUsersTab = () => {
  const { user: currentUser } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let ignore = false;

    searchProfiles(searchText).then(({ data, error }) => {
      if (ignore) return;

      if (error) {
        showError("Could not load users", error);
      } else {
        setUsers(data);
      }
    });

    return () => {
      ignore = true;
    };
  }, [searchText]);

  const handleToggleBlock = async (user) => {
    const { error } = await setUserBlocked(user.id, !user.is_blocked);

    if (error) {
      showError("Failed to update user data", error);
      return;
    }

    setUsers((previous) =>
      previous.map((item) =>
        item.id === user.id ? { ...item, is_blocked: !item.is_blocked } : item,
      ),
    );

    showSuccess(user.is_blocked ? "User was unblocked" : "User was blocked");
  };

  const handleToggleAdmin = async (user) => {
    const { error } = await setUserAdmin(user.id, !user.is_admin);

    if (error) {
      showError("Failed to update user data", error);
      return;
    }

    setUsers((previous) =>
      previous.map((item) =>
        item.id === user.id ? { ...item, is_admin: !item.is_admin } : item,
      ),
    );

    showSuccess(user.is_admin ? "Admin rights removed" : "Admin rights given");
  };

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
        currentUserId={currentUser?.id}
        onToggleBlock={handleToggleBlock}
        onToggleAdmin={handleToggleAdmin}
      />
    </Stack>
  );
};

export default AdminUsersTab;
