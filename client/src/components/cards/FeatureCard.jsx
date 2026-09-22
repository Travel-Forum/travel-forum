import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <VStack
      align="start"
      gap={3}
      p={6}
      bg="white"
      borderWidth="1px"
      borderColor="gray.100"
      borderRadius="lg"
    >
      <Box
        p={3}
        borderRadius="md"
        bg="colorPalette.50"
        color="colorPalette.600"
        fontSize="2xl"
      >
        {icon}
      </Box>
      <Heading as="h3" size="md">
        {title}
      </Heading>
      <Text color="gray.600" fontSize="sm">
        {description}
      </Text>
    </VStack>
  );
}

export default FeatureCard;
