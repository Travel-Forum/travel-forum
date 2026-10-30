import { getPostLikeCount, getPostCommentCount } from "./post";

/**
 * Case-insensitive search in the post's title and text.
 * @param {{ title: string, content: string }} post
 * @param {string} [query] An empty query matches every post.
 * @returns {boolean}
 */
export const matchesSearch = (post, query) => {
  const search = (query ?? "").trim().toLowerCase();
  const title = post.title.toLowerCase();
  const content = post.content.toLowerCase();

  if (search === "") {
    return true;
  }

  return title.includes(search) || content.includes(search);
};

/**
 * Returns a sorted copy of the posts.
 * @param {object[]} posts
 * @param {"newest" | "likes" | "comments"} sort Any other value keeps the
 *   order from the database (newest first).
 * @returns {object[]}
 */
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

/**
 * The posts the feed shows for the search box and the sort buttons.
 * @param {object[]} posts
 * @param {string} query
 * @param {string} sort
 * @returns {object[]}
 */
export const filterAndSortPosts = (posts, query, sort) =>
  sortPosts(
    posts.filter((post) => matchesSearch(post, query)),
    sort,
  );
