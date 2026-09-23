import { Flex, HStack, Image, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import forumLogo from '../../assets/icons/forum-logo.svg';

const PublicNavbar = () => {
    return (
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          px={{base: 4, md: 6}}
          py={3}
          borderBottomWidth="1px"
        >
            <Link to ="/">
            <Image src={forumLogo} alt="TravelForum logo" h="40px" />
            </Link>

            <HStack gap={2}>
                <Link to="/signin">
                <Button variant="ghost">Sign in</Button>
                </Link>
                <Link to="/signup">
                <Button colorPalette="blue">Sign up</Button>
                </Link>
            </HStack>
        </Flex>
    );
};

export default PublicNavbar;
