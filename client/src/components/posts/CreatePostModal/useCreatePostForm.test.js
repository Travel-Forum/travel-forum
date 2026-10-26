import { describe, it, expect, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useCreatePostForm } from "./useCreatePostForm";

const renderForm = (options = {}) =>
  renderHook((props) => useCreatePostForm(props), {
    initialProps: {
      open: true,
      post: null,
      onClose: vi.fn(),
      onSubmit: vi.fn(),
      ...options,
    },
  });

// A real textarea, so the hook can read and move the cursor.
const attachTextarea = (result) => {
  const textarea = document.createElement("textarea");
  document.body.appendChild(textarea);
  act(() => result.current.contentProps.ref(textarea));
  return textarea;
};

describe("useCreatePostForm", () => {
  it("starts empty for a new post", () => {
    const { result } = renderForm();

    expect(result.current.isEditing).toBe(false);
    expect(result.current.title).toBe("");
    expect(result.current.media).toEqual([]);
  });

  it("starts from the post when editing", () => {
    const post = {
      title: "Kotor in September",
      content: "Is it worth it?",
      visibility: "private",
    };
    const { result } = renderForm({ post });

    expect(result.current.isEditing).toBe(true);
    expect(result.current.title).toBe("Kotor in September");
  });

  it("closes right away when nothing was changed", () => {
    const onClose = vi.fn();
    const { result } = renderForm({ onClose });

    act(() => result.current.requestClose());

    expect(onClose).toHaveBeenCalled();
    expect(result.current.isDiscardOpen).toBe(false);
  });

  it("asks before closing when there are unsaved changes", () => {
    const onClose = vi.fn();
    const { result } = renderForm({ onClose });

    act(() => result.current.addFiles([new File(["x"], "photo.jpg")]));
    act(() => result.current.requestClose());

    expect(result.current.isDiscardOpen).toBe(true);
    expect(onClose).not.toHaveBeenCalled();

    act(() => result.current.discard());

    expect(onClose).toHaveBeenCalled();
  });

  it("adds and removes attached files", () => {
    const { result } = renderForm();
    const photo = new File(["x"], "photo.jpg");
    const video = new File(["y"], "clip.mp4");

    act(() => result.current.addFiles([photo, video]));
    act(() => result.current.removeFile(photo));

    expect(result.current.media).toEqual([video]);
  });

  it("inserts an emoji at the cursor, not at the end", () => {
    const { result } = renderForm();
    const textarea = attachTextarea(result);

    act(() => result.current.insertEmoji({ emoji: "😊" }));
    expect(result.current.content).toBe("😊");

    // Move the cursor back to the start and add another one there.
    textarea.setSelectionRange(0, 0);
    act(() => result.current.insertEmoji({ emoji: "⛰️" }));

    expect(result.current.content).toBe("⛰️😊");
  });
});
