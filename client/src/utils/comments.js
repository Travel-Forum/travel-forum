const ROOT = "root";

const groupByParent = (comments) =>
  comments.reduce((groups, comment) => {
    const parentId = comment.parent_comment_id ?? ROOT;
    return { ...groups, [parentId]: [...(groups[parentId] ?? []), comment] };
  }, {});

const attachReplies = (comment, groups) => ({
  ...comment,
  replies: (groups[comment.id] ?? []).map((reply) => attachReplies(reply, groups)),
});

export const buildCommentTree = (comments) => {
  const groups = groupByParent(comments);
  return (groups[ROOT] ?? []).map((comment) => attachReplies(comment, groups));
};