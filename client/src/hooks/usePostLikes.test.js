import { describe, it, expect, vi, beforeEach } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { usePostLikes } from "./usePostLikes";
import {
  getLikedPostIds,
  likePost,
  unlikePost,
} from "../services/likesService";
import { showError } from "../utils/toast";

vi.mock("../services/likesService", () => ({
  getLikedPostIds: vi.fn(),
  likePost: vi.fn(),
  unlikePost: vi.fn(),
}));
vi.mock("../utils/toast", () => ({ showError: vi.fn() }));

const renderLikes = async (likedIds = []) => {
  getLikedPostIds.mockResolvedValue({ data: likedIds });
  const hook = renderHook(() => usePostLikes("user-1"));
  await waitFor(() => expect(getLikedPostIds).toHaveBeenCalledWith("user-1"));
  return hook;
};

describe("usePostLikes", () => {
  beforeEach(() => vi.clearAllMocks());

  it("knows which posts the user already liked", async () => {
    const { result } = await renderLikes(["post-1"]);

    await waitFor(() => expect(result.current.isLiked("post-1")).toBe(true));
    expect(result.current.isLiked("post-2")).toBe(false);
  });

  it("uses the count from the post until the user changes it", async () => {
    const { result } = await renderLikes();

    expect(result.current.getLikeCount("post-1", 4)).toBe(4);
  });

  it("shows a like right away, before the server answers", async () => {
    likePost.mockReturnValue(new Promise(() => {}));
    const { result } = await renderLikes();

    act(() => {
      result.current.toggleLike("post-1", 4);
    });

    expect(result.current.isLiked("post-1")).toBe(true);
    expect(result.current.getLikeCount("post-1", 4)).toBe(5);
  });

  it("removes a like", async () => {
    unlikePost.mockResolvedValue({});
    const { result } = await renderLikes(["post-1"]);
    await waitFor(() => expect(result.current.isLiked("post-1")).toBe(true));

    await act(() => result.current.toggleLike("post-1", 5));

    expect(unlikePost).toHaveBeenCalledWith({
      postId: "post-1",
      userId: "user-1",
    });
    expect(result.current.isLiked("post-1")).toBe(false);
    expect(result.current.getLikeCount("post-1", 5)).toBe(4);
  });

  it("rolls the like back and tells the user when saving fails", async () => {
    likePost.mockResolvedValue({ error: { message: "No permission" } });
    const { result } = await renderLikes();

    await act(() => result.current.toggleLike("post-1", 4));

    expect(result.current.isLiked("post-1")).toBe(false);
    expect(result.current.getLikeCount("post-1", 4)).toBe(4);
    expect(showError).toHaveBeenCalled();
  });

  it("ignores a second click while the first one is still saving", async () => {
    likePost.mockReturnValue(new Promise(() => {}));
    const { result } = await renderLikes();

    act(() => {
      result.current.toggleLike("post-1", 4);
      result.current.toggleLike("post-1", 5);
    });

    expect(likePost).toHaveBeenCalledTimes(1);
    expect(unlikePost).not.toHaveBeenCalled();
  });
});
