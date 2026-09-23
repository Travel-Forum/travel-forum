import { Menu, Avatar, Portal, chakra } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ onSectionClick }) => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <chakra.button rounded="full" cursor="pointer">
            <Avatar.Root>
            <Avatar.Fallback name={user?.email} />
            <Avatar.Image src={user?.user_metadata?.avatar_url} />
            </Avatar.Root>
        </chakra.button>
        </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="profileInfo" onClick={() => onSectionClick("profileInfo")}>
              My Profile
            </Menu.Item>
            <Menu.Item value="signout" onClick={handleSignOut}>
              Sign Out
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default ProfileMenu