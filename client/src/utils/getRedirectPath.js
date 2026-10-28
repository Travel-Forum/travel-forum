export const getRedirectPath = (location) => {
  const from = location.state?.from;

  if (from) return from.pathname + from.search;

  return "/feed";
};
