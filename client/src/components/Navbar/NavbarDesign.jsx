import { Flex, Box, Input, HStack, IconButton, Image, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuHouse, LuMapPin, LuBell } from "react-icons/lu";
import forumLogo from "../../assets/icons/Forum logo.svg";

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
        <Image src={forumLogo} alt="Travel Forum logo" h="40px" />
      </Link>

      <Box flex="1" maxW="400px" >
        <Input borderRadius={'full'} placeholder="Search" />
      </Box>

      <HStack gap={2}>
        <Link to="/">
          <IconButton aria-label="Home" variant="ghost">
            <LuHouse size={4} />
          </IconButton>
        </Link>
        <Link to="/locations">
          <IconButton aria-label="Locations" variant="ghost">
            <LuMapPin size={4} />
          </IconButton>
        </Link>

        <IconButton aria-label="Notifications" variant="ghost">
          <LuBell size={4} />
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
