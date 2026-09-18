import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { checkUserExist } from "../utils/checkUserExist.js";

export const useProfileRedirect = () => {
  const navigate = useNavigate();

  const redirectByProfile = useCallback(
    async (userId, { delay = 0, onResolved } = {}) => {
      const { data: profile, error } = await checkUserExist(userId);

      if (error) {
        return { error };
      }

      onResolved?.();

      if (delay) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      navigate(profile ? "/profile" : "/complete-profile");

      return {};
    },
    [navigate],
  );

  return { redirectByProfile };
};
