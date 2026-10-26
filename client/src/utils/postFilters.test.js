import { describe, it, expect } from "vitest";
import { filterAndSortPosts, matchesSearch, sortPosts } from "./postFilters.js";

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
const posts = [
  makePost("new", 1, 5),
  makePost("middle", 9, 0),
  makePost("old", 4, 2),
];
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

describe("filterAndSortPosts", () => {
  const withText = (id, title, likes) => ({
    ...makePost(id, likes, 0),
    title,
    content: "Notes from the trip, with a few tips at the end.",
  });

  const trips = [
    withText("rila", "Seven Rila Lakes in one day", 2),
    withText("kotor", "Kotor without the cruise crowds", 8),
    withText("rila-again", "Rila monastery by bus", 5),
  ];

  it("keeps only the matching posts and sorts them", () => {
    expect(ids(filterAndSortPosts(trips, "rila", "likes"))).toEqual([
      "rila-again",
      "rila",
    ]);
  });

  it("only sorts when there is no search", () => {
    expect(ids(filterAndSortPosts(trips, "", "likes"))).toEqual([
      "kotor",
      "rila-again",
      "rila",
    ]);
  });
});
