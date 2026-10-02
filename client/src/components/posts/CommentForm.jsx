import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, HStack, Stack, Text, Textarea } from "@chakra-ui/react";
import { commentSchema, COMMENT_MAX_LENGTH } from "../../schemas/commentSchemas";

const CommentForm = ({
  onSubmit,
  initialContent = "",
  submitLabel = "Comment",
  placeholder = "Write a comment...",
  onCancel,
  autoFocus = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: initialContent },
  });

  const submit = async ({ content }) => {
    const isSaved = await onSubmit(content);
    if (isSaved) reset({ content: "" });
  };

  return (
    <Stack as="form" gap={2} onSubmit={handleSubmit(submit)}>
      <Textarea
        {...register("content")}
        placeholder={placeholder}
        rows={2}
        autoresize
        maxLength={COMMENT_MAX_LENGTH}
        autoFocus={autoFocus}
      />

      {errors.content && (
        <Text color="fg.error" fontSize="sm">
          {errors.content.message}
        </Text>
      )}

      <HStack justify="flex-end" gap={2}>
        {onCancel && (
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" size="sm" loading={isSubmitting}>
          {submitLabel}
        </Button>
      </HStack>
    </Stack>
  );
};

export default CommentForm;