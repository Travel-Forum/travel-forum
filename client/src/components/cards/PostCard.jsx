import { Box, Image, Heading, Text, HStack } from "@chakra-ui/react";
import { LuMessageSquare } from "react-icons/lu";

function PostCard({ post }) {
  return (
    <Box borderWidth="1px" borderColor="gray.100" borderRadius="lg" overflow="hidden" bg="white">
      {post.image_url && (
        <Image src={post.image_url} alt={post.title} h="160px" w="100%" objectFit="cover" />
      )}
      <Box p={4}>
        <Heading as="h3" size="md" mb={2} lineClamp={1}>{post.title}</Heading>
        <Text color="gray.600" fontSize="sm" mb={3} lineClamp={2}>{post.content}</Text>
        <HStack color="gray.500" fontSize="sm" gap={2}>
          <LuMessageSquare />
          <Text>{post.comment_count}</Text>
        </HStack>
      </Box>
    </Box>
  );
}

export default PostCard;