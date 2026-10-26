import { NavLink, Link } from "react-router-dom";
import { Flex, Box, Input, HStack, IconButton, Image } from "@chakra-ui/react";
import { LuBell, LuShield } from "react-icons/lu";
import logo from "../../../assets/icons/forum-logo.svg";
import ProfileMenu from "../../profile/ProfileMenu/ProfileMenu";
import NotificationBadge from "../NotificationBadge/NotificationBadge";
import { ColorModeButton } from "../../ui/ColorMode/ColorMode";
import { useAppNavbar } from "./useAppNavbar";

const navButtonProps = {
  asChild: true,
  variant: "ghost",
  size: { base: "sm", md: "md" },
  padding: { base: 2, md: 4 },
  _currentPage: { bg: "bg.muted" },
};

const AppNavbar = () => {
  const {
    profile,
    isAdmin,
    unreadCount,
    searchText,
    changeSearch,
    scrollToTop,
    signOut,
  } = useAppNavbar();

  return (
    <Flex
      as="nav"
      align="center"
      position="sticky"
      top="0"
      zIndex="sticky"
      bg="bg"
      justifyContent="center"
      py={{ base: 2, md: 4 }}
      px={{ base: 3, md: 6 }}
      gap={{ base: 2, md: 4 }}
      borderBottomWidth="1px"
    >
      <Link to="/feed" onClick={scrollToTop}>
        <Image
          src={logo}
          alt="Travel Forum logo"
          h={{ base: "32px", md: "40px" }}
          flexShrink={0}
        />
      </Link>

      <Box flex="1" minW="0" maxW="400px">
        <Input
          borderRadius="full"
          placeholder="Search"
          size={{ base: "sm", md: "md" }}
          value={searchText}
          onChange={(event) => changeSearch(event.target.value)}
        />
      </Box>

      <HStack gap={{ base: 0, md: 2 }} flexShrink={0}>
        <IconButton {...navButtonProps} position="relative">
          <NavLink to="/notifications" aria-label="Notifications">
            <LuBell />
            <NotificationBadge count={unreadCount} />
          </NavLink>
        </IconButton>

        {isAdmin && (
          <IconButton {...navButtonProps}>
            <NavLink to="/admin" aria-label="Admin">
              <LuShield />
            </NavLink>
          </IconButton>
        )}

        <ColorModeButton />
        <ProfileMenu profile={profile} onSignOut={signOut} />
      </HStack>
    </Flex>
  );
};

export default AppNavbar;
