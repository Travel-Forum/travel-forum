import { Box, Text, VStack } from "@chakra-ui/react";
import PostAuthor from "./PostAuthor";

const MAX_INDENT_DEPTH = 3;

const CommentItem = ({ comment, depth = 0 }) => (
  <Box>
    <PostAuthor author={comment.author} date={comment.created_at} size="sm" />
    <Box bg="bg.muted" rounded="lg" p={3} mt={2} ml={12}>
      <Text fontSize="sm" whiteSpace="pre-wrap">
        {comment.content}
      </Text>
    </Box>

    {comment.replies.length > 0 && (
      <VStack
        align="stretch"
        gap={3}
        mt={3}
        ml={depth < MAX_INDENT_DEPTH ? 12 : 0}
        pl={3}
        borderLeftWidth="2px"
        borderColor="border.muted"
      >
        {comment.replies.map((reply) => (
          <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
        ))}
      </VStack>
    )}
  </Box>
);

export default CommentItem;