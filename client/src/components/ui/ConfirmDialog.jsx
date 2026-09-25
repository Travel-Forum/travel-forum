import { Button, Dialog, Portal, Text } from "@chakra-ui/react";

export const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) => (
  <Dialog.Root
    open={open}
    onOpenChange={(e) => !e.open && onCancel()}
    role="alertdialog"
    placement="center"
    size="sm"
  >
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Text color="fg.muted">{description}</Text>
          </Dialog.Body>

          <Dialog.Footer>
            <Button variant="outline" onClick={onCancel}>
              {cancelLabel}
            </Button>
            <Button colorPalette="red" onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
);
