import { supabase } from "../config/supabaseClient";
import { failWith } from "../utils/errors";

/**
 * Loads the user and post counters shown on the home page. Runs as a
 * database function, so guests can see the totals without reading the tables.
 * @returns {Promise<{ data?: { post_count: number, user_count: number }, error?: Error }>}
 */
export const getPublicStats = async () => {
  const { data, error } = await supabase.rpc("get_public_stats");

  if (error) {
    return failWith("Get public stats error", error);
  }
  return { data: data?.[0] ?? { post_count: 0, user_count: 0 } };
};
