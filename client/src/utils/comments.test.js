import { describe, it, expect } from "vitest";
import { buildCommentTree } from "./comments.js";

const comment = (id, parentId = null) => ({ id, parent_comment_id: parentId });

describe("buildCommentTree", () => {
  it("returns an empty list when there are no comments", () => {
    expect(buildCommentTree([])).toEqual([]);
  });

  it("keeps top-level comments in their original order", () => {
    const tree = buildCommentTree([comment("a"), comment("b")]);

    expect(tree.map((item) => item.id)).toEqual(["a", "b"]);
    expect(tree[0].replies).toEqual([]);
  });

  it("nests a reply under its parent comment", () => {
    const tree = buildCommentTree([comment("a"), comment("b", "a")]);

    expect(tree).toHaveLength(1);
    expect(tree[0].replies.map((item) => item.id)).toEqual(["b"]);
  });

  it("nests replies to replies at any depth", () => {
    const tree = buildCommentTree([
      comment("a"),
      comment("b", "a"),
      comment("c", "b"),
    ]);

    expect(tree[0].replies[0].replies[0].id).toBe("c");
  });

  it("leaves out replies whose parent is not in the list", () => {
    const tree = buildCommentTree([comment("a"), comment("orphan", "missing")]);

    expect(tree.map((item) => item.id)).toEqual(["a"]);
  });

  it("does not modify the original comments", () => {
    const comments = [comment("a"), comment("b", "a")];

    buildCommentTree(comments);

    expect(comments[0]).not.toHaveProperty("replies");
  });
});
