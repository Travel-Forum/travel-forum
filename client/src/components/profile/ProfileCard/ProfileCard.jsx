import { Link as RouterLink } from "react-router-dom";
import { Card, VStack, HStack, Text } from "@chakra-ui/react";
import { getFullName } from "../../../utils/profile";
import UserAvatar from "../UserAvatar/UserAvatar";
import RoleBadge from "../RoleBadge/RoleBadge";

const ProfileCard = ({ profile, to }) => {
  const content = (
    <VStack gap={4} align="stretch">
      <VStack gap={2}>
        <UserAvatar profile={profile} size="2xl" />
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
        <RoleBadge profile={profile} />
      </HStack>
    </VStack>
  );

  if (!to) return <Card.Root p={5}>{content}</Card.Root>;

  return (
    <Card.Root
      asChild
      p={5}
      _hover={{ shadow: "md" }}
      transition="box-shadow 0.2s"
    >
      <RouterLink to={to}>{content}</RouterLink>
    </Card.Root>
  );
};

export default ProfileCard;
