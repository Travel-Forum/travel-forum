import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../config/supabaseClient";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const hasRun = useRef(false);

  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

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
        const metadata = user.user_metadata;

        const { error: profileError } = await supabase.from("profiles").insert({
          id: user.id,
          first_name: metadata.first_name,
          last_name: metadata.last_name,
          username: metadata.username,
          email: user.email,
          phone: metadata.phone,
        });

        if (profileError) {
          setError(profileError);
          return;
        }

        navigate("/profile");
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