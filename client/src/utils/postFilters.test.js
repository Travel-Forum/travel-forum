import { describe, it, expect } from "vitest";
import { matchesSearch } from "./postFilters.js";

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
