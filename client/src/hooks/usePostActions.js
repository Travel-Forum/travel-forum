import { useState } from "react";
import { deletePost, updatePost } from "../services/postsService";
import { showError, showSuccess } from "../utils/toast";

/**
 * Edit and delete flow for posts: remembers which post is being edited or
 * deleted and returns ready props for the edit modal and the confirm dialog.
 * @param {{ onUpdated?: (postId: string) => void, onDeleted?: (postId: string) => void }} callbacks
 * @returns {{ startEdit: (post: object) => void, startDelete: (post: object) => void, editModalProps: object, deleteDialogProps: object }}
 */
export const usePostActions = ({ onUpdated, onDeleted }) => {
  const [editingPost, setEditingPost] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);

  const saveEdit = async ({ title, content, visibility }) => {
    const postId = editingPost.id;
    const { error } = await updatePost(postId, { title, content, visibility });

    if (error) {
      showError("Could not update post", error);
      return;
    }

    showSuccess("Post updated", "Your changes are saved.");
    setEditingPost(null);
    onUpdated?.(postId);
  };

  const confirmDelete = async () => {
    const postId = deletingPost.id;
    setDeletingPost(null);

    const { error } = await deletePost(postId);

    if (error) {
      showError("Could not delete post", error);
      return;
    }

    showSuccess("Post deleted");
    onDeleted?.(postId);
  };

  return {
    startEdit: setEditingPost,
    startDelete: setDeletingPost,
    editModalProps: {
      open: editingPost !== null,
      post: editingPost,
      onClose: () => setEditingPost(null),
      onSubmit: saveEdit,
    },
    deleteDialogProps: {
      open: deletingPost !== null,
      title: "Delete this post?",
      description:
        "The post, its comments and media will be deleted. This can't be undone.",
      confirmLabel: "Delete",
      onConfirm: confirmDelete,
      onCancel: () => setDeletingPost(null),
    },
  };
};
