import { Box, IconButton } from "@chakra-ui/react";
import { LuPencil } from "react-icons/lu";
import { useFilePicker } from "../../../hooks/useFilePicker";
import UserAvatar from "../UserAvatar/UserAvatar";

const AvatarUpload = ({ profile, onFileSelected, disabled = false }) => {
  const { openPicker, inputProps } = useFilePicker(([file]) =>
    onFileSelected(file),
  );

  return (
    <Box position="relative">
      <UserAvatar profile={profile} size="2xl" />
      <IconButton
        aria-label="Edit avatar"
        size="xs"
        borderRadius="full"
        position="absolute"
        bottom="0"
        right="0"
        onClick={openPicker}
        disabled={disabled}
      >
        <LuPencil size={12} />
      </IconButton>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        {...inputProps}
      />
    </Box>
  );
};

export default AvatarUpload;
