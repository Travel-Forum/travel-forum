import { IconButton, Menu, Portal } from "@chakra-ui/react";
import { LuEllipsis } from "react-icons/lu";
const PostActionsMenu = ({ onEdit, onDelete, portalled = true }) => {
  const positioner = (
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="edit" onClick={onEdit}>
          Edit
        </Menu.Item>
        <Menu.Item value="delete" color="fg.error" onClick={onDelete}>
          Delete
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  );

  return (
    <Menu.Root positioning={{ placement: "bottom-end" }}>
      <Menu.Trigger asChild>
        <IconButton variant="ghost" size="sm" aria-label="Post actions">
          <LuEllipsis />
        </IconButton>
      </Menu.Trigger>
      {portalled ? <Portal>{positioner}</Portal> : positioner}
    </Menu.Root>
  );
};

export default PostActionsMenu;
