import { Controller } from "react-hook-form";
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
  Popover,
} from "@chakra-ui/react";
import { LuSmile } from "react-icons/lu";
import EmojiPicker, { Theme } from "emoji-picker-react";
import PostMediaPicker from "../PostMediaPicker/PostMediaPicker";
import PostMediaPreview from "../PostMediaPreview/PostMediaPreview";

import {
  TITLE_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  CONTENT_MIN_LENGTH,
  CONTENT_MAX_LENGTH,
} from "../../../schemas/postSchemas";
import { getLengthHint } from "../../../utils/text";
import { useCreatePostForm } from "./useCreatePostForm";

import FormField from "../../ui/FormField/FormField";
import ConfirmDialog from "../../ui/ConfirmDialog/ConfirmDialog";
import { useColorModeValue } from "../../ui/ColorMode/ColorMode";

const visibilityOptions = createListCollection({
  items: [
    { label: "Everyone", value: "public" },
    { label: "Only me", value: "private" },
  ],
});

// Creates a new post, or edits `post` when one is passed.
const CreatePostModal = ({ open, onClose, onSubmit, post = null }) => {
  const {
    isEditing,
    register,
    control,
    errors,
    isSubmitting,
    title,
    content,
    media,
    contentProps,
    submit,
    requestClose,
    isDiscardOpen,
    discard,
    keepEditing,
    addFiles,
    removeFile,
    insertEmoji,
  } = useCreatePostForm({ open, post, onClose, onSubmit });

  const emojiTheme = useColorModeValue(Theme.LIGHT, Theme.DARK);

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
              <form onSubmit={submit}>
                <Dialog.Header>
                  <Dialog.Title>
                    {isEditing ? "Edit post" : "Create a post"}
                  </Dialog.Title>
                </Dialog.Header>

                <Dialog.Body>
                  <Stack gap="4">
                    <FormField
                      label="Title"
                      error={errors.title}
                      helperText={getLengthHint(
                        title,
                        TITLE_MIN_LENGTH,
                        TITLE_MAX_LENGTH,
                      )}
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
                      helperText={getLengthHint(
                        content,
                        CONTENT_MIN_LENGTH,
                        CONTENT_MAX_LENGTH,
                      )}
                    >
                      <Textarea
                        {...contentProps}
                        placeholder="Share your experience or ask a question..."
                        rows={8}
                        maxLength={CONTENT_MAX_LENGTH}
                      />
                    </FormField>

                    {!isEditing && (
                      <PostMediaPreview
                        mediaFiles={media}
                        onRemove={removeFile}
                      />
                    )}

                    <FormField label="Visibility" error={errors.visibility}>
                      <Controller
                        control={control}
                        name="visibility"
                        render={({ field }) => (
                          <Select.Root
                            name={field.name}
                            collection={visibilityOptions}
                            value={[field.value]}
                            onValueChange={({ value }) =>
                              field.onChange(value[0])
                            }
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
                    {!isEditing && (
                      <PostMediaPicker onFilesSelected={addFiles} />
                    )}

                    <Popover.Root
                      positioning={{ placement: "top-start" }}
                      lazyMount
                    >
                      <Popover.Trigger asChild>
                        <IconButton
                          type="button"
                          variant="ghost"
                          aria-label="Add emoji"
                        >
                          <LuSmile />
                        </IconButton>
                      </Popover.Trigger>

                      <Popover.Positioner>
                        <Popover.Content width="auto">
                          <EmojiPicker
                            onEmojiClick={insertEmoji}
                            theme={emojiTheme}
                            height={380}
                            previewConfig={{ showPreview: false }}
                            lazyLoadEmojis
                          />
                        </Popover.Content>
                      </Popover.Positioner>
                    </Popover.Root>
                  </HStack>

                  <HStack gap="3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={requestClose}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" loading={isSubmitting}>
                      {isEditing ? "Save" : "Post"}
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
        title={isEditing ? "Discard your changes?" : "Discard this post?"}
        description={
          isEditing
            ? "Your edits will be lost. The post stays as it was."
            : "Your draft will be lost. This can't be undone."
        }
        confirmLabel="Discard"
        cancelLabel="Keep editing"
        onConfirm={discard}
        onCancel={keepEditing}
      />
    </>
  );
};

export default CreatePostModal;
