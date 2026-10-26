import { useEffect, useState, useRef } from "react";
import {
  useNavigate,
  useSearchParams,
  Link as RouterLink,
} from "react-router-dom";
import { Stack, Text, Spinner, Button, Icon } from "@chakra-ui/react";
import { LuCircleCheck, LuCircleX } from "react-icons/lu";
import { exchangeCodeForSession } from "../../services/authService";
import AuthCard from "../../components/ui/AuthCard/AuthCard";

const REDIRECT_DELAY_MS = 1000;

const AuthCallback = () => {
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const hasRun = useRef(false);
  const redirectTimer = useRef(null);
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

  return (
    <AuthCard title="Travel Forum" maxW="md">
      <Stack gap="4" align="center" py="6">
        {status === "loading" && (
          <>
            <Spinner size="lg" color="colorPalette.solid" />
            <Text color="fg.muted">Signing you in...</Text>
          </>
        )}

        {status === "success" && (
          <>
            <Icon boxSize="10" color="fg.success">
              <LuCircleCheck />
            </Icon>
            <Text fontWeight="medium">You're signed in!</Text>
            <Text color="fg.muted" fontSize="sm">
              Redirecting...
            </Text>
          </>
        )}

        {status === "error" && (
          <>
            <Icon boxSize="10" color="fg.error">
              <LuCircleX />
            </Icon>
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
