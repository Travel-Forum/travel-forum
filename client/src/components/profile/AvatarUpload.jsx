import { useRef } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { LuPencil } from "react-icons/lu";
import UserAvatar from "./UserAvatar";

const AvatarUpload = ({ onFileSelected }) => {
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const [file] = event.target.files;

    if (file) {
      onFileSelected(file);
    }

    event.target.value = "";
  };

  return (
    <Box position="relative">
      <UserAvatar size="2xl" />
      <IconButton
        aria-label="Edit avatar"
        size="xs"
        borderRadius="full"
        position="absolute"
        bottom="0"
        right="0"
        onClick={() => inputRef.current?.click()}
      >
        <LuPencil size={12} />
      </IconButton>
      <input
        type="file"
        ref={inputRef}
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        hidden
      />
    </Box>
  );
};

export default AvatarUpload;
