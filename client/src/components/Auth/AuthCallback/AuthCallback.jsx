import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../config/supabaseClient";
import { checkUserExist } from "../../../utils/checkUserExist.js";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const hasRun = useRef(false);

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    supabase.auth
      .exchangeCodeForSession(code)
      .then(async (result) => {
        if (result.error) {
          setError(result.error);
          return;
        }

        const user = result.data.user;

        const { data: profile, error: profileError } = await checkUserExist(user.id);

        if (profileError) {
          setError(profileError);
          return;
        }

        if (profile) {
          navigate("/profile");
          return;
        }

        navigate('/complete-profile');
      })
      .catch((error) => setError(error));
  }, [code, navigate]);

  return (
    <>
      {error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>Confirming email...</div>
      )}
    </>
  );
};

export default AuthCallback;
