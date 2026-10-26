import { Outlet } from "react-router-dom";
import AppNavbar from "../../components/navbar/AppNavbar/AppNavbar";
import { useProfile } from "../../hooks/useProfile";
import { Alert, Flex } from "@chakra-ui/react";

const AppLayout = () => {
  const { profile } = useProfile();

  return (
    <Flex direction="column" h="100dvh">
      <AppNavbar />

      {profile?.is_blocked && (
        <Alert.Root
          status="error"
          variant="subtle"
          size="sm"
          borderRadius="0"
          justifyContent="center"
          alignItems="center"
          flexShrink={0}
        >
          <Alert.Indicator />
          <Alert.Content
            flex="0 1 auto"
            flexDirection="row"
            flexWrap="wrap"
            columnGap={1}
          >
            <Alert.Title>You are blocked.</Alert.Title>
            <Alert.Description>
              You can only read and mark notifications as read.
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      <Flex
        direction="column"
        flex="1"
        minH="0"
        overflowY="auto"
        id="app-scroll"
      >
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default AppLayout;
