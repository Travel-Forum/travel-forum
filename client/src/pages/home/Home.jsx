import { Box, Container } from "@chakra-ui/react";
import Navigation from '../../components/Navigation/Navigation';

const Home = () => {

    return (
        <Box minH="100vh">
          <Navigation />

          <Container maxW="6xl" py={8}>
            <Box as="section" py={10} textAlign="center">Hero (TODO)</Box>
            <Box as="section" py={6}>Stats (TODO)</Box>
            <Box as="section" py={6}>Posts carousel (TODO)</Box>
            <Box as="section" py={10}>Key features (TODO)</Box>
            <Box as="section" py={10}>Join CTA</Box>
          </Container>

          <Box as="footer" borderTopWidth="1px" py={8} textAlign="center">Footer (TODO)</Box>
        </Box>
    );
}

export default Home;