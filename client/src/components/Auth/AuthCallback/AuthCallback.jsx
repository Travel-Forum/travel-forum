import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../config/supabaseClient";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth
      .exchangeCodeForSession(window.location.href)
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
  }, []);

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