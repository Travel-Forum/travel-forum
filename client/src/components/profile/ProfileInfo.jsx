import {
  Box,
  Card,
  VStack,
  HStack,
  Avatar,
  Text,
  Separator,
  IconButton,
  Grid,
  GridItem,
  Badge
} from "@chakra-ui/react";
import { LuPencil } from "react-icons/lu";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";

const InfoField = ({ label, value, onEdit }) => (
  <Box>
    <HStack justify="space-between" align="center">
      <Box>
        <Text fontSize="sm" color="fg.muted">
          {label}
        </Text>
        <Text fontSize="md">{value}</Text>
      </Box>
      <IconButton
        aria-label={`Edit ${label}`}
        variant="ghost"
        size="sm"
        onClick={onEdit}
      >
        <LuPencil size={14} />
      </IconButton>
    </HStack>
  </Box>
);

const ProfileInfo = () => {
  const { user } = useAuth();
  const { profile } = useProfile();

  return (
    <Box maxW="700px" mx="auto" mt={10} mb={10} px={4}>
      <Card.Root p={8}>
        <VStack gap={6} align="stretch">
          <VStack gap={3}>
            <Box position="relative">
              <Avatar.Root size="2xl">
                <Avatar.Fallback name={user?.email} />
                <Avatar.Image src={profile?.avatar_url} />
              </Avatar.Root>
              <IconButton
                aria-label="Edit avatar"
                size="xs"
                borderRadius="full"
                position="absolute"
                bottom="0"
                right="0"
              >
                <LuPencil size={12} />
              </IconButton>
            </Box>

            <VStack gap={0}>
              <Text fontSize="2xl" fontWeight="bold">
                George Gulubov
              </Text>
              <Text fontSize="md" color="fg.muted">
                @George321
              </Text>
            </VStack>

            <HStack gap={2}>
              <Badge colorPalette="blue">Member</Badge>
              <Badge colorPalette="green">Active Traveler</Badge>
              <Badge colorPalette="purple">50+ Posts</Badge>
            </HStack>
          </VStack>

          <Separator />

          <Box>
            <HStack justify="space-between" align="center" mb={2}>
              <Text fontSize="lg" fontWeight="semibold">
                About
              </Text>
              <IconButton aria-label="Edit about" variant="ghost" size="sm">
                <LuPencil size={14} />
              </IconButton>
            </HStack>
            <Text color="fg.muted">
              Passionate traveler exploring Southeast Asia. Always happy to
              share visa tips and budget travel hacks.
            </Text>
          </Box>

          <Separator />

          <VStack gap={4} align="stretch">
            <Text fontSize="lg" fontWeight="semibold">
              Personal Information
            </Text>

            <Grid templateColumns="1fr 1fr" gap={5}>
              <GridItem>
                <InfoField
                  label="First Name"
                  value="George"
                  onEdit={() => {}}
                />
              </GridItem>

              <GridItem>
                <InfoField
                  label="Last Name"
                  value="Golubov"
                  onEdit={() => {}}
                />
              </GridItem>

              <GridItem>
                <InfoField
                  label="Email"
                  value="george@example.com"
                  onEdit={() => {}}
                />
              </GridItem>

              <GridItem>
                <InfoField
                  label="Phone"
                  value="+359888123456"
                  onEdit={() => {}}
                />
              </GridItem>
            </Grid>
          </VStack>
        </VStack>
      </Card.Root>
    </Box>
  );
};

export default ProfileInfo;
