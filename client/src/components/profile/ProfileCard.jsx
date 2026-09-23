import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  VStack,
  HStack,
  Text,
  Separator,
  Badge,
  Box
} from "@chakra-ui/react";
import { useProfile } from "../../hooks/useProfile";
import { getFullName } from "../../utils/profile";
import UserAvatar from "./UserAvatar";

const ProfileCard = () => {
  const { profile } = useProfile();

  return (
    <Card.Root
      asChild
      p={5}
      _hover={{ shadow: "md" }}
      transition="box-shadow 0.2s"
    >
      <RouterLink to="/profile">
        <VStack gap={4} align="stretch">
          <VStack gap={2}>
            <UserAvatar size="2xl" />
            <VStack gap={0}>
              <Text fontSize="lg" fontWeight="bold">
                {getFullName(profile)}
              </Text>
              <Text fontSize="sm" color="fg.muted">
                @{profile.username}
              </Text>
            </VStack>
          </VStack>

          <HStack gap={2} justify="center" wrap="wrap">
            <Badge colorPalette="blue">Member</Badge>
          </HStack>

          <Separator />

          <Box>
            <Text fontSize="sm" fontWeight="semibold" mb={1}>
              About
            </Text>
            <Text fontSize="sm" color="fg.muted">
              No bio yet.
            </Text>
          </Box>
        </VStack>
      </RouterLink>
    </Card.Root>
  );
};

export default ProfileCard;
