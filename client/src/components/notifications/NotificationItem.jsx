import { Avatar, Circle, HStack, Text, VStack } from "@chakra-ui/react";
import { getFullName } from "../../utils/profile";
import { formatDate } from "../../utils/date";

const NOTIFICATION_TEXT = {
    post_like: "liked your post",
    post_comment: "commented on your post",
    comment_reply: "replied to your comment",
};

const NotificationItem = ({ notification, onOpen }) => {
    const { actor, post, type, is_read: isRead, created_at: createdAt } = notification;
    const actorName = getFullName(actor) || "Someone";

    const handleKeyDown = (event) => {
        if (event.key === "Enter") onOpen(notification);
    };

    return (
        <HStack
            gap={3}
            p={3}
            rounded="lg"
            cursor="pointer"
            bg={isRead ? "transparent" : "blue.subtle"}
            _hover={{ bg: "bg.muted" }}
            role="button"
            tabIndex={0}
            onClick={() => onOpen(notification)}
            onKeyDown={handleKeyDown}
        >
            <Avatar.Root size="sm">
                <Avatar.Fallback name={actorName} />
                <Avatar.Image src={actor?.avatar_url} />
            </Avatar.Root>

            <VStack align="start" gap={0} flex="1">
                <Text fontSize="sm">
                    <Text as="span" fontWeight="bold">
                        {actorName}
                    </Text>{" "}
                    {NOTIFICATION_TEXT[type]}
                </Text>
                {post?.title && (
                    <Text fontSize="sm" color="fg.muted" lineClamp={1}>
                        {post.title}
                    </Text>
                )}
                <Text fontSize="xs" color="fg.muted">
                    {formatDate(createdAt)}
                </Text>
            </VStack>

            {!isRead && <Circle size={2} bg="blue.solid" flexShrink={0} />}
        </HStack>
    );
};

export default NotificationItem;