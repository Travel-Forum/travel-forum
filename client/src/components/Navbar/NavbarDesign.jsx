import { Flex, Box, Input, HStack, IconButton, Image, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuHouse, LuMapPin, LuBell } from "react-icons/lu";
import logo from "../../assets/icons/Forum logo.svg";

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
        <Link to="/">
          <IconButton aria-label="Home" variant="ghost" padding={4}>
            <LuHouse />
          </IconButton>
        </Link>
        <Link to="/locations">
          <IconButton aria-label="Locations" variant="ghost" padding={4}>
            <LuMapPin />
          </IconButton>
        </Link>

        <IconButton aria-label="Notifications" variant="ghost" padding={4}>
          <LuBell />
        </IconButton>

        <Avatar.Root>
            <Avatar.Fallback name="Segun Adebayo" />
            <Avatar.Image src="https://bit.ly/sage-adebayo" />
        </Avatar.Root>
      </HStack>
    </Flex>
  );
};
export default NavbarDesign;
