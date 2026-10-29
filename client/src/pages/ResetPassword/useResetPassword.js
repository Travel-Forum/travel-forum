import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  exchangeCodeForSession,
  updatePassword,
} from "../../services/authService";
import { showError, showSuccess } from "../../utils/toast";

// Turns the ?code= from the reset email into a session, then lets the user
// choose a new password. The code works only once, like in useAuthCallback.
export const useResetPassword = () => {
  const [status, setStatus] = useState("loading");
  const hasRun = useRef(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    exchangeCodeForSession(code)
      .then((result) => {
        if (result.error) {
          setStatus("error");
          return;
        }

        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [code]);

  const handleSubmit = async (data) => {
    const result = await updatePassword(data.password);

    if (result.error) {
      showError("Could not update password", result.error);
      return;
    }

    showSuccess("Password updated");
    navigate("/feed", { replace: true });
  };

  return { status, handleSubmit };
};
