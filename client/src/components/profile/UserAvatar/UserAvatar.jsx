import { Avatar } from "@chakra-ui/react";
import { getFullName } from "../../../utils/profile";

const UserAvatar = ({ profile, size = "md" }) => {
  return (
    <Avatar.Root size={size}>
      <Avatar.Fallback name={getFullName(profile) || profile?.username} />
      <Avatar.Image src={profile?.avatar_url} />
    </Avatar.Root>
  );
};

export default UserAvatar;
