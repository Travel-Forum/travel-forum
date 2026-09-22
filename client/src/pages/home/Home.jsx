import { Box, Container } from "@chakra-ui/react";
import Navigation from '../../components/Navigation/Navigation';
import Hero from "../../components/sections/Hero";
import KeyFeatures from "../../components/sections/KeyFeatures";
import JoinCta from "../../components/sections/JoinCta";
import Footer from "../../components/sections/Footer";
import StatsBar from "../../components/sections/StatsBar"
import PostsCarousel from "../../components/sections/PostsCarousel.jsx";
const Home = () => {

    return (
        <Box minH="100vh" colorPalette="blue">
          <Navigation />

          <Container maxW="6xl" py={8}>
            <Hero />
            <StatsBar />
            <PostsCarousel />
            <KeyFeatures />
            <JoinCta/>
          </Container>

          <Footer />
        </Box>
    );
}

export default Home;