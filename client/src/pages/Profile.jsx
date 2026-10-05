import { useState } from "react";
import {
  Box,
  Card,
  VStack,
  HStack,
  Text,
  Separator,
  IconButton,
  Grid,
  GridItem,
  Badge,
} from "@chakra-ui/react";
import { LuPencil } from "react-icons/lu";
import { useProfile } from "../hooks/useProfile";
import { getFullName } from "../utils/profile";
import ProfileEditForm from "../components/profile/ProfileEditForm";
import AvatarUpload from "../components/profile/AvatarUpload.jsx";
import { updateProfile, uploadAvatar  } from "../services/profileService";
import { showSuccess, showError } from "../utils/toast.js";

const Profile = () => {
  const { profile, refreshProfile } = useProfile();

  const fields = [
    { label: "First Name", value: profile.first_name },
    { label: "Last Name", value: profile.last_name },
    { label: "Username", value: profile.username },
    { label: "Email", value: profile.email },
    { label: "Phone", value: profile.phone },
  ];

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleFileSelected = async (file) => {
    const { error } = await uploadAvatar(profile.id, file);

    if (error) {
      showError("Cannot update your avatar", error);
      return;
    }

    await refreshProfile();
    showSuccess("Your avatar was updated successfully.");
  };

  const handleSubmit = async ({ firstName, lastName, phone }) => {
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

  return (
    <Box maxW="700px" mx="auto" mt={10} mb={10} px={4}>
      <Card.Root p={{ base: 5, md: 8 }}>
        <VStack gap={6} align="stretch">
          <VStack gap={3}>
            <AvatarUpload onFileSelected={handleFileSelected} />

            <VStack gap={0}>
              <Text fontSize="2xl" fontWeight="bold">
                {getFullName(profile)}
              </Text>
              <Text fontSize="md" color="fg.muted">
                @{profile.username}
              </Text>
            </VStack>

            <HStack gap={2}>
              <Badge colorPalette="blue">Member</Badge>
            </HStack>
          </VStack>

          <Separator />

          <VStack gap={4} align="stretch">
            <Text fontSize="lg" fontWeight="semibold">
              Personal Information{" "}
              <IconButton
                aria-label="Edit profile information"
                size="xs"
                onClick={handleEdit}
              >
                <LuPencil size={12} />
              </IconButton>
            </Text>

            {isEditing ? (
              <ProfileEditForm
                profile={profile}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
              />
            ) : (
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={5}>
                {fields.map(({ label, value }) => (
                  <GridItem key={label}>
                    {label}: {value}
                  </GridItem>
                ))}
              </Grid>
            )}
          </VStack>
        </VStack>
      </Card.Root>
    </Box>
  );
};

export default Profile;
