const DB_ERROR_MESSAGES = {
  42501: "You don't have permission to do this.",
  23514: "Some of the data is invalid. Please check your input.",
  23505: "This already exists. Please use a different value.",
  PGRST301: "Your session has expired. Please sign in again.",
};

const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";

/**
 * Replaces a database error's technical message with one that is safe to
 * show to users, chosen by the Postgres or PostgREST error code.
 * @param {{ code?: string, message?: string }} error
 * @returns {{ code?: string, message: string }}
 */
export const toFriendlyError = (error) => ({
  ...error,
  message: DB_ERROR_MESSAGES[error?.code] ?? DEFAULT_ERROR_MESSAGE,
});

/**
 * Logs the raw error for debugging and returns the { error } result
 * every service function uses, with a message that is safe to show.
 * @param {string} label What failed, for the console.
 * @param {{ code?: string, message: string }} error
 * @returns {{ error: { message: string } }}
 */
export const failWith = (label, error) => {
  console.error(`${label}:`, error.message);
  return { error: toFriendlyError(error) };
};
