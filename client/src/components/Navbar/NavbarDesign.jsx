import { Flex, Box, Input, HStack, IconButton, Image} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LuHome, LuMapPin, LuBell } from 'react-icons/lu';
import forumLogo from '../../assets/icons/Forum logo.svg';

function NavbarDesign() {
    return (
        <Flex as="nav" align="center" gap={4} px={{base:4, md: 6}} borderBottomWidth="1px">
           <Link to="/"><Image src={forumLogo} alt="Travel Forum logo" h="40px" /></Link>

            <Box flex="1" maxW="500px">
                <Input placeholder="Search"/>
            </Box>

            <HStack gap={2}>
                <Link to="/"><IconButton aria-label="Home" variant="ghost"><LuHome /></IconButton></Link>
                <Link to="/locations"><IconButton aria-label="Locations" variant = "ghost"><LuMapPin /></IconButton></Link>
                <IconButton aria-label="Notifications" variant="ghost"><LuBell /></IconButton>
            </HStack>
        </Flex>
    );

}
export default NavbarDesign;