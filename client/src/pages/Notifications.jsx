import { Box, Button, Card, Heading, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { useNotifications } from "../hooks/useNotifications";
import NotificationItem from "../components/notifications/NotificationItem";

const Notifications = () => {
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } =
    useNotifications();

  const handleOpen = (notification) => {
    if (!notification.is_read) markAsRead(notification.id);
  };

  return (
    <Box maxW="640px" w="full" mx="auto" p={4} pt={6}>
      <Card.Root>
        <Card.Header>
          <HStack justify="space-between">
            <Heading size="lg">Notifications</Heading>
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark all as read
            </Button>
          </HStack>
        </Card.Header>

        <Card.Body>
          {loading && <Spinner alignSelf="center" color="blue.solid" />}

          {!loading && notifications.length === 0 && (
            <Text color="fg.muted" textAlign="center">
              You have no notifications yet.
            </Text>
          )}

          <VStack align="stretch" gap={1}>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onOpen={handleOpen}
              />
            ))}
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default Notifications;