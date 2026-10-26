import { describe, it, expect } from "vitest";
import { commentSchema, COMMENT_MAX_LENGTH } from "./commentSchemas.js";

const isValid = (content) => commentSchema.safeParse({ content }).success;

describe("commentSchema", () => {
  it("accepts a short comment", () => {
    expect(isValid("Great tip, thanks!")).toBe(true);
  });

  it("rejects a comment with only spaces", () => {
    expect(isValid("   ")).toBe(false);
  });

  it("checks the maximum length", () => {
    expect(isValid("a".repeat(COMMENT_MAX_LENGTH))).toBe(true);
    expect(isValid("a".repeat(COMMENT_MAX_LENGTH + 1))).toBe(false);
  });
});
