import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getProfile } from "../services/profileService";
import { ProfileContext } from "./ProfileContext";

const ProfileProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loadedForUserId, setLoadedForUserId] = useState(undefined);

  const currentUserId = user?.id ?? null;
  const loading = authLoading || loadedForUserId !== currentUserId;
  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      if (authLoading) return;

      if (!user?.id) {
        setProfile(null);
        setLoadedForUserId(null);
        return;
      }

      const { data, error } = await getProfile(user.id);

      if (!isMounted) return;

      if (error) {
        console.error("Failed to load profile:", error);
      } else {
        setProfile(data);
      }
      setLoadedForUserId(user.id);
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [user?.id, authLoading]);

  const refreshProfile = async () => {
    const { data, error } = await getProfile(user.id);
    if (!error) setProfile(data);
  };

  const value = { profile, loading, refreshProfile };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
