import { LuImage } from "react-icons/lu";
import { IconButton } from "@chakra-ui/react";
import { useFilePicker } from "../../../hooks/useFilePicker";

const PostMediaPicker = ({ onFilesSelected }) => {
  const { openPicker, inputProps } = useFilePicker(onFilesSelected);

  return (
    <>
      <IconButton
        type="button"
        variant="ghost"
        aria-label="Add media"
        onClick={openPicker}
      >
        <LuImage />
      </IconButton>

      <input
        type="file"
        accept="image/jpeg, image/png, image/webp, image/gif, video/mp4, video/webm"
        multiple
        {...inputProps}
      />
    </>
  );
};

export default PostMediaPicker;
