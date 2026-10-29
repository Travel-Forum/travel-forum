import { supabase } from "../config/supabaseClient";
import { appUrl } from "../config/environments";

// Unlike database errors, Supabase Auth errors already have messages meant
// for users ("Invalid login credentials"), so they are returned as they are
// instead of going through toFriendlyError.

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

export const exchangeCodeForSession = (code) =>
  supabase.auth.exchangeCodeForSession(code);

export const signOut = () => supabase.auth.signOut();

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

export const updatePassword = async (password) => {
  const { data, error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error("Update password error:", error.message);
    return { error };
  }

  return { data };
};
