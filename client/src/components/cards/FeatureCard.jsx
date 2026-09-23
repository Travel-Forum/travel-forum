import { Heading, Text, VStack } from "@chakra-ui/react";
import IconBox from "../ui/IconBox";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <VStack
      align="start"
      gap={3}
      p={6}
      bg="bg.panel"
      borderWidth="1px"
      borderColor="border.muted"
      borderRadius="lg"
    >
      <IconBox>{icon}</IconBox>
      <Heading as="h3" size="md">
        {title}
      </Heading>
      <Text color="fg.muted" fontSize="sm">
        {description}
      </Text>
    </VStack>
  );
}

export default FeatureCard;
