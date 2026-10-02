import { Box, Card, HStack, Separator, Text } from "@chakra-ui/react";
import { LuMessageCircle } from "react-icons/lu";
import PostAuthor from "./PostAuthor";
import PostCommentList from "./PostCommentList";
import LikeButton from "./LikeButton";
import ExpandableText from "../ui/ExpandableText";

const PostDetailsPanel = ({ post, liked, likeCount, onToggleLike }) => {
  const comments = post.comments ?? [];

  return (
    <Card.Root maxH={{ lg: "65vh" }} overflow="hidden">
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
          <LikeButton
            liked={liked}
            count={likeCount}
            onToggle={onToggleLike}
            size="sm"
          />
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