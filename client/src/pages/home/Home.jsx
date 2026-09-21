import { Box, Container } from "@chakra-ui/react";
import Navigation from '../../components/Navigation/Navigation';
import Hero from "./sections/Hero";
import KeyFeatures from "./sections/KeyFeatures";
import JoinCta from "./sections/JoinCta";
import Footer from "./sections/Footer";
import StatsBar from "./sections/StatsBar"
const Home = () => {

    return (
        <Box minH="100vh" colorPalette="blue">
          <Navigation />

          <Container maxW="6xl" py={8}>
            <Hero />
            <StatsBar />
            <Box as="section" py={6}>Posts carousel (TODO)</Box>
            <KeyFeatures />
            <JoinCta/>
          </Container>

          <Footer />
        </Box>
    );
}

export default Home;