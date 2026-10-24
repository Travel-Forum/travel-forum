import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfileByUsername } from "../services/profileService";
import Loading from "../components/ui/Loading";
import ProfileCard from "../components/profile/ProfileCard";
import { showError } from "../utils/toast";
import ErrorState from "../components/ui/ErrorState";
const UserProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    getProfileByUsername(username).then(({ data, error }) => {
      if (ignore) return;

      if (error) {
        showError("Failed to load user by username", error);
      } else {
        setProfile(data);
      }

      setLoading(false);
    });

    return () => {
      ignore = true;
    };
  }, [username]);

  if (loading) return <Loading />;

  if (profile === null) return <ErrorState message="User not found" />;

  return <ProfileCard profile={profile} />;
};

export default UserProfile;
