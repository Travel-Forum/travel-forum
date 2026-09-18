import { supabase } from "../../config/supabaseClient.js";
import { appUrl } from "../../config/environments.js";

export const GoogleAuth = async () => {
    
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
