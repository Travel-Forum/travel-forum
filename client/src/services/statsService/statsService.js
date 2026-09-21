import { supabase } from "../../config/supabaseClient.js";

export const getUserCount = async () => {
  const { count, error } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.log("Get user count error:", error.message);
    return { error };
  }
  return { count };
};

export const getPostCount = async () => {
  const { count, error } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.log("Get post count error:", error.message);
    return { error };
  }
  return { count };
};