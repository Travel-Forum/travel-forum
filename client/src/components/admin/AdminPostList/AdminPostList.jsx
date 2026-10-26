import { Badge, Button, Card, HStack, Stack, Text } from "@chakra-ui/react";
import { LuThumbsUp, LuMessageCircle } from "react-icons/lu";
import { formatDate } from "../../../utils/date";
import { getPostCommentCount, getPostLikeCount } from "../../../utils/post";

const AdminPostList = ({ posts, onDelete }) => {
  if (posts.length === 0) {
    return (
      <Text color="fg.muted" textAlign="center" py={6}>
        No posts found.
      </Text>
    );
  }

  return (
    <Stack gap={3}>
      {posts.map((post) => (
        <Card.Root key={post.id} size="sm">
          <Card.Body>
            <Stack
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "stretch", md: "center" }}
              gap={3}
            >
              <Stack gap={1} minW={0}>
                <HStack gap={2}>
                  <Text fontWeight="semibold" lineClamp={1}>
                    {post.title}
                  </Text>
                  {post.visibility === "private" && (
                    <Badge variant="outline">Private</Badge>
                  )}
                </HStack>
                <HStack gap={3} fontSize="sm" color="fg.muted" wrap="wrap">
                  <Text>@{post.author?.username ?? "unknown"}</Text>
                  <Text>{formatDate(post.created_at)}</Text>
                  <HStack gap={1}>
                    <LuThumbsUp />
                    <Text>{getPostLikeCount(post)}</Text>
                  </HStack>
                  <HStack gap={1}>
                    <LuMessageCircle />
                    <Text>{getPostCommentCount(post)}</Text>
                  </HStack>
                </HStack>
              </Stack>

              <Button
                size="sm"
                variant="outline"
                colorPalette="red"
                flexShrink={0}
                onClick={() => onDelete(post)}
              >
                Delete
              </Button>
            </Stack>
          </Card.Body>
        </Card.Root>
      ))}
    </Stack>
  );
};

export default AdminPostList;
