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
import { Link as RouterLink } from "react-router-dom";
import { INFO_PAGES } from "../../content/infoPages";

const WAVE_PATH =
  "M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z";

const Footer = () => {
  return (
    <Box as="footer" mt={{ base: 8, md: 12 }}>
      <Box color="colorPalette.subtle" lineHeight={0} aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          width="100%"
          height="60"
        >
          <path fill="currentColor" d={WAVE_PATH} />
        </svg>
      </Box>

      <Box bg="colorPalette.subtle" py={8}>
        <Container maxW="6xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "start", md: "center" }}
            justify="space-between"
            gap={4}
          >
            <HStack gap={3}>
              <Image src={forumLogo} alt="TravelForum logo" h="32px" />
              <Text color="fg.muted" fontSize="sm">
                Real people. Real places. A more open world.
              </Text>
            </HStack>

            <HStack gap={6} fontSize="sm" color="fg.muted" wrap="wrap">
              {INFO_PAGES.map((page) => (
                <Link key={page.key} asChild>
                  <RouterLink to={page.path}>{page.label}</RouterLink>
                </Link>
              ))}
            </HStack>
          </Flex>

          <Text color="fg.subtle" fontSize="xs" mt={6}>
            © 2026 TravelForum. All rights reserved.
          </Text>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
