/**
 * Where to go after signing in: back to the page ProtectedRoute sent the
 * user away from (with its query, e.g. a shared post), or the feed.
 * @param {{ state?: { from?: { pathname: string, search: string } } }} location
 * @returns {string}
 */
export const getRedirectPath = (location) => {
  const from = location.state?.from;

  if (from) return from.pathname + from.search;

  return "/feed";
};
