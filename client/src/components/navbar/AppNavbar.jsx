import { useState } from "react";
import { NavLink, Link, useNavigate, useSearchParams } from "react-router-dom";
import { Flex, Box, Input, HStack, IconButton, Image } from "@chakra-ui/react";
import { LuBell, LuShield } from "react-icons/lu";
import logo from "../../assets/icons/forum-logo.svg";
import ProfileMenu from "../profile/ProfileMenu";
import NotificationBadge from "./NotificationBadge";
import { ColorModeButton } from "../ui/ColorMode";
import { useNotifications } from "../../hooks/useNotifications";
import { useProfile } from "../../hooks/useProfile";

const NAV_ITEMS = [
  { to: "/notifications", label: "Notifications", icon: LuBell },
];
const AppNavbar = () => {
  const { unreadCount } = useNotifications();
  const { profile } = useProfile();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [searchText, setSearchText] = useState(query ?? "");
  const navigate = useNavigate();

  const handleSearchChange = (event) => {

    const text = event.target.value;

    setSearchText(text);
    navigate(`/feed?q=${encodeURIComponent(text)}`, { replace: true });
  }

  const scrollToTop = () => {
    ["feed-scroll", "app-scroll"].forEach((id) => {
      document.getElementById(id)?.scrollTo({ top: 0, behavior: "smooth" });
    });
  };


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
        <Image src={logo} alt="Travel Forum logo" h={{ base: "32px", md: "40px" }} flexShrink={0} />
      </Link>

      <Box flex="1" minW="0" maxW="400px">
        <Input
          borderRadius="full"
          placeholder="Search"
          size={{ base: "sm", md: "md" }}
          value={searchText}
          onChange={handleSearchChange}
        />
      </Box>

      <HStack gap={{ base: 0, md: 2 }} flexShrink={0}>
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <IconButton
            key={to}
            asChild
            variant="ghost"
            size={{ base: "sm", md: "md" }}
            padding={{ base: 2, md: 4 }}
            position="relative"
            _currentPage={{ bg: "bg.muted" }}
          >
            <NavLink to={to} aria-label={label}>
              <Icon />
              {to === "/notifications" && (
                <NotificationBadge count={unreadCount} />
              )}
            </NavLink>
          </IconButton>
        ))}

        {profile?.is_admin && (
          <IconButton
            asChild
            variant="ghost"
            size={{ base: "sm", md: "md" }}
            padding={{ base: 2, md: 4 }}
            _currentPage={{ bg: "bg.muted" }}
          >
            <NavLink to="/admin" aria-label="Admin">
              <LuShield />
            </NavLink>
          </IconButton>
        )}

        <ColorModeButton />
        <ProfileMenu />
      </HStack>
    </Flex>
  );
};

export default AppNavbar;
