import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { exchangeCodeForSession } from "../../services/authService";

const REDIRECT_DELAY_MS = 1000;

// Turns the ?code= from the email or Google link into a session,
// then sends the user to the feed after a short success message.
export const useAuthCallback = () => {
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const hasRun = useRef(false);
  const redirectTimer = useRef(null);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    // The code works only once, and StrictMode runs effects twice in development.
    if (hasRun.current) return;
    hasRun.current = true;

    exchangeCodeForSession(code)
      .then((result) => {
        if (result.error) {
          setError(result.error);
          setStatus("error");
          return;
        }

        setStatus("success");

        redirectTimer.current = setTimeout(() => {
          navigate("/feed");
        }, REDIRECT_DELAY_MS);
      })
      .catch((err) => {
        setError(err);
        setStatus("error");
      });
  }, [code, navigate]);

  // Don't navigate after the user has already left this page.
  useEffect(() => () => clearTimeout(redirectTimer.current), []);

  return { status, error };
};
