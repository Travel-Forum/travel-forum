import { Link as RouterLink } from "react-router-dom";
import { Avatar, HStack, Text, VStack, Link } from "@chakra-ui/react";
import { getFullName } from "../../utils/profile";
import { formatDate } from "../../utils/date";
const PostAuthor = ({ author, date, size = "md" }) => {
  const authorName = getFullName(author) || "Unknown user";

  const userProfileUrl = author?.username ? `/users/${author.username}` : null;

  return (
    <HStack gap={3}>
      <Link asChild>
        <RouterLink to={userProfileUrl}>
          <Avatar.Root size={size}>
            <Avatar.Fallback name={authorName} />
            <Avatar.Image src={author?.avatar_url} />
          </Avatar.Root>
        </RouterLink>
      </Link>

      <VStack align="start" gap={0}>
        <Link asChild>
          <RouterLink to={userProfileUrl}>
            <Text fontWeight="bold">{authorName}</Text>
          </RouterLink>
        </Link>

        {author?.username && (
          <Text fontSize="sm" color="fg.muted">
            @{author.username}
          </Text>
        )}
        {date && (
          <Text fontSize="xs" color="fg.muted">
            {formatDate(date)}
          </Text>
        )}
      </VStack>
    </HStack>
  );
};

export default PostAuthor;
