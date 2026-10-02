import { useState } from "react";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import PostAuthor from "./PostAuthor";
import CommentForm from "./CommentForm";

const MAX_INDENT_DEPTH = 3;

const CommentItem = ({ comment, depth = 0, onReply }) => {
  const [isReplying, setIsReplying] = useState(false);

  const handleReply = async (content) => {
    const isSaved = await onReply(comment.id, content);
    if (isSaved) setIsReplying(false);
    return isSaved;
  };

  return (
    <Box>
      <PostAuthor author={comment.author} date={comment.created_at} size="sm" />
      <Box bg="bg.muted" rounded="lg" p={3} mt={2} ml={12}>
        <Text fontSize="sm" whiteSpace="pre-wrap">
          {comment.content}
        </Text>
      </Box>

      <Button
        variant="plain"
        size="xs"
        color="fg.muted"
        ml={12}
        px={2}
        onClick={() => setIsReplying((prev) => !prev)}
      >
        Reply
      </Button>

      {isReplying && (
        <Box ml={12} mt={1}>
          <CommentForm
            onSubmit={handleReply}
            submitLabel="Reply"
            placeholder="Write a reply..."
            onCancel={() => setIsReplying(false)}
            autoFocus
          />
        </Box>
      )}

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
            <CommentItem
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              onReply={onReply}
            />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default CommentItem;