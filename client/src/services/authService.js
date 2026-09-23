import { supabase } from "../config/supabaseClient";
import { appUrl } from "../config/environments";

export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log("Login error:", error.message);
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
    return { error };
  }

  if (data.user?.identities?.length === 0) {
    return { error: { message: "Account with this email already exists." } };
  }

  return { data };
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${appUrl}/auth/callback`,
    },
  });

  if (error) {
    console.log("Continue with google error:", error.message);
    return { error };
  }

  return { data };
};
