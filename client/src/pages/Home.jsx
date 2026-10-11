import { Box, Container } from "@chakra-ui/react";
import PublicNavbar from "../components/navbar/PublicNavbar";
import Hero from "../components/sections/Hero";
import KeyFeatures from "../components/sections/KeyFeatures";
import JoinCta from "../components/sections/JoinCta";
import Footer from "../components/sections/Footer";
import StatsBar from "../components/sections/StatsBar";
import PostsCarousel from "../components/sections/PostsCarousel";
import { MotionConfig } from "motion/react";
import Reveal from "../components/ui/Reveal";

const Home = () => {
  return (
    <Box minH="100vh">
      <PublicNavbar />

      <MotionConfig reducedMotion="user">
        <Container maxW="6xl" py={8}>
          <Hero />
          <Reveal>
            <StatsBar />
          </Reveal>
          <Reveal>
            <PostsCarousel />
          </Reveal>
          <Reveal>
            <KeyFeatures />
          </Reveal>
          <Reveal>
            <JoinCta />
          </Reveal>
        </Container>
      </MotionConfig>

      <Footer />
    </Box>
  );
};

export default Home;
