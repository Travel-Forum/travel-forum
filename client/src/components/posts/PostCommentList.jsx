import { Text, VStack } from "@chakra-ui/react";
import CommentItem from "./CommentItem";
import { buildCommentTree } from "../../utils/comments";

const PostCommentList = ({
  comments,
  currentUserId,
  onReply,
  onEdit,
  onDelete,
}) => {
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
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          onReply={onReply}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </VStack>
  );
};

export default PostCommentList;