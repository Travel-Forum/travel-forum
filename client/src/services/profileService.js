import { supabase } from "../config/supabaseClient";

export const profileExists = async (userId) => {
  return await supabase
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle();
};
