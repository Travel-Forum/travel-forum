export const getFullName = (profile) =>
  [profile?.first_name, profile?.last_name].filter(Boolean).join(" ");
