import { Link as RouterLink, useLocation } from "react-router-dom";
import { Button, Stack, Text } from "@chakra-ui/react";
import { LuMailCheck } from "react-icons/lu";
import AuthCard from "../../components/ui/AuthCard/AuthCard";

const VerifyEmail = () => {
  const { state } = useLocation();
  const email = state?.email;

  return (
    <AuthCard title="Travel Forum" maxW="md">
      <Stack gap="4" align="center" py="6" textAlign="center">
        <LuMailCheck
          size={40}
          color="var(--chakra-colors-color-palette-solid)"
        />
        <Text fontWeight="medium" fontSize="lg">
          Check your email
        </Text>
        <Text color="fg.muted" fontSize="sm">
          We sent a confirmation link to{" "}
          {email ? (
            <Text as="span" fontWeight="semibold">
              {email}
            </Text>
          ) : (
            "your email"
          )}
          . Open it to finish signing up.
        </Text>
        <Text color="fg.muted" fontSize="xs">
          Can&apos;t find it? Check your spam folder.
        </Text>
        <Button asChild variant="outline" mt="2">
          <RouterLink to="/signin">Back to Sign In</RouterLink>
        </Button>
      </Stack>
    </AuthCard>
  );
};

export default VerifyEmail;
