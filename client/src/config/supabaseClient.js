import { createClient } from "@supabase/supabase-js";

import { supabaseUrl, supabasePublishableKey } from "./environments";

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    flowType: "pkce",
    autoRefreshToken: true,
    persistSession: true,
    // The ?code= from email and Google links is exchanged by hand
    // in useAuthCallback and useResetPassword.
    detectSessionInUrl: false,
  },
});
