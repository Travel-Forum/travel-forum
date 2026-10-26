import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import PostAuthor from "../PostAuthor/PostAuthor";
import CommentForm from "../CommentForm/CommentForm";
import ConfirmDialog from "../../ui/ConfirmDialog/ConfirmDialog";
import { useCommentItem } from "./useCommentItem";

const MAX_INDENT_DEPTH = 3;

const actionButtonProps = {
  variant: "plain",
  size: "xs",
  color: "fg.muted",
  px: 2,
};

const CommentItem = ({
  comment,
  depth = 0,
  currentUserId,
  onReply,
  onEdit,
  onDelete,
  disabled = false,
}) => {
  const {
    isReplying,
    toggleReply,
    cancelReply,
    submitReply,
    isEditing,
    startEdit,
    cancelEdit,
    submitEdit,
    isConfirmingDelete,
    askDelete,
    cancelDelete,
    confirmDelete,
  } = useCommentItem({ comment, onReply, onEdit, onDelete });

  const isOwn = comment.author?.id === currentUserId;

  return (
    <Box>
      <PostAuthor author={comment.author} date={comment.created_at} size="sm" />

      {isEditing ? (
        <Box ml={12} mt={2}>
          <CommentForm
            initialContent={comment.content}
            onSubmit={submitEdit}
            submitLabel="Save"
            onCancel={cancelEdit}
            autoFocus
          />
        </Box>
      ) : (
        <>
          <Box bg="bg.muted" rounded="lg" p={3} mt={2} ml={12}>
            <Text fontSize="sm" whiteSpace="pre-wrap">
              {comment.content}
            </Text>
          </Box>

          <HStack ml={12} gap={0}>
            <Button
              {...actionButtonProps}
              onClick={toggleReply}
              disabled={disabled}
            >
              Reply
            </Button>
            {isOwn && (
              <>
                <Button
                  {...actionButtonProps}
                  onClick={startEdit}
                  disabled={disabled}
                >
                  Edit
                </Button>
                <Button
                  {...actionButtonProps}
                  color="fg.error"
                  onClick={askDelete}
                  disabled={disabled}
                >
                  Delete
                </Button>
              </>
            )}
          </HStack>
        </>
      )}

      {isReplying && (
        <Box ml={12} mt={1}>
          <CommentForm
            onSubmit={submitReply}
            submitLabel="Reply"
            placeholder="Write a reply..."
            onCancel={cancelReply}
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
              currentUserId={currentUserId}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              disabled={disabled}
            />
          ))}
        </VStack>
      )}

      <ConfirmDialog
        open={isConfirmingDelete}
        title="Delete comment?"
        description="Replies to this comment will be deleted too. This can't be undone."
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </Box>
  );
};

export default CommentItem;
