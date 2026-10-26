import { useState } from "react";

// Which mode a comment is in (reading, replying, editing, confirming delete)
// and the actions that move between them.
export const useCommentItem = ({ comment, onReply, onEdit, onDelete }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  // The form stays open when saving fails, so the text isn't lost.
  const submitReply = async (content) => {
    const isSaved = await onReply(comment.id, content);
    if (isSaved) setIsReplying(false);
    return isSaved;
  };

  const submitEdit = async (content) => {
    const isSaved = await onEdit(comment.id, content);
    if (isSaved) setIsEditing(false);
    return isSaved;
  };

  const confirmDelete = async () => {
    setIsConfirmingDelete(false);
    await onDelete(comment.id);
  };

  return {
    isReplying,
    toggleReply: () => setIsReplying((prev) => !prev),
    cancelReply: () => setIsReplying(false),
    submitReply,

    isEditing,
    startEdit: () => setIsEditing(true),
    cancelEdit: () => setIsEditing(false),
    submitEdit,

    isConfirmingDelete,
    askDelete: () => setIsConfirmingDelete(true),
    cancelDelete: () => setIsConfirmingDelete(false),
    confirmDelete,
  };
};
