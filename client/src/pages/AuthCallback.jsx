import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams, Link as RouterLink } from "react-router-dom";
import { Stack, Text, Spinner, Button } from "@chakra-ui/react";
import { LuCircleCheck, LuCircleX } from "react-icons/lu";
import { exchangeCodeForSession } from "../services/authService";
import { AuthCard } from "../components/ui/AuthCard";

const AuthCallback = () => {
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
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
          setError(result.error);
          setStatus("error");
          return;
        }

        setStatus("success");

        setTimeout(() => {
          navigate("/feed");
        }, 1000);

      })
      .catch((err) => {
        setError(err);
        setStatus("error");
      });
  }, [code, navigate]);

  return (
    <AuthCard title="Travel Forum" maxW="md">
      <Stack gap="4" align="center" py="6">
        {status === "loading" && (
          <>
            <Spinner size="lg" color="blue.solid" />
            <Text color="fg.muted">Signing you in...</Text>
          </>
        )}

        {status === "success" && (
          <>
            <LuCircleCheck size={40} color="var(--chakra-colors-green-500)" />
            <Text fontWeight="medium">You're signed in!</Text>
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
