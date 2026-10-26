import {
  Box,
  Grid,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuPlane } from "react-icons/lu";
import Eyebrow from "../ui/Eyebrow";

const TICKET_FIELDS = [
  { label: "Passenger", value: "You" },
  { label: "Gate", value: "TF-01" },
  { label: "Seat", value: "Window" },
];

const TicketField = ({ label, value }) => (
  <Box>
    <Text
      fontSize="xs"
      color="fg.muted"
      textTransform="uppercase"
      letterSpacing="wider"
    >
      {label}
    </Text>
    <Text fontWeight="semibold">{value}</Text>
  </Box>
);

const JoinCta = () => {
  return (
    <Box as="section" py={{ base: 10, md: 16 }}>
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 220px" }}
        bg="bg.panel"
        borderRadius="2xl"
        boxShadow="lg"
        overflow="hidden"
      >
        <Box px={{ base: 6, md: 10 }} py={{ base: 8, md: 10 }}>
          <Eyebrow mb={4}>Boarding pass</Eyebrow>

          <HStack
            gap={4}
            mb={6}
            fontFamily="heading"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
          >
            <Text>Home</Text>
            <Box color="coral.solid">
              <LuPlane />
            </Box>
            <Text>Anywhere</Text>
          </HStack>

          <Heading as="h2" size="xl" mb={3}>
            Join TravelForum today
          </Heading>
          <Text color="fg.muted" maxW="xl" mb={6}>
            Create an account to start asking questions, sharing your trips, and
            connecting with travelers worldwide.
          </Text>

          <HStack gap={4}>
            <Link to="/signup">
              <Button size="lg" colorPalette="coral">
                Sign up
              </Button>
            </Link>
            <Link to="/signin">
              <Button variant="outline" size="lg">
                Sign in
              </Button>
            </Link>
          </HStack>
        </Box>

        <VStack
          align="start"
          justify="center"
          gap={4}
          px={8}
          py={{ base: 6, md: 10 }}
          bg="colorPalette.subtle"
          borderStyle="dashed"
          borderColor="border.emphasized"
          borderLeftWidth={{ base: 0, md: "2px" }}
          borderTopWidth={{ base: "2px", md: 0 }}
        >
          {TICKET_FIELDS.map((field) => (
            <TicketField key={field.label} {...field} />
          ))}
          <Box
            h="48px"
            w="full"
            color="fg"
            opacity={0.7}
            bgImage="repeating-linear-gradient(90deg, currentColor 0 2px, transparent 2px 4px, currentColor 4px 5px, transparent 5px 8px)"
          />
        </VStack>
      </Grid>
    </Box>
  );
};

export default JoinCta;
