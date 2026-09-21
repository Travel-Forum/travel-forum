import { Box, Heading, Text, Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function JoinCta() {
    return (
        <Box as="section" py={{ base: 10, md: 16 }}>
            <Box bg="colorPalette.50" borderRadius="2xl" px={{ base: 6, md: 12 }} py={{ base: 10, md: 14 }} textAlign="center">
                <Text color="colorPalette.600" fontWeight="semibold" letterSpacing="wider" textTransform="uppercase" fontSize="sm" mb={2}>
                    Ready for your next adventure?
                </Text>
                <Heading as="h2" size="xl" mb={3}>
                    Join TravelForum today
                </Heading>
                <Text color="gray.600" maxW="xl" mx="auto" mb={6}>
                    Create an account to start asking questions, sharing your trips, and connecting with travelers worldwide.
                </Text>
                <HStack gap={4} justify="center">
                    <Link to="/signup">
                        <Button size="lg">Sign up</Button>
                    </Link>
                    <Link to="/signin">
                        <Button variant="outline" size="lg">Sign in</Button>
                    </Link>
                </HStack>
            </Box>
        </Box>
    );
}

export default JoinCta;