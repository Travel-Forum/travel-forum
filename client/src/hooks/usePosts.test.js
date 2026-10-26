import { describe, it, expect, vi, beforeEach } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { usePosts } from "./usePosts";
import { getFeedPosts } from "../services/postsService";
import { showError } from "../utils/toast";

vi.mock("../services/postsService", () => ({ getFeedPosts: vi.fn() }));
vi.mock("../utils/toast", () => ({ showError: vi.fn() }));

describe("usePosts", () => {
  beforeEach(() => vi.clearAllMocks());

  it("loads the feed", async () => {
    getFeedPosts.mockResolvedValue({ data: [{ id: "post-1" }] });

    const { result } = renderHook(() => usePosts());

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.posts).toEqual([{ id: "post-1" }]);
    expect(getFeedPosts).toHaveBeenCalledWith({ authorId: null });
  });

  it("loads only one author's posts", async () => {
    getFeedPosts.mockResolvedValue({ data: [] });

    renderHook(() => usePosts({ authorId: "user-2" }));

    await waitFor(() =>
      expect(getFeedPosts).toHaveBeenCalledWith({ authorId: "user-2" }),
    );
  });

  it("waits while it is not enabled", () => {
    const { result } = renderHook(() => usePosts({ enabled: false }));

    expect(result.current.loading).toBe(false);
    expect(getFeedPosts).not.toHaveBeenCalled();
  });

  it("reloads without showing the loading state again", async () => {
    getFeedPosts.mockResolvedValueOnce({ data: [{ id: "post-1" }] });
    const { result } = renderHook(() => usePosts());
    await waitFor(() => expect(result.current.loading).toBe(false));

    getFeedPosts.mockResolvedValueOnce({ data: [{ id: "post-2" }] });
    act(() => result.current.reload());

    expect(result.current.loading).toBe(false);
    await waitFor(() =>
      expect(result.current.posts).toEqual([{ id: "post-2" }]),
    );
  });

  it("tells the user when loading fails", async () => {
    getFeedPosts.mockResolvedValue({ error: { message: "Offline" } });

    const { result } = renderHook(() => usePosts());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.posts).toEqual([]);
    expect(showError).toHaveBeenCalled();
  });
});
