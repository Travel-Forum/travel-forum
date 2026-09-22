import { Box, Heading, Text } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Box as="section" textAlign="center" py={{ base: 12, md: 20 }}>
      <Text
        color="colorPalette.600"
        fontWeight="semibold"
        letterSpacing="wider"
        textTransform="uppercase"
        fontSize="sm"
        mb={3}
      >
        Travel together
      </Text>

      <Heading
        as="h1"
        size={{ base: "2xl", md: "4xl" }}
        fontWeight="bold"
        mb={4}
      >
        Real travel advice from real people
      </Heading>

      <Text
        color="gray.600"
        fontSize={{ base: "md", md: "lg" }}
        maxW="2xl"
        mx="auto"
        mb={8}
      >
        A friendly community for travelers to ask questions, share experiences,
        and discover amazing places around the world.
      </Text>

      <Text color="colorPalette.700" fontWeight="semibold" fontSize="lg">
        Find your people. Find your places.
      </Text>
    </Box>
  );
}

export default Hero;
