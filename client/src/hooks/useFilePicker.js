import { useRef } from "react";

/**
 * Opens a hidden <input type="file"> from any button and passes the chosen
 * files on. Spread `inputProps` on the input and call `openPicker` on click.
 * @param {(files: File[]) => void} onFilesSelected
 * @returns {{ openPicker: () => void, inputProps: object }}
 */
export const useFilePicker = (onFilesSelected) => {
  const inputRef = useRef(null);

  const openPicker = () => inputRef.current?.click();

  const handleChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) onFilesSelected(files);

    // Clear the input so picking the same file again still fires onChange
    event.target.value = "";
  };

  return {
    openPicker,
    inputProps: { ref: inputRef, onChange: handleChange, hidden: true },
  };
};
