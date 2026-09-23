import { NavLink, Link } from "react-router-dom";
import { Flex, Box, Input, HStack, IconButton, Image } from "@chakra-ui/react";
import { LuHouse, LuMapPin, LuBell } from "react-icons/lu";
import logo from "../../assets/icons/forum-logo.svg";
import ProfileMenu from "../profile/ProfileMenu";

const NAV_ITEMS = [
  { to: "/feed", label: "Home", icon: LuHouse },
  { to: "/locations", label: "Locations", icon: LuMapPin },
  { to: "/notifications", label: "Notifications", icon: LuBell },
];
const AppNavbar = () => {
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
      <Link to="/feed">
        <Image src={logo} alt="Travel Forum logo" h="40px" />
      </Link>

      <Box flex="1" maxW="400px">
        <Input borderRadius="full" placeholder="Search" />
      </Box>

      <HStack gap={2}>
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <IconButton
            key={to}
            asChild
            variant="ghost"
            padding={4}
            _currentPage={{ bg: "bg.muted" }}
          >
            <NavLink to={to} aria-label={label}>
              <Icon />
            </NavLink>
          </IconButton>
        ))}

        <ProfileMenu />
      </HStack>
    </Flex>
  );
};

export default AppNavbar;
