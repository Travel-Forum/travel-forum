import { supabase } from "../../config/supabaseClient.js";

export const getPublicStats = async () => {
  const { data, error } = await supabase.rpc("get_public_stats");

  if (error) {
    console.log("Get public stats error:", error.message);
    return { error };
  }
  return { data: data?.[0] ?? { post_count: 0, user_count: 0 } };
};