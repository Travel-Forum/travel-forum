import { useState, useEffect } from "react";
import {
  searchProfiles,
  setUserBlocked,
  setUserAdmin,
} from "../../../services/profileService";
import { showError, showSuccess } from "../../../utils/toast";
import { useAuth } from "../../../hooks/useAuth";

// Searches users as the admin types and toggles their blocked / admin status.
export const useAdminUsers = () => {
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

  // Update only the changed user in the list, without searching again.
  const updateUser = (userId, changes) =>
    setUsers((previous) =>
      previous.map((item) =>
        item.id === userId ? { ...item, ...changes } : item,
      ),
    );

  const toggleBlock = async (user) => {
    const { error } = await setUserBlocked(user.id, !user.is_blocked);

    if (error) {
      showError("Failed to update user data", error);
      return;
    }

    updateUser(user.id, { is_blocked: !user.is_blocked });
    showSuccess(user.is_blocked ? "User was unblocked" : "User was blocked");
  };

  const toggleAdmin = async (user) => {
    const { error } = await setUserAdmin(user.id, !user.is_admin);

    if (error) {
      showError("Failed to update user data", error);
      return;
    }

    updateUser(user.id, { is_admin: !user.is_admin });
    showSuccess(user.is_admin ? "Admin rights removed" : "Admin rights given");
  };

  return {
    searchText,
    setSearchText,
    users,
    currentUserId: currentUser?.id,
    toggleBlock,
    toggleAdmin,
  };
};
