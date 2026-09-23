import { supabase } from "../config/supabaseClient";

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
