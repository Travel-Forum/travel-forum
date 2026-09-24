import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CloseButton,
  Dialog,
  Input,
  Portal,
  Stack,
  Textarea,
} from "@chakra-ui/react";

import {
  createPostSchema,
  TITLE_MAX_LENGTH,
  CONTENT_MAX_LENGTH,
} from "../../schemas/postSchemas";

import { FormField } from "../ui/FormField";

const CreatePostModal = ({ open, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: "", content: "" },
  });

  const title = useWatch({ control, name: "title" });
  const content = useWatch({ control, name: "content" });

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => !e.open && onClose()}
      placement="center"
      size="lg"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Header>
                <Dialog.Title>Create a post</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <Stack gap="4">
                  <FormField
                    label="Title"
                    error={errors.title}
                    helperText={`${title.length}/${TITLE_MAX_LENGTH}`}
                  >
                    <Input
                      {...register("title")}
                      placeholder="What is your post about?"
                    />
                  </FormField>

                  <FormField
                    label="Content"
                    error={errors.content}
                    helperText={`${content.length}/${CONTENT_MAX_LENGTH}`}
                  >
                    <Textarea
                      {...register("content")}
                      placeholder="Share your experience or ask a question..."
                      rows={8}
                    />
                  </FormField>
                </Stack>
              </Dialog.Body>

              <Dialog.Footer>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" loading={isSubmitting}>
                  Post
                </Button>
              </Dialog.Footer>
            </form>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CreatePostModal;
