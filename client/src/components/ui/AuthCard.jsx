import { Box, Card, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import logo from "../../assets/icons/forum-logo.svg";

export const AuthCard = ({ title, onSubmit, footer, maxW = "lg", children }) => {
  const content = (
    <>
      <Card.Header>
        <Card.Title textAlign="center">
          <HStack justify="center" gap="2">
            <RouterLink to="/" style={{ display: "inline-flex" }}>
              <img src={logo} alt="Travel Forum logo" width="24" height="24" />
            </RouterLink>
            <span>{title}</span>
          </HStack>
        </Card.Title>
      </Card.Header>

      <Card.Body>{children}</Card.Body>

      {footer && (
        <Card.Footer justifyContent="center" flexDirection="column" gap="2">
          {footer}
        </Card.Footer>
      )}
    </>
  );

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p="4"
    >
      {onSubmit ? (
        <Card.Root maxW={maxW} w="full" mx="auto" asChild>
          <form onSubmit={onSubmit}>{content}</form>
        </Card.Root>
      ) : (
        <Card.Root maxW={maxW} w="full" mx="auto">
          {content}
        </Card.Root>
      )}
    </Box>
  );
};
