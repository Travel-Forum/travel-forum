import { describe, it, expect } from "vitest";
import { getPostLikeCount } from "./post.js";

describe("getPostLikeCount", () => {
  it("reads the count from Supabase's aggregate format", () => {
    expect(getPostLikeCount({ post_likes: [{ count: 5 }] })).toBe(5);
  });

  it("returns 0 when the aggregate is empty", () => {
    expect(getPostLikeCount({ post_likes: [] })).toBe(0);
  });

  it("returns 0 when likes were not selected at all", () => {
    expect(getPostLikeCount({})).toBe(0);
  });
});
