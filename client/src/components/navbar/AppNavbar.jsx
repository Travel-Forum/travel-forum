import { Flex, Box, Input, HStack, IconButton, Image } from "@chakra-ui/react";
import { LuHouse, LuMapPin, LuBell } from "react-icons/lu";
import logo from "../../assets/icons/forum-logo.svg";
import ProfileMenu from "../profile/ProfileMenu";

const AppNavbar = ({ activeSection, onSectionClick }) => {
  return (
    <Flex
      as="nav"
      align="center"
      position="sticky"
      top="0"
      zIndex="sticky"
      bg="bg"
      justifyContent="center"
      padding={4}
      gap={4}
      px={{ base: 4, md: 6 }}
      borderBottomWidth="1px"
    >
      <Image onClick={() => onSectionClick("overview")} cursor={'pointer'} src={logo} alt="Travel Forum logo" h="40px" />

      <Box flex="1" maxW="400px">
        <Input borderRadius="full" placeholder="Search" />
      </Box>

      <HStack gap={2}>
        <IconButton
          aria-label="Home"
          variant={activeSection === "overview" ? "subtle" : "ghost"}
          padding={4}
          onClick={() => onSectionClick("overview")}
        >
          <LuHouse />
        </IconButton>

        <IconButton
          aria-label="Locations"
          variant={activeSection === "locations" ? "subtle" : "ghost"}
          padding={4}
          onClick={() => onSectionClick("locations")}
        >
          <LuMapPin />
        </IconButton>

        <IconButton
          aria-label="Notifications"
          variant={activeSection === "notifications" ? "subtle" : "ghost"}
          padding={4}
          onClick={() => onSectionClick("notifications")}
        >
          <LuBell />
        </IconButton>

        <ProfileMenu activeSection={activeSection} onSectionClick={onSectionClick} />
      </HStack>
    </Flex>
  );
};

export default AppNavbar;