import { useState } from "react";
import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import PostAuthor from "./PostAuthor";
import CommentForm from "./CommentForm";
import { ConfirmDialog } from "../ui/ConfirmDialog";

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
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const isOwn = comment.author?.id === currentUserId;

  const handleReply = async (content) => {
    const isSaved = await onReply(comment.id, content);
    if (isSaved) setIsReplying(false);
    return isSaved;
  };

  const handleEdit = async (content) => {
    const isSaved = await onEdit(comment.id, content);
    if (isSaved) setIsEditing(false);
    return isSaved;
  };

  const handleDelete = async () => {
    setIsConfirmingDelete(false);
    await onDelete(comment.id);
  };

  return (
    <Box>
      <PostAuthor author={comment.author} date={comment.created_at} size="sm" />

      {isEditing ? (
        <Box ml={12} mt={2}>
          <CommentForm
            initialContent={comment.content}
            onSubmit={handleEdit}
            submitLabel="Save"
            onCancel={() => setIsEditing(false)}
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
              onClick={() => setIsReplying((prev) => !prev)}
            >
              Reply
            </Button>
            {isOwn && (
              <>
                <Button {...actionButtonProps} onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
                <Button
                  {...actionButtonProps}
                  color="fg.error"
                  onClick={() => setIsConfirmingDelete(true)}
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
              currentUserId={currentUserId}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </VStack>
      )}

      <ConfirmDialog
        open={isConfirmingDelete}
        title="Delete comment?"
        description="Replies to this comment will be deleted too. This can't be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmingDelete(false)}
      />
    </Box>
  );
};

export default CommentItem;