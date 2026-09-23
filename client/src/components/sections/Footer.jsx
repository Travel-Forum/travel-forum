import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Text,
  Link,
} from "@chakra-ui/react";
import forumLogo from "../../assets/icons/forum-logo.svg";

const Footer = () => {
  return (
    <Box as="footer" borderTopWidth="1px" py={8}>
      <Container maxW="6xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "start", md: "center" }}
          justify="space-between"
          gap={4}
        >
          <HStack gap={3}>
            <Image src={forumLogo} alt="TravelForum logo" h="32px" />
            <Text color="gray.600" fontSize="sm">
              Real people. Real places. A more open world.
            </Text>
          </HStack>

          <HStack gap={6} fontSize="sm" color="gray.600">
            <Link href="#">About</Link>
            <Link href="#">Community Guidelines</Link>
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
          </HStack>
        </Flex>

        <Text color="gray.500" fontSize="xs" mt={6}>
          © 2026 TravelForum. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}

export default Footer;
