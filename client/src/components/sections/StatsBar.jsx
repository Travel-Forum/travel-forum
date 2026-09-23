import { useEffect, useState } from "react";
import { Box, Flex, Heading, Text, HStack } from "@chakra-ui/react";
import { LuFileText, LuUsers } from "react-icons/lu";
import { getPublicStats } from "../../services/statsService";
import IconBox from "../ui/IconBox";

const StatItem = ({ icon, value, label }) => {
  return (
    <HStack gap={4} flex="1" justify="center" py={4}>
      <IconBox>{icon}</IconBox>
      <Box>
        <Heading size="lg">{value ?? "—"}</Heading>
        <Text color="fg.muted" fontSize="sm">
          {label}
        </Text>
      </Box>
    </HStack>
  );
}

const StatsBar = () => {
  const [posts, setPosts] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await getPublicStats();
      if (!res.error) {
        setPosts(res.data.post_count);
        setUsers(res.data.user_count);
      }
    };
    load();
  }, []);
  return (
    <Box as="section" py={6}>
      <Flex
        direction={{ base: "column", sm: "row" }}
        bg="bg.subtle"
        borderWidth="1px"
        borderColor="border"
        borderRadius="xl"
        px={4}
      >
        <StatItem icon={<LuFileText />} value={posts} label="Total posts" />
        <StatItem icon={<LuUsers />} value={users} label="Active users" />
      </Flex>
    </Box>
  );
};

export default StatsBar;
