import { Box, Text, VStack } from "@chakra-ui/react";
import PostAuthor from "./PostAuthor";

const PostCommentList = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <Text color="fg.muted" fontSize="sm">
        No comments yet. Be the first to share your thoughts!
      </Text>
    );
  }

  return (
    <VStack align="stretch" gap={4}>
      {comments.map((comment) => (
        <Box key={comment.id}>
          <PostAuthor author={comment.author} date={comment.created_at} size="sm" />
          <Box bg="bg.muted" rounded="lg" p={3} mt={2} ml={12}>
            <Text fontSize="sm" whiteSpace="pre-wrap">
              {comment.content}
            </Text>
          </Box>
        </Box>
      ))}
    </VStack>
  );
};

export default PostCommentList;