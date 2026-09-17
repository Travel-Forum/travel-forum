import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../config/supabaseClient";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth
      .exchangeCodeForSession(window.location.href)
      .then((result) => {
        if (result.error) {
          setError(result.error);
          return;
        }

        navigate("/profile");
      })
      .catch((error) => setError(error));
  }, []);

  return (
    <>
      {error ? <div>Error: {error.message}</div> : <div>Confirming email...</div>}
    </>
  )
};

export default AuthCallback;