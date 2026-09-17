import { Flex, Box, Input, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function NavbarDesign() {
    return (
        <Flex as="nav" align="center" gap={4} px={{base:4, md: 6}} borderBottomWidth="1px">
            <Link to="/"><Text fontWeight="bold">logo</Text></Link>

            <Box flex="1" maxW="500px">
                <Input placeholder="Search"/>
            </Box>
        </Flex>
    )
}
export default NavbarDesign;