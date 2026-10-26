import { useEffect } from "react";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import PublicNavbar from "../components/navbar/PublicNavbar";
import Footer from "../components/sections/Footer";
import Eyebrow from "../components/ui/Eyebrow";
import { useProfile } from "../hooks/useProfile";
import AppNavbar from "../components/navbar/AppNavbar";

const InfoPage = ({ page }) => {
  const { profile } = useProfile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page.key]);

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      {profile ? <AppNavbar /> : <PublicNavbar />}

      <Container maxW="3xl" py={{ base: 10, md: 16 }} flex="1">
        <Eyebrow mb={3}>TravelForum</Eyebrow>
        <Heading
          as="h1"
          fontSize={{ base: "4xl", md: "5xl" }}
          lineHeight="1.1"
          mb={4}
        >
          {page.title}
        </Heading>
        <Text fontSize="lg" color="fg.muted" mb={10}>
          {page.intro}
        </Text>

        {page.note && (
          <Box
            bg="coral.subtle"
            color="coral.fg"
            borderRadius="md"
            px={4}
            py={3}
            mb={10}
            fontSize="sm"
          >
            {page.note}
          </Box>
        )}

        <VStack align="stretch" gap={8}>
          {page.sections.map((section) => (
            <Box key={section.heading}>
              <Heading as="h2" size="lg" mb={2}>
                {section.heading}
              </Heading>
              <Text color="fg.muted" lineHeight="tall">
                {section.body}
              </Text>
            </Box>
          ))}
        </VStack>
      </Container>

      <Footer />
    </Box>
  );
};

export default InfoPage;
