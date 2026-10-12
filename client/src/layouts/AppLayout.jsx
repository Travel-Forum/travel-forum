import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AppNavbar from "../components/navbar/AppNavbar";

const AppLayout = () => (
  <Flex direction="column" h="100dvh">
    <AppNavbar />
    <Flex direction="column" flex="1" minH="0" overflowY="auto" id="app-scroll">
      <Outlet />
    </Flex>
  </Flex>
);

export default AppLayout;