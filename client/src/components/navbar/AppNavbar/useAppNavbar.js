import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useNotifications } from "../../../hooks/useNotifications";
import { useProfile } from "../../../hooks/useProfile";

// The feed and the page itself scroll in different containers,
// so the logo scrolls both back to the top.
const SCROLL_CONTAINER_IDS = ["feed-scroll", "app-scroll"];

export const useAppNavbar = () => {
  const { signOut } = useAuth();
  const { unreadCount } = useNotifications();
  const { profile } = useProfile();
  const [searchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("q") ?? "");
  const navigate = useNavigate();

  // Searching from any page opens the feed with the query in the URL.
  const changeSearch = (text) => {
    setSearchText(text);
    navigate(`/feed?q=${encodeURIComponent(text)}`, { replace: true });
  };

  const scrollToTop = () => {
    SCROLL_CONTAINER_IDS.forEach((id) => {
      document.getElementById(id)?.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const signOutAndLeave = async () => {
    await signOut();
    navigate("/");
  };

  return {
    profile,
    isAdmin: profile?.is_admin ?? false,
    unreadCount,
    searchText,
    changeSearch,
    scrollToTop,
    signOut: signOutAndLeave,
  };
};
