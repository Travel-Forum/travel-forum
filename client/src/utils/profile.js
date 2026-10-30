/**
 * "First Last", skipping a missing part.
 * @param {{ first_name?: string, last_name?: string } | null} profile
 * @returns {string}
 */
export const getFullName = (profile) =>
  [profile?.first_name, profile?.last_name].filter(Boolean).join(" ");
