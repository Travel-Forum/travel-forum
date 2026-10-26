import { describe, it, expect } from "vitest";
import {
  createPostSchema,
  CONTENT_MAX_LENGTH,
  CONTENT_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
} from "./postSchemas.js";

const valid = {
  title: "a".repeat(TITLE_MIN_LENGTH),
  content: "a".repeat(CONTENT_MIN_LENGTH),
  visibility: "public",
  media: [],
};

const isValid = (changes) =>
  createPostSchema.safeParse({ ...valid, ...changes }).success;

describe("createPostSchema", () => {
  it("accepts the shortest valid post", () => {
    expect(isValid({})).toBe(true);
  });

  it("checks the title length limits", () => {
    expect(isValid({ title: "a".repeat(TITLE_MIN_LENGTH - 1) })).toBe(false);
    expect(isValid({ title: "a".repeat(TITLE_MAX_LENGTH) })).toBe(true);
    expect(isValid({ title: "a".repeat(TITLE_MAX_LENGTH + 1) })).toBe(false);
  });

  it("checks the content length limits", () => {
    expect(isValid({ content: "a".repeat(CONTENT_MIN_LENGTH - 1) })).toBe(
      false,
    );
    expect(isValid({ content: "a".repeat(CONTENT_MAX_LENGTH) })).toBe(true);
    expect(isValid({ content: "a".repeat(CONTENT_MAX_LENGTH + 1) })).toBe(
      false,
    );
  });

  it("doesn't count spaces around the title", () => {
    expect(
      isValid({ title: `   ${"a".repeat(TITLE_MIN_LENGTH - 1)}   ` }),
    ).toBe(false);
  });

  it("only allows public or private visibility", () => {
    expect(isValid({ visibility: "private" })).toBe(true);
    expect(isValid({ visibility: "friends" })).toBe(false);
  });

  it("accepts attached files", () => {
    expect(isValid({ media: [new File(["x"], "photo.jpg")] })).toBe(true);
  });
});
