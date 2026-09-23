import { Box, Heading, Text } from "@chakra-ui/react";
import Eyebrow from "../ui/Eyebrow";

const Hero = () => {
  return (
    <Box as="section" textAlign="center" py={{ base: 12, md: 20 }}>
      <Eyebrow mb={3}>Travel together</Eyebrow>

      <Heading
        as="h1"
        size={{ base: "2xl", md: "4xl" }}
        fontWeight="bold"
        mb={4}
      >
        Real travel advice from real people
      </Heading>

      <Text
        color="fg.muted"
        fontSize={{ base: "md", md: "lg" }}
        maxW="2xl"
        mx="auto"
        mb={8}
      >
        A friendly community for travelers to ask questions, share experiences,
        and discover amazing places around the world.
      </Text>

      <Text color="colorPalette.fg" fontWeight="semibold" fontSize="lg">
        Find your people. Find your places.
      </Text>
    </Box>
  );
}

export default Hero;
