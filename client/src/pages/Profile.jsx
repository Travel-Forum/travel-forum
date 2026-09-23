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
  Badge
} from "@chakra-ui/react";
import { LuPencil } from "react-icons/lu";
import { useProfile } from "../hooks/useProfile";
import { getFullName } from "../utils/profile";
import UserAvatar from "../components/profile/UserAvatar";

const InfoField = ({ label, value, onEdit }) => (
  <Box>
    <HStack justify="space-between" align="center">
      <Box>
        <Text fontSize="sm" color="fg.muted">
          {label}
        </Text>
        <Text fontSize="md">{value || "—"}</Text>
      </Box>
      <IconButton
        aria-label={`Edit ${label}`}
        variant="ghost"
        size="sm"
        onClick={onEdit}
      >
        <LuPencil size={14} />
      </IconButton>
    </HStack>
  </Box>
);

const Profile = () => {
  const { profile } = useProfile();

  const fields = [
    { label: "First Name", value: profile.first_name },
    { label: "Last Name", value: profile.last_name },
    { label: "Username", value: profile.username },
    { label: "Email", value: profile.email },
    { label: "Phone", value: profile.phone },
  ];

  return (
    <Box maxW="700px" mx="auto" mt={10} mb={10} px={4}>
      <Card.Root p={{ base: 5, md: 8 }}>
        <VStack gap={6} align="stretch">
          <VStack gap={3}>
            <Box position="relative">
              <UserAvatar size="2xl" />
              <IconButton
                aria-label="Edit avatar"
                size="xs"
                borderRadius="full"
                position="absolute"
                bottom="0"
                right="0"
              >
                <LuPencil size={12} />
              </IconButton>
            </Box>

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

          <Box>
            <HStack justify="space-between" align="center" mb={2}>
              <Text fontSize="lg" fontWeight="semibold">
                About
              </Text>
              <IconButton aria-label="Edit about" variant="ghost" size="sm">
                <LuPencil size={14} />
              </IconButton>
            </HStack>
            <Text color="fg.muted">No bio yet.</Text>
          </Box>

          <Separator />

          <VStack gap={4} align="stretch">
            <Text fontSize="lg" fontWeight="semibold">
              Personal Information
            </Text>

            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={5}>
              {fields.map(({ label, value }) => (
                <GridItem key={label}>
                  <InfoField label={label} value={value} onEdit={() => {}} />
                </GridItem>
              ))}
            </Grid>
          </VStack>
        </VStack>
      </Card.Root>
    </Box>
  );
};

export default Profile;
