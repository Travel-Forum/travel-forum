import { supabase } from "../config/supabaseClient";
import { failWith } from "../utils/errors";

export const getPublicStats = async () => {
  const { data, error } = await supabase.rpc("get_public_stats");

  if (error) {
    return failWith("Get public stats error", error);
  }
  return { data: data?.[0] ?? { post_count: 0, user_count: 0 } };
};
