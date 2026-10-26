import { useState } from "react";
import { Button, Icon, Text, VStack } from "@chakra-ui/react";
import { LuCircleX } from "react-icons/lu";

const ErrorState = ({ message = "Something went wrong", onRetry }) => {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = async () => {
    setRetrying(true);
    await onRetry();
    setRetrying(false);
  };

  return (
    <VStack justify="center" minH="100vh" gap={3} px={4} textAlign="center">
      <Icon boxSize="10" color="fg.error">
        <LuCircleX />
      </Icon>
      <Text fontWeight="medium">{message}</Text>
      {onRetry && (
        <Button variant="outline" onClick={handleRetry} loading={retrying}>
          Try again
        </Button>
      )}
    </VStack>
  );
};

export default ErrorState;
