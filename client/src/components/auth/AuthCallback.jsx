import { useEffect, useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Stack, Text, Spinner, Button } from "@chakra-ui/react";
import { LuCircleCheck, LuCircleX } from "react-icons/lu";

import { supabase } from "../../config/supabaseClient";
import { useProfileRedirect } from "../../hooks/useProfileRedirect";
import { AuthCard } from "../ui/AuthCard";

const AuthCallback = () => {
  const { redirectByProfile } = useProfileRedirect();
  const [status, setStatus] = useState("loading");
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
          setStatus("error");
          return;
        }

        const { error: redirectError } = await redirectByProfile(
          result.data.user.id,
          { delay: 1000, onResolved: () => setStatus("success") },
        );

        if (redirectError) {
          setError(redirectError);
          setStatus("error");
        }
      })
      .catch((err) => {
        setError(err);
        setStatus("error");
      });
  }, [code, redirectByProfile]);

  return (
    <AuthCard title="Travel Forum" maxW="md">
      <Stack gap="4" align="center" py="6">
        {status === "loading" && (
          <>
            <Spinner size="lg" color="blue.solid" />
            <Text color="fg.muted">Confirming your email...</Text>
          </>
        )}

        {status === "success" && (
          <>
            <LuCircleCheck size={40} color="var(--chakra-colors-green-500)" />
            <Text fontWeight="medium">Email confirmed!</Text>
            <Text color="fg.muted" fontSize="sm">
              Redirecting...
            </Text>
          </>
        )}

        {status === "error" && (
          <>
            <LuCircleX size={40} color="var(--chakra-colors-red-500)" />
            <Text fontWeight="medium">Something went wrong</Text>
            <Text color="fg.muted" fontSize="sm" textAlign="center">
              {error?.message}
            </Text>
            <Button asChild variant="outline" mt="2">
              <RouterLink to="/signin">Back to Sign In</RouterLink>
            </Button>
          </>
        )}
      </Stack>
    </AuthCard>
  );
};

export default AuthCallback;
