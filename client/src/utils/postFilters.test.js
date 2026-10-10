import { describe, it, expect } from "vitest";
import { matchesSearch, sortPosts } from "./postFilters.js";

const post = { title: "Три дни в Родопите", content: "Спахме в Широка лъка." };

describe("matchesSearch", () => {
  it("matches every post when the search is empty", () => {
    expect(matchesSearch(post, "")).toBe(true);
  });

  it("matches every post when there is no search at all", () => {
    expect(matchesSearch(post, null)).toBe(true);
  });

  it("matches a word in the title", () => {
    expect(matchesSearch(post, "родопите")).toBe(true);
  });

  it("matches a word in the content", () => {
    expect(matchesSearch(post, "широка")).toBe(true);
  });

  it("does not match a word that is in neither", () => {
    expect(matchesSearch(post, "пирин")).toBe(false);
  });

  it("ignores upper and lower case", () => {
    expect(matchesSearch(post, "РОДОПИТЕ")).toBe(true);
  });

  it("ignores spaces around the search", () => {
    expect(matchesSearch(post, "  родопите  ")).toBe(true);
  });
});

const makePost = (id, likes, comments) => ({
  id,
  post_likes: [{ count: likes }],
  comments: [{ count: comments }],
});

// Feed order from the database: newest first.
const posts = [makePost("new", 1, 5), makePost("middle", 9, 0), makePost("old", 4, 2)];
const ids = (list) => list.map((item) => item.id);

describe("sortPosts", () => {
  it("keeps the newest-first order by default", () => {
    expect(ids(sortPosts(posts, "newest"))).toEqual(["new", "middle", "old"]);
  });

  it("puts the most liked posts first", () => {
    expect(ids(sortPosts(posts, "likes"))).toEqual(["middle", "old", "new"]);
  });

  it("puts the most commented posts first", () => {
    expect(ids(sortPosts(posts, "comments"))).toEqual(["new", "old", "middle"]);
  });

  it("falls back to the original order for an unknown sort", () => {
    expect(ids(sortPosts(posts, "unknown"))).toEqual(["new", "middle", "old"]);
  });

  it("does not change the original list", () => {
    sortPosts(posts, "likes");

    expect(ids(posts)).toEqual(["new", "middle", "old"]);
  });
});
