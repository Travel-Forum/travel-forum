import { Flex, Box, Input, HStack, IconButton, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuHouse, LuMapPin, LuBell } from "react-icons/lu";
import logo from "../../assets/icons/Forum logo.svg";
import ProfileMenu from "../Profile/ProfileMenu/ProfileMenu";

const NavbarDesign = ({ pathname }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justifyContent={"center"}
      padding={4}
      gap={4}
      px={{ base: 4, md: 6 }}
      borderBottomWidth="1px"
    >
      <Link to="/">
        <Image src={logo} alt="Travel Forum logo" h="40px" />
      </Link>

      <Box flex="1" maxW="400px" >
        <Input borderRadius={'full'} placeholder="Search" />
      </Box>

      <HStack gap={2}>
        <IconButton
          asChild
          aria-label="Home"
          variant={pathname === "/" ? "subtle" : "ghost"}
          padding={4}
        >
          <Link to="/">
            <LuHouse />
          </Link>
        </IconButton>
        <IconButton
          asChild
          aria-label="Locations"
          variant={pathname === "/locations" ? "subtle" : "ghost"}
          padding={4}
        >
          <Link to="/locations">
            <LuMapPin />
          </Link>
        </IconButton>

        <IconButton aria-label="Notifications" variant="ghost" padding={4}>
          <LuBell />
        </IconButton>

        <ProfileMenu />
      </HStack>
    </Flex>
  );
};
export default NavbarDesign;
