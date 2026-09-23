import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { supabase } from "../config/supabaseClient";
export const useProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {

      if (authLoading) return;

      if (!user?.id) {
        setProfile(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (!isMounted) return;

      if (error) {
        console.error("Failed to load profile:", error);

      } else {
        setProfile(data);
      }

      setLoading(false);
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [user?.id, authLoading]);

  return { profile, loading };
};
