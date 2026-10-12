import { useState } from "react";
import { NavLink, Link, useNavigate, useSearchParams } from "react-router-dom";
import { Flex, Box, Input, HStack, IconButton, Image } from "@chakra-ui/react";
import { LuMapPin, LuBell, LuShield } from "react-icons/lu";
import logo from "../../assets/icons/forum-logo.svg";
import ProfileMenu from "../profile/ProfileMenu";
import NotificationBadge from "./NotificationBadge";
import { ColorModeButton } from "../ui/ColorMode";
import { useNotifications } from "../../hooks/useNotifications";
import { useProfile } from "../../hooks/useProfile";

const NAV_ITEMS = [
  { to: "/locations", label: "Locations", icon: LuMapPin },
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
      padding={4}
      gap={4}
      px={{ base: 4, md: 6 }}
      borderBottomWidth="1px"
    >
      <Link to="/feed" onClick={scrollToTop}>
        <Image src={logo} alt="Travel Forum logo" h="40px" />
      </Link>

      <Box flex="1" maxW="400px">
        <Input
          borderRadius="full"
          placeholder="Search"
          value={searchText}
          onChange={handleSearchChange}
        />
      </Box>

      <HStack gap={2}>
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <IconButton
            key={to}
            asChild
            variant="ghost"
            padding={4}
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
            padding={4}
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
