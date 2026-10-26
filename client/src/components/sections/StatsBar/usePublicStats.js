import { useEffect, useState } from "react";
import { getPublicStats } from "../../../services/statsService";

// Post and user totals for the home page; null until they load.
export const usePublicStats = () => {
  const [stats, setStats] = useState({ posts: null, users: null });

  useEffect(() => {
    let ignore = false;

    getPublicStats().then(({ data, error }) => {
      if (ignore || error) return;
      setStats({ posts: data.post_count, users: data.user_count });
    });

    return () => {
      ignore = true;
    };
  }, []);

  return stats;
};
