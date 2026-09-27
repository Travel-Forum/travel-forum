import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import { getFullName } from "../../utils/profile";
import { formatDate } from "../../utils/date";

const PostAuthor = ({ author, date, size = "md" }) => {
    const authorName = getFullName(author) || "Unknown user";

    return (
        <HStack gap={3}>
            <Avatar.Root size={size}>
                <Avatar.Fallback name={authorName} />
                <Avatar.Image src={author?.avatar_url} />
            </Avatar.Root>
            <VStack align="start" gap={0}>
                <Text fontWeight="bold">{authorName}</Text>
                {author?.username && (
                    <Text fontSize="sm" color="fg.muted">@{author.username}</Text>
                )}
                {date && (
                    <Text fontSize="xs" color="fg.muted">{formatDate(date)}</Text>
                )}
            </VStack>
        </HStack>
    );
};

export default PostAuthor;