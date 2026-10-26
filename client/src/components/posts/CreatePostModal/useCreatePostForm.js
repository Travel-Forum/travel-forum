import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPostSchema,
  CONTENT_MAX_LENGTH,
} from "../../../schemas/postSchemas";

const toFormValues = (post) => ({
  title: post?.title ?? "",
  content: post?.content ?? "",
  visibility: post?.visibility ?? "public",
  media: [],
});

// Form state for creating a post, or editing `post` when one is passed.
// Editing changes title, content and visibility; attached media stays as it is.
export const useCreatePostForm = ({ open, post, onClose, onSubmit }) => {
  const isEditing = post !== null;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isDirty },
    setValue,
  } = useForm({
    resolver: zodResolver(createPostSchema),
    defaultValues: toFormValues(post),
  });

  const [isDiscardOpen, setIsDiscardOpen] = useState(false);

  const title = useWatch({ control, name: "title" });
  const content = useWatch({ control, name: "content" });
  const media = useWatch({ control, name: "media" });

  // The textarea needs two refs: react-hook-form's and ours for the cursor position.
  const contentRef = useRef(null);
  const { ref: registerContentRef, ...contentField } = register("content");
  const contentProps = {
    ...contentField,
    ref: (element) => {
      registerContentRef(element);
      contentRef.current = element;
    },
  };

  // Start from the post being edited when opening, and from an empty form after closing.
  useEffect(() => {
    reset(toFormValues(open ? post : null));
  }, [open, post, reset]);

  // Ask before closing when there are unsaved changes.
  const requestClose = () => {
    if (isDirty) {
      setIsDiscardOpen(true);
    } else {
      onClose();
    }
  };

  const discard = () => {
    setIsDiscardOpen(false);
    onClose();
  };

  const keepEditing = () => setIsDiscardOpen(false);

  const addFiles = (files) => {
    setValue("media", [...media, ...files], { shouldDirty: true });
  };

  const removeFile = (fileToRemove) => {
    setValue(
      "media",
      media.filter((file) => file !== fileToRemove),
      { shouldDirty: true },
    );
  };

  // Inserts the emoji at the cursor instead of at the end.
  const insertEmoji = ({ emoji }) => {
    const textarea = contentRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const nextContent = content.slice(0, start) + emoji + content.slice(end);
    if (nextContent.length > CONTENT_MAX_LENGTH) return;

    setValue("content", nextContent, { shouldDirty: true });

    const cursor = start + emoji.length;
    textarea.setSelectionRange(cursor, cursor);
  };

  return {
    isEditing,
    register,
    control,
    errors,
    isSubmitting,
    title,
    content,
    media,
    contentProps,
    submit: handleSubmit(onSubmit),
    requestClose,
    isDiscardOpen,
    discard,
    keepEditing,
    addFiles,
    removeFile,
    insertEmoji,
  };
};
