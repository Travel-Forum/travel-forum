// Supabase returns `post_likes(count)` and `comments(count)` as [{ count }].

/**
 * @param {object} post
 * @returns {number}
 */
export const getPostLikeCount = (post) => post.post_likes?.[0]?.count ?? 0;

/**
 * @param {object} post
 * @returns {number}
 */
export const getPostCommentCount = (post) => post.comments?.[0]?.count ?? 0;
