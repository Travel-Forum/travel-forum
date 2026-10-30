/**
 * Formats a database timestamp as e.g. "5 Mar 2026".
 * @param {string} dateString
 * @returns {string}
 */
export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
