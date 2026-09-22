import { useEffect, useState } from "react";
import { useAuth } from "./useAuth.js";
import { supabase } from "../config/supabaseClient.js";

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      if (!user?.id) {
        setProfile(null);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Failed to load profile:", error);
        return;
      }

      if (isMounted) {
        setProfile(data);
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  return { profile };
};
