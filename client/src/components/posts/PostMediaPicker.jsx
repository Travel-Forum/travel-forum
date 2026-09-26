import { useRef } from "react";

import { LuImage } from "react-icons/lu";
import { IconButton } from "@chakra-ui/react";

const PostMediaPicker = ( { onFilesSelected } ) => {

    const inputRef = useRef(null);

  return (
    <>
      <IconButton type="button" variant="ghost" aria-label="Add media" onClick={() => inputRef.current.click()} >
        <LuImage />
      </IconButton>

      <input
        type="file"
        accept="image/jpeg, image/png, image/webp, image/gif, video/mp4, video/webm"
        multiple
        ref={inputRef}
        hidden
        onChange={(e) => {
          const files = Array.from(e.target.files);
          onFilesSelected(files);
          // Clear the input so picking the same file again still fires onChange
          e.target.value = "";
        }}
      />
    </>
  );
};

export default PostMediaPicker;
