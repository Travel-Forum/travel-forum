import { useEffect, useState, useRef } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Card, HStack, Stack, Text, Spinner, Button } from "@chakra-ui/react";
import { LuCircleCheck, LuCircleX } from "react-icons/lu";

import { supabase } from "../../../config/supabaseClient";
import { checkUserExist } from "../../../utils/checkUserExist.js";
import logo from "../../../assets/icons/Forum logo.svg";

const AuthCallback = () => {
  const navigate = useNavigate();
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

        const user = result.data.user;

        const { data: profile, error: profileError } = await checkUserExist(user.id);

        if (profileError) {
          setError(profileError);
          setStatus("error");
          return;
        }

        setStatus("success");

        setTimeout(() => {
          navigate(profile ? "/profile" : "/complete-profile");
        }, 1000);
      })
      .catch((err) => {
        setError(err);
        setStatus("error");
      });
  }, [code, navigate]);

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p="4"
    >
      <Card.Root maxW="md" w="full" mx="auto">
        <Card.Header>
          <Card.Title textAlign="center">
            <HStack justify="center" gap="2">
              <img
                src={logo}
                alt="Travel Forum logo"
                width="24"
                height="24"
              />
              <span>Travel Forum</span>
            </HStack>
          </Card.Title>
        </Card.Header>

        <Card.Body>
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
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default AuthCallback;
