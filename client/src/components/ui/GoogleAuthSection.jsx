import { Button, HStack, Separator, Stack, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

import { signInWithGoogle } from "../../services/authService";

export const GoogleAuthSection = () => (
  <Stack gap="6">
    <Button variant="outline" w="full" onClick={signInWithGoogle}>
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
