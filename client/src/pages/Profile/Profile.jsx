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
} from "@chakra-ui/react";
import { LuPencil } from "react-icons/lu";
import { getFullName } from "../../utils/profile";
import { useProfilePage } from "./useProfilePage";
import ProfileEditForm from "../../components/profile/ProfileEditForm/ProfileEditForm";
import AvatarUpload from "../../components/profile/AvatarUpload/AvatarUpload";
import RoleBadge from "../../components/profile/RoleBadge/RoleBadge";

const Profile = () => {
  const {
    profile,
    isBlocked,
    fields,
    isEditing,
    startEditing,
    cancelEditing,
    changeAvatar,
    saveProfile,
  } = useProfilePage();

  return (
    <Box maxW="700px" mx="auto" mt={10} mb={10} px={4}>
      <Card.Root p={{ base: 5, md: 8 }}>
        <VStack gap={6} align="stretch">
          <VStack gap={3}>
            <AvatarUpload
              profile={profile}
              onFileSelected={changeAvatar}
              disabled={isBlocked}
            />

            <VStack gap={0}>
              <Text fontSize="2xl" fontWeight="bold">
                {getFullName(profile)}
              </Text>
              <Text fontSize="md" color="fg.muted">
                @{profile.username}
              </Text>
            </VStack>

            <HStack gap={2}>
              <RoleBadge profile={profile} />
            </HStack>
          </VStack>

          <Separator />

          <VStack gap={4} align="stretch">
            <Text fontSize="lg" fontWeight="semibold">
              Personal Information{" "}
              <IconButton
                aria-label="Edit profile information"
                size="xs"
                onClick={startEditing}
                disabled={isBlocked}
              >
                <LuPencil size={12} />
              </IconButton>
            </Text>

            {isEditing ? (
              <ProfileEditForm
                profile={profile}
                onCancel={cancelEditing}
                onSubmit={saveProfile}
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
