import { Box, Card, HStack, Separator, Text } from "@chakra-ui/react";
import { LuMessageCircle, LuThumbsUp } from "react-icons/lu";
import PostAuthor from "./PostAuthor";
import PostCommentList from "./PostCommentList";
import ExpandableText from "../ui/ExpandableText";

const PostDetailsPanel = ({ post }) => {
  const likeCount = post.post_likes?.[0]?.count ?? 0;
  const comments = post.comments ?? [];

  return (
    <Card.Root maxH={{ lg: "75vh" }} overflow="hidden">
      <Card.Header>
        <PostAuthor author={post.author} date={post.created_at} />
      </Card.Header>

      <Card.Body overflowY="auto" gap={4}>
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            {post.title}
          </Text>
          <ExpandableText>{post.content}</ExpandableText>
        </Box>

        <HStack gap={4} color="fg.muted" fontSize="sm">
          <HStack gap={1}>
            <LuThumbsUp />
            <Text>{likeCount}</Text>
          </HStack>
          <HStack gap={1}>
            <LuMessageCircle />
            <Text>{comments.length} comments</Text>
          </HStack>
        </HStack>

        <Separator />

        <PostCommentList comments={comments} />
      </Card.Body>
    </Card.Root>
  );
};

export default PostDetailsPanel;