import { Menu, Portal, chakra } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { INFO_PAGES } from "../../content/infoPages";
import UserAvatar from "./UserAvatar";

const ProfileMenu = () => {
  const { signOut } = useAuth()
  const { profile } = useProfile()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <chakra.button rounded="full" cursor="pointer">
          <UserAvatar profile={profile} size={{ base: "sm", md: "md" }} />
        </chakra.button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="profile" onClick={() => navigate('/profile')}>
              My Profile
            </Menu.Item>

            {/* The feed hides its footer on smaller screens, so its links live here instead */}
            <Menu.Separator hideFrom="lg" />
            <Menu.ItemGroup hideFrom="lg">
              {INFO_PAGES.map((page) => (
                <Menu.Item
                  key={page.key}
                  value={page.key}
                  onClick={() => navigate(page.path)}
                >
                  {page.label}
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
            <Menu.Separator hideFrom="lg" />

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
