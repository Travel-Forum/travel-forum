import { useEffect, useState } from "react";
import { Box, Flex, Heading, Text, HStack } from "@chakra-ui/react";
import { LuFileText, LuUsers } from "react-icons/lu";
import { getUserCount, getPostCount } from "../../../services/statsService/statsService";

function StatItem({ icon, value, label }) {
  return (
    <HStack gap={4} flex="1" justify="center" py={4}>
      <Box p={3} borderRadius="md" bg="colorPalette.50" color="colorPalette.600" fontSize="2xl">
        {icon}
      </Box>
      <Box>
        <Heading size="lg">{value ?? "—"}</Heading>
        <Text color="gray.600" fontSize="sm">{label}</Text>
      </Box>
    </HStack>
  );
}

function StatsBar() {
  const [posts, setPosts] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const load = async () => {
      const postsRes = await getPostCount();
      if (!postsRes.error) setPosts(postsRes.count);

      const usersRes = await getUserCount();
      if (!usersRes.error) setUsers(usersRes.count);
    };
    load();
  }, []);

  return (
    <Box as="section" py={6}>
      <Flex direction={{ base: "column", sm: "row" }} borderWidth="1px" borderColor="gray.100" borderRadius="xl" px={4}>
        <StatItem icon={<LuFileText />} value={posts} label="Total posts" />
        <StatItem icon={<LuUsers />} value={users} label="Active users" />
      </Flex>
    </Box>
  );
}

export default StatsBar;