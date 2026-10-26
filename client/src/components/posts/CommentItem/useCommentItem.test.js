import { describe, it, expect, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useCommentItem } from "./useCommentItem";

const comment = { id: "comment-1" };

const renderCommentItem = (handlers = {}) =>
  renderHook(() =>
    useCommentItem({
      comment,
      onReply: vi.fn().mockResolvedValue(true),
      onEdit: vi.fn().mockResolvedValue(true),
      onDelete: vi.fn().mockResolvedValue(),
      ...handlers,
    }),
  );

describe("useCommentItem", () => {
  it("closes the reply form after a saved reply", async () => {
    const onReply = vi.fn().mockResolvedValue(true);
    const { result } = renderCommentItem({ onReply });

    act(() => result.current.toggleReply());
    expect(result.current.isReplying).toBe(true);

    await act(() => result.current.submitReply("Thanks!"));

    expect(onReply).toHaveBeenCalledWith("comment-1", "Thanks!");
    expect(result.current.isReplying).toBe(false);
  });

  it("keeps the reply form open when saving fails, so the text isn't lost", async () => {
    const { result } = renderCommentItem({
      onReply: vi.fn().mockResolvedValue(false),
    });

    act(() => result.current.toggleReply());
    await act(() => result.current.submitReply("Thanks!"));

    expect(result.current.isReplying).toBe(true);
  });

  it("closes the edit form after a saved edit", async () => {
    const onEdit = vi.fn().mockResolvedValue(true);
    const { result } = renderCommentItem({ onEdit });

    act(() => result.current.startEdit());
    await act(() => result.current.submitEdit("Updated text"));

    expect(onEdit).toHaveBeenCalledWith("comment-1", "Updated text");
    expect(result.current.isEditing).toBe(false);
  });

  it("deletes only after the user confirms", async () => {
    const onDelete = vi.fn().mockResolvedValue();
    const { result } = renderCommentItem({ onDelete });

    act(() => result.current.askDelete());
    expect(result.current.isConfirmingDelete).toBe(true);
    expect(onDelete).not.toHaveBeenCalled();

    await act(() => result.current.confirmDelete());

    expect(onDelete).toHaveBeenCalledWith("comment-1");
    expect(result.current.isConfirmingDelete).toBe(false);
  });

  it("does not delete when the user cancels", () => {
    const onDelete = vi.fn();
    const { result } = renderCommentItem({ onDelete });

    act(() => result.current.askDelete());
    act(() => result.current.cancelDelete());

    expect(result.current.isConfirmingDelete).toBe(false);
    expect(onDelete).not.toHaveBeenCalled();
  });
});
