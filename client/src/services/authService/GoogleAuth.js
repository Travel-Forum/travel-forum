import { supabase } from "../../config/supabaseClient.js";

export const GoogleAuth = async () => {
    
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `http://localhost:5173/auth/callback`,
    },
  });

  if (error) {
    console.log("Continue with google error:", error.message);
    return { error };
  }

  return { data };
};
