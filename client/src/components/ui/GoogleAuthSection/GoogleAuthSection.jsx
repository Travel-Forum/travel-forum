import { useLocation } from "react-router-dom";
import { Button, HStack, Separator, Stack, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

import { signInWithGoogle } from "../../../services/authService";
import { getRedirectPath } from "../../../utils/getRedirectPath";

const GoogleAuthSection = () => {
  const location = useLocation();

  const handleGoogleSignIn = () => {
    sessionStorage.setItem("redirectAfterAuth", getRedirectPath(location));
    signInWithGoogle();
  };

  return (
    <Stack gap="6">
      <Button variant="outline" w="full" onClick={handleGoogleSignIn}>
        <FcGoogle /> Continue with Google
      </Button>

      <HStack>
        <Separator flex="1" />
        <Text fontSize="sm" color="fg.muted">
          or
        </Text>
        <Separator flex="1" />
      </HStack>
    </Stack>
  );
};

export default GoogleAuthSection;
