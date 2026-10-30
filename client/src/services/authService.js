import { supabase } from "../config/supabaseClient";
import { appUrl } from "../config/environments";

// Unlike database errors, Supabase Auth errors already have messages meant
// for users ("Invalid login credentials"), so they are returned as they are
// instead of going through toFriendlyError.

/**
 * Signs in with email and password.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ data?: object, error?: Error }>} The session on success.
 */
export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Sign in error:", error.message);
    return { error };
  }

  return { data };
};

/**
 * Creates an account and sends a confirmation email that opens /auth/callback.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ data?: object, error?: Error }>} An error also when the
 *   email is already registered (Supabase returns a user with no identities).
 */
export const signUp = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${appUrl}/auth/callback`,
    },
  });

  if (error) {
    console.error("Sign up error:", error.message);
    return { error };
  }

  if (data.user?.identities?.length === 0) {
    return { error: { message: "Account with this email already exists." } };
  }

  return { data };
};

/**
 * Turns the one-time `?code=` from an email or Google link into a session.
 * @param {string} code
 * @returns {Promise<{ data: object, error: Error | null }>}
 */
export const exchangeCodeForSession = (code) =>
  supabase.auth.exchangeCodeForSession(code);

/**
 * Signs the current user out.
 * @returns {Promise<{ error: Error | null }>}
 */
export const signOut = () => supabase.auth.signOut();

/**
 * Leaves the app for Google's sign-in page, which comes back to /auth/callback.
 * @returns {Promise<{ data?: object, error?: Error }>}
 */
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${appUrl}/auth/callback`,
    },
  });

  if (error) {
    console.error("Continue with Google error:", error.message);
    return { error };
  }

  return { data };
};

/**
 * Emails a link that opens /reset-password. Succeeds whether or not the
 * account exists, so the page can't be used to find registered emails.
 * @param {{ email: string }} values
 * @returns {Promise<{ data?: object, error?: Error }>}
 */
export const sendPasswordReset = async ({ email }) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${appUrl}/reset-password`,
  });

  if (error) {
    console.error("Send password reset error:", error.message);
    return { error };
  }

  return { data };
};

/**
 * Sets a new password for the signed-in user.
 * @param {string} password
 * @returns {Promise<{ data?: object, error?: Error }>}
 */
export const updatePassword = async (password) => {
  const { data, error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error("Update password error:", error.message);
    return { error };
  }

  return { data };
};
