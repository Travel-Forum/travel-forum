import { useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import { updateProfile, uploadAvatar } from "../../services/profileService";
import { showSuccess, showError } from "../../utils/toast";

export const useProfilePage = () => {
  const { profile, isBlocked, refreshProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  const fields = [
    { label: "First Name", value: profile.first_name },
    { label: "Last Name", value: profile.last_name },
    { label: "Username", value: profile.username },
    { label: "Email", value: profile.email },
    { label: "Phone", value: profile.phone },
  ];

  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => setIsEditing(false);

  const changeAvatar = async (file) => {
    const { error } = await uploadAvatar(profile.id, file);

    if (error) {
      showError("Cannot update your avatar", error);
      return;
    }

    await refreshProfile();
    showSuccess("Your avatar was updated successfully.");
  };

  const saveProfile = async ({ firstName, lastName, phone }) => {
    const { error } = await updateProfile(profile.id, {
      firstName,
      lastName,
      phone,
    });

    if (error) {
      showError("Cannot update profile information", error);
      return;
    }

    await refreshProfile();
    showSuccess(
      "Profile updated",
      "Your profile information was updated successfully.",
    );
    setIsEditing(false);
  };

  return {
    profile,
    isBlocked,
    fields,
    isEditing,
    startEditing,
    cancelEditing,
    changeAvatar,
    saveProfile,
  };
};
