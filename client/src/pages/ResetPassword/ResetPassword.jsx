import { Link as RouterLink } from "react-router-dom";
import { Stack, Text, Spinner, Button, Icon } from "@chakra-ui/react";
import { LuCircleX } from "react-icons/lu";
import { useResetPassword } from "./useResetPassword";
import AuthCard from "../../components/ui/AuthCard/AuthCard";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm/ResetPasswordForm";

const ResetPassword = () => {
  const { status, handleSubmit } = useResetPassword();

  if (status === "ready") {
    return <ResetPasswordForm onSubmit={handleSubmit} />;
  }

  return (
    <AuthCard title="Travel Forum" maxW="md">
      <Stack gap="4" align="center" py="6">
        {status === "loading" && (
          <>
            <Spinner size="lg" color="colorPalette.solid" />
            <Text color="fg.muted">Checking your reset link...</Text>
          </>
        )}

        {status === "error" && (
          <>
            <Icon boxSize="10" color="fg.error">
              <LuCircleX />
            </Icon>
            <Text fontWeight="medium">This link is invalid or has expired</Text>
            <Text color="fg.muted" fontSize="sm" textAlign="center">
              Reset links work only once and only in the browser where you asked
              for them.
            </Text>
            <Button asChild variant="outline" mt="2">
              <RouterLink to="/forgot-password">Send a new link</RouterLink>
            </Button>
          </>
        )}
      </Stack>
    </AuthCard>
  );
};

export default ResetPassword;
