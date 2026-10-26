import { Box, Image, Text } from "@chakra-ui/react";

const Polaroid = ({ src, alt, caption, rotate, ...props }) => (
  <Box
    position="absolute"
    bg="white"
    p={3}
    pb={10}
    w={{ base: "150px", md: "220px" }}
    boxShadow="lg"
    transform={`rotate(${rotate}deg)`}
    transition="transform 0.3s ease"
    _hover={{ transform: "rotate(0deg) scale(1.05)", zIndex: 2 }}
    {...props}
  >
    <Image src={src} alt={alt} w="full" aspectRatio={4 / 5} objectFit="cover" />
    <Text
      position="absolute"
      bottom={3}
      left={0}
      right={0}
      textAlign="center"
      fontFamily="heading"
      fontStyle="italic"
      color="gray.700"
    >
      {caption}
    </Text>
  </Box>
);

export default Polaroid;
