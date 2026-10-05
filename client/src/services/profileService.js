import { supabase } from "../config/supabaseClient";
import { toFriendlyError } from "../utils/errors";

export const getProfile = (userId) =>
  supabase.from("profiles").select("*").eq("id", userId).maybeSingle();

export const createProfile = ({ id, email, firstName, lastName, username, phone }) =>
  supabase.from("profiles").insert({
    id,
    email,
    first_name: firstName,
    last_name: lastName,
    username,
    phone,
  });

export const updateProfile = async (userId, { firstName, lastName, email, phone }) => {

  const { data, error } = await supabase
    .from("profiles")
    .update({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
    })
    .eq("id", userId)
    .select().single();

  if (error) {
    console.error("Failed to update profile:", error.message);
    return { error: toFriendlyError(error) };
  }

  return { data };
};
  
  
