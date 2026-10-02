import { Text, VStack } from "@chakra-ui/react";
import CommentItem from "./CommentItem";
import { buildCommentTree } from "../../utils/comments";

const PostCommentList = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <Text color="fg.muted" fontSize="sm">
        No comments yet. Be the first to share your thoughts!
      </Text>
    );
  }

  const commentTree = buildCommentTree(comments);

  return (
    <VStack align="stretch" gap={4}>
      {commentTree.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </VStack>
  );
};

export default PostCommentList;