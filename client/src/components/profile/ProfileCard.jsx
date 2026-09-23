import {
  Card,
  VStack,
  HStack,
  Avatar,
  Text,
  Separator,
  Badge,
  Box
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";

const ProfileCard = () => {
  const { user } = useAuth();
  const { profile } = useProfile();

  return (
    <Card.Root
      p={5}
      cursor="pointer"
      _hover={{ shadow: "md" }}
      transition="box-shadow 0.2s"
    >
      <VStack gap={4} align="stretch">
        <VStack gap={2}>
          <Avatar.Root size="2xl">
            <Avatar.Fallback name={user?.email} />
            <Avatar.Image src={profile?.avatar_url} />
          </Avatar.Root>
          <VStack gap={0}>
            <Text fontSize="lg" fontWeight="bold">
              George Gulubov
            </Text>
            <Text fontSize="sm" color="fg.muted">
              @George321
            </Text>
          </VStack>
        </VStack>

        <HStack gap={2} justify="center" wrap="wrap">
          <Badge colorPalette="blue">Member</Badge>
          <Badge colorPalette="green">Active Traveler</Badge>
        </HStack>

        <Separator />

        <Box>
          <Text fontSize="sm" fontWeight="semibold" mb={1}>
            About
          </Text>
          <Text fontSize="sm" color="fg.muted">
            Passionate traveler exploring Southeast Asia. Always happy to share
            visa tips.
          </Text>
        </Box>

        <Separator />

        <HStack justify="space-between">
          <Text fontSize="sm" color="fg.muted">
            Posts
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            58
          </Text>
        </HStack>
      </VStack>
    </Card.Root>
  );
};

export default ProfileCard;
