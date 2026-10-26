import { Link as RouterLink } from "react-router-dom";
import { Stack, Text, Spinner, Button, Icon } from "@chakra-ui/react";
import { LuCircleCheck, LuCircleX } from "react-icons/lu";
import { useAuthCallback } from "./useAuthCallback";
import AuthCard from "../../components/ui/AuthCard/AuthCard";

const AuthCallback = () => {
  const { status, error } = useAuthCallback();

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
