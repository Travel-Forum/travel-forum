import {
  Avatar,
  Badge,
  Button,
  Card,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getFullName } from "../../../utils/profile";

const AdminUserList = ({
  users,
  currentUserId,
  onToggleBlock,
  onToggleAdmin,
}) => {
  if (users.length === 0) {
    return (
      <Text color="fg.muted" textAlign="center" py={6}>
        No users found.
      </Text>
    );
  }

  return (
    <Stack gap={3}>
      {users.map((user) => {
        const name = getFullName(user) || user.username;
        const isSelf = user.id === currentUserId;

        return (
          <Card.Root key={user.id} size="sm">
            <Card.Body>
              <Stack
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                align={{ base: "stretch", md: "center" }}
                gap={3}
              >
                <HStack gap={3} minW={0}>
                  <Avatar.Root size="md">
                    <Avatar.Fallback name={name} />
                    <Avatar.Image src={user.avatar_url} />
                  </Avatar.Root>

                  <Stack gap={0} minW={0}>
                    <HStack gap={2} wrap="wrap">
                      <Text fontWeight="semibold">{name}</Text>
                      {user.is_admin && (
                        <Badge colorPalette="ocean">Admin</Badge>
                      )}
                      {user.is_blocked && (
                        <Badge colorPalette="red">Blocked</Badge>
                      )}
                      {isSelf && <Badge variant="outline">You</Badge>}
                    </HStack>
                    <Text fontSize="sm" color="fg.muted" truncate>
                      @{user.username} · {user.email}
                    </Text>
                  </Stack>
                </HStack>

                {!isSelf && (
                  <HStack gap={2} flexShrink={0}>
                    <Button
                      size="sm"
                      variant="outline"
                      colorPalette={user.is_blocked ? "gray" : "red"}
                      onClick={() => onToggleBlock(user)}
                    >
                      {user.is_blocked ? "Unblock" : "Block"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onToggleAdmin(user)}
                    >
                      {user.is_admin ? "Remove admin" : "Make admin"}
                    </Button>
                  </HStack>
                )}
              </Stack>
            </Card.Body>
          </Card.Root>
        );
      })}
    </Stack>
  );
};

export default AdminUserList;
