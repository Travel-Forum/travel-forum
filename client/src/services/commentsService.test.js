import { describe, it, expect, vi, beforeEach } from "vitest";
import { supabase } from "../config/supabaseClient";
import { deleteComment, updateComment } from "./commentsService";

vi.mock("../config/supabaseClient", () => ({ supabase: { from: vi.fn() } }));

// Fakes supabase.from(...).update/delete(...).eq(...).select(...)
// resolving to `result`.
const mockQuery = (result) => {
  const query = {
    update: vi.fn(() => query),
    delete: vi.fn(() => query),
    eq: vi.fn(() => query),
    select: vi.fn(() => Promise.resolve(result)),
  };
  supabase.from.mockReturnValue(query);
  return query;
};

describe("commentsService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("updates the comment by its id", async () => {
    const query = mockQuery({ data: [{ id: "comment-1" }], error: null });

    const result = await updateComment({
      commentId: "comment-1",
      content: "Updated",
    });

    expect(supabase.from).toHaveBeenCalledWith("comments");
    expect(query.update).toHaveBeenCalledWith({ content: "Updated" });
    expect(query.eq).toHaveBeenCalledWith("id", "comment-1");
    expect(result).toEqual({});
  });

  it("explains that nothing changed when the comment isn't yours", async () => {
    // RLS hides other users' comments, so the delete matches 0 rows.
    mockQuery({ data: [], error: null });

    const result = await deleteComment("comment-1");

    expect(result.error.message).toBe("You can only change your own comments.");
  });

  it("returns a friendly message for database errors", async () => {
    mockQuery({ data: null, error: { code: "42501", message: "rls" } });

    const result = await updateComment({
      commentId: "comment-1",
      content: "x",
    });

    expect(result.error.message).toBe("You don't have permission to do this.");
  });
});
