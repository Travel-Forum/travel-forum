import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CloseButton,
  Dialog,
  HStack,
  IconButton,
  Input,
  Portal,
  Select,
  Stack,
  Textarea,
  createListCollection,
} from "@chakra-ui/react";
import { LuImage, LuSmile } from "react-icons/lu";

import {
  createPostSchema,
  TITLE_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  CONTENT_MIN_LENGTH,
  CONTENT_MAX_LENGTH,
} from "../../schemas/postSchemas";
import { getLengthHint } from "../../utils/text";

import { FormField } from "../ui/FormField";
import { ConfirmDialog } from "../ui/ConfirmDialog";

const visibilityOptions = createListCollection({
  items: [
    { label: "Everyone", value: "public" },
    { label: "Only me", value: "private" },
  ],
});

const CreatePostModal = ({ open, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: "", content: "", visibility: "public" },
  });

  const [isDiscardOpen, setIsDiscardOpen] = useState(false);

  const title = useWatch({ control, name: "title" });
  const content = useWatch({ control, name: "content" });

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const requestClose = () => {
    if (isDirty) {
      setIsDiscardOpen(true);
    } else {
      onClose();
    }
  };

  const handleDiscard = () => {
    setIsDiscardOpen(false);
    onClose();
  };

  return (
    <>
      <Dialog.Root
        open={open}
        onOpenChange={(e) => !e.open && requestClose()}
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
                      helperText={getLengthHint(title, TITLE_MIN_LENGTH, TITLE_MAX_LENGTH)}
                    >
                      <Input
                        {...register("title")}
                        placeholder="What is your post about?"
                        maxLength={TITLE_MAX_LENGTH}
                      />
                    </FormField>

                    <FormField
                      label="Content"
                      error={errors.content}
                      helperText={getLengthHint(content, CONTENT_MIN_LENGTH, CONTENT_MAX_LENGTH)}
                    >
                      <Textarea
                        {...register("content")}
                        placeholder="Share your experience or ask a question..."
                        rows={8}
                        maxLength={CONTENT_MAX_LENGTH}
                      />
                    </FormField>

                    <FormField label="Visibility" error={errors.visibility}>
                      <Controller
                        control={control}
                        name="visibility"
                        render={({ field }) => (
                          <Select.Root
                            name={field.name}
                            collection={visibilityOptions}
                            value={[field.value]}
                            onValueChange={({ value }) => field.onChange(value[0])}
                            onInteractOutside={field.onBlur}
                          >
                            <Select.HiddenSelect />
                            <Select.Control>
                              <Select.Trigger>
                                <Select.ValueText placeholder="Choose who can see this post" />
                              </Select.Trigger>
                              <Select.IndicatorGroup>
                                <Select.Indicator />
                              </Select.IndicatorGroup>
                            </Select.Control>
                            <Select.Positioner>
                              <Select.Content>
                                {visibilityOptions.items.map((item) => (
                                  <Select.Item item={item} key={item.value}>
                                    {item.label}
                                    <Select.ItemIndicator />
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select.Positioner>
                          </Select.Root>
                        )}
                      />
                    </FormField>
                  </Stack>
                </Dialog.Body>

                <Dialog.Footer justifyContent="space-between">
                  <HStack gap="1">
                    <IconButton
                      type="button"
                      variant="ghost"
                      aria-label="Add media"
                    >
                      <LuImage />
                    </IconButton>
                    <IconButton
                      type="button"
                      variant="ghost"
                      aria-label="Add emoji"
                    >
                      <LuSmile />
                    </IconButton>
                  </HStack>

                  <HStack gap="3">
                    <Button type="button" variant="outline" onClick={requestClose}>
                      Cancel
                    </Button>
                    <Button type="submit" loading={isSubmitting}>
                      Post
                    </Button>
                  </HStack>
                </Dialog.Footer>
              </form>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      <ConfirmDialog
        open={isDiscardOpen}
        title="Discard this post?"
        description="Your draft will be lost. This can't be undone."
        confirmLabel="Discard"
        cancelLabel="Keep editing"
        onConfirm={handleDiscard}
        onCancel={() => setIsDiscardOpen(false)}
      />
    </>
  );
};

export default CreatePostModal;
