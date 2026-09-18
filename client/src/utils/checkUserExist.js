import { supabase } from "../config/supabaseClient";

export const checkUserExist = async (userId) => {

  return await supabase
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle();
};
