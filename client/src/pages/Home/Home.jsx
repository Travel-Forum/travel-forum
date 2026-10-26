import { Box, Container } from "@chakra-ui/react";
import PublicNavbar from "../../components/navbar/PublicNavbar/PublicNavbar";
import Hero from "../../components/sections/Hero/Hero";
import KeyFeatures from "../../components/sections/KeyFeatures/KeyFeatures";
import JoinCta from "../../components/sections/JoinCta/JoinCta";
import Footer from "../../components/sections/Footer/Footer";
import StatsBar from "../../components/sections/StatsBar/StatsBar";
import PostsCarousel from "../../components/sections/PostsCarousel/PostsCarousel";
import { MotionConfig } from "motion/react";
import Reveal from "../../components/ui/Reveal/Reveal";

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
          <KeyFeatures />
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
