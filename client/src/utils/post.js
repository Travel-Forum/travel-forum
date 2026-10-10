export const getPostLikeCount = (post) => post.post_likes?.[0]?.count ?? 0;

export const getPostCommentCount = (post) => post.comments?.[0]?.count ?? 0;
