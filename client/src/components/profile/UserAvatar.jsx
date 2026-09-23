import { Avatar } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { getFullName } from "../../utils/profile";

const UserAvatar = ({ size = "md" }) => {
  const { user } = useAuth();
  const { profile } = useProfile();

  return (
    <Avatar.Root size={size}>
      <Avatar.Fallback name={getFullName(profile) || user?.email} />
      <Avatar.Image src={user?.user_metadata?.avatar_url} />
    </Avatar.Root>
  );
};

export default UserAvatar;
