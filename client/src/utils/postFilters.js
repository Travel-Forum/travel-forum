import { getPostLikeCount, getPostCommentCount } from "./post";
export const matchesSearch = (post, query) => {
  const search = (query ?? "").trim().toLowerCase();
  const title = post.title.toLowerCase();
  const content = post.content.toLowerCase();

  if (search === "") {
    return true;
  }

  return title.includes(search) || content.includes(search);
};

export const sortPosts = (posts, sort) => {
  if (sort === "likes") {
    return [...posts].sort((a, b) => getPostLikeCount(b) - getPostLikeCount(a));
  }

  if (sort === "comments") {
    return [...posts].sort(
      (a, b) => getPostCommentCount(b) - getPostCommentCount(a),
    );
  }

  return [...posts];
};
