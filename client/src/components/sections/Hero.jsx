import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import Eyebrow from "../ui/Eyebrow";
import Polaroid from "../cards/Polaroid";
import seaPhoto from "../../assets/images/hero-sea.jpg";
import mountainsPhoto from "../../assets/images/hero-mountains.jpg";
import cityPhoto from "../../assets/images/hero-city.jpg";

const PHOTOS = [
  { src: seaPhoto, alt: "Beach with palm trees", caption: "Sea", rotate: -6, top: 0, left: 0 },
  { src: mountainsPhoto, alt: "Mountain lake", caption: "Mountains", rotate: 4, top: "18%", right: 0, zIndex: 1 },
  { src: cityPhoto, alt: "City street", caption: "City", rotate: -2, bottom: 0, left: "30%" },
];

const Hero = () => {
  return (
    <Grid
      as="section"
      templateColumns={{ base: "1fr", md: "1.1fr 1fr" }}
      gap={{ base: 10, md: 12 }}
      alignItems="center"
      py={{ base: 10, md: 16 }}
    >
      <Box>
        <Eyebrow mb={3}>Travel together</Eyebrow>

        <Heading
          as="h1"
          fontSize={{ base: "4xl", md: "6xl" }}
          lineHeight="1.05"
          mb={5}
        >
          Real travel advice from{" "}
          <Box as="span" color="coral.solid" fontStyle="italic">
            real people
          </Box>
        </Heading>

        <Text color="fg.muted" fontSize={{ base: "md", md: "lg" }} maxW="lg" mb={6}>
          A friendly community for travelers to ask questions, share experiences,
          and discover amazing places around the world.
        </Text>

        <Text color="colorPalette.fg" fontWeight="semibold" fontSize="lg">
          Find your people. Find your places.
        </Text>
      </Box>

      <Box position="relative" h={{ base: "320px", md: "460px" }}>
        {PHOTOS.map(({ caption, ...photo }) => (
          <Polaroid key={caption} caption={caption} {...photo} />
        ))}
      </Box>
    </Grid>
  );
};

export default Hero;