import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useFilePicker } from "./useFilePicker";

const changeEvent = (files) => ({ target: { files, value: "C:\\photo.jpg" } });

describe("useFilePicker", () => {
  it("passes the chosen files on as an array", () => {
    const onFilesSelected = vi.fn();
    const { result } = renderHook(() => useFilePicker(onFilesSelected));
    const file = new File(["x"], "photo.jpg");

    result.current.inputProps.onChange(changeEvent([file]));

    expect(onFilesSelected).toHaveBeenCalledWith([file]);
  });

  it("clears the input so the same file can be picked again", () => {
    const { result } = renderHook(() => useFilePicker(vi.fn()));
    const event = changeEvent([new File(["x"], "photo.jpg")]);

    result.current.inputProps.onChange(event);

    expect(event.target.value).toBe("");
  });

  it("does nothing when the picker is closed without a file", () => {
    const onFilesSelected = vi.fn();
    const { result } = renderHook(() => useFilePicker(onFilesSelected));

    result.current.inputProps.onChange(changeEvent([]));

    expect(onFilesSelected).not.toHaveBeenCalled();
  });

  it("opens the hidden input", () => {
    const { result } = renderHook(() => useFilePicker(vi.fn()));
    const input = document.createElement("input");
    input.click = vi.fn();
    result.current.inputProps.ref.current = input;

    result.current.openPicker();

    expect(input.click).toHaveBeenCalled();
  });
});
