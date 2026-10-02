// Supabase returns the like count as [{ count: 5 }].
export const getPostLikeCount = (post) => post.post_likes?.[0]?.count ?? 0;