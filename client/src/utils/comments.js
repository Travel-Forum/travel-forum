const ROOT = "root";

const groupByParent = (comments) =>
  comments.reduce((groups, comment) => {
    const parentId = comment.parent_comment_id ?? ROOT;
    return { ...groups, [parentId]: [...(groups[parentId] ?? []), comment] };
  }, {});

const attachReplies = (comment, groups) => ({
  ...comment,
  replies: (groups[comment.id] ?? []).map((reply) =>
    attachReplies(reply, groups),
  ),
});

/**
 * Turns the flat list of comments from the database into a tree: top-level
 * comments, each with a `replies` array (nested to any depth).
 * @param {object[]} comments Rows with `id` and `parent_comment_id`.
 * @returns {object[]}
 */
export const buildCommentTree = (comments) => {
  const groups = groupByParent(comments);
  return (groups[ROOT] ?? []).map((comment) => attachReplies(comment, groups));
};
