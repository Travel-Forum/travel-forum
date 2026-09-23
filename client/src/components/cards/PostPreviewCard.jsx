import { Box, Image, Heading, Text, HStack } from "@chakra-ui/react";
import { LuMessageSquare } from "react-icons/lu";

const PostPreviewCard = ({ post }) => {
  return (
    <Box
      borderWidth="1px"
      borderColor="border.muted"
      borderRadius="lg"
      overflow="hidden"
      bg="bg.panel"
    >
      {post.image_url && (
        <Image
          src={post.image_url}
          alt={post.title}
          h="160px"
          w="100%"
          objectFit="cover"
        />
      )}
      <Box p={4}>
        <Heading as="h3" size="md" mb={2} lineClamp={1}>
          {post.title}
        </Heading>
        <Text color="fg.muted" fontSize="sm" mb={3} lineClamp={2}>
          {post.content}
        </Text>
        <HStack color="fg.subtle" fontSize="sm" gap={2}>
          <LuMessageSquare />
          <Text>{post.comment_count}</Text>
        </HStack>
      </Box>
    </Box>
  );
}

export default PostPreviewCard;
