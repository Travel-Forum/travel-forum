import { Link as RouterLink } from "react-router-dom";
import { Avatar, HStack, Text, VStack, Link } from "@chakra-ui/react";
import { getFullName } from "../../../utils/profile";
import { formatDate } from "../../../utils/date";
const ProfileLink = ({ to, children }) => {
  if (!to) return children;

  return (
    <Link asChild>
      <RouterLink to={to}>{children}</RouterLink>
    </Link>
  );
};
const PostAuthor = ({ author, date, size = "md" }) => {
  const authorName = getFullName(author) || "Unknown user";

  const userProfileUrl = author?.username ? `/users/${author.username}` : null;

  return (
    <HStack gap={3}>
      <ProfileLink to={userProfileUrl}>
        <Avatar.Root size={size}>
          <Avatar.Fallback name={authorName} />
          <Avatar.Image src={author?.avatar_url} />
        </Avatar.Root>
      </ProfileLink>

      <VStack align="start" gap={0}>
        <ProfileLink to={userProfileUrl}>
          <Text fontWeight="bold">{authorName}</Text>
        </ProfileLink>

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
