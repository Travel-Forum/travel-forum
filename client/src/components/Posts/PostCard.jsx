import { Card, HStack, VStack, Avatar, Text, IconButton, Separator, Box, Image } from "@chakra-ui/react"
import { LuThumbsUp, LuMessageCircle, LuShare2, LuX } from "react-icons/lu"

const PostCard = ({ post }) => {
  return (
    <Card.Root>
      <Card.Header>
        <HStack gap={3}>
          <Avatar.Root>
            <Avatar.Fallback name={post.authorName} />
            <Avatar.Image src={post.authorAvatar} />
          </Avatar.Root>
          <VStack align="start" gap={0}>
            <Text fontWeight="bold">{post.authorName}</Text>
            <Text fontSize="sm" color="fg.muted">{post.authorTitle}</Text>
            <Text fontSize="xs" color="fg.muted">{post.timeAgo}</Text>
          </VStack>
        </HStack>
      </Card.Header>

      <Card.Body>
        <Text mb={3}>{post.content}</Text>
        {post.image && (
          <Image src={post.image} alt="Post image" borderRadius="md" w="full" />
        )}
      </Card.Body>

      <Separator />

      <Card.Footer justify="space-between">
        <HStack gap={1}>
          <IconButton variant="ghost" aria-label="Like">
            <LuThumbsUp />
          </IconButton>
          <Text fontSize="sm">{post.likes}</Text>
        </HStack>

        <HStack gap={1}>
          <IconButton variant="ghost" aria-label="Comment">
            <LuMessageCircle />
          </IconButton>
          <Text fontSize="sm">{post.comments}</Text>
        </HStack>

        <IconButton variant="ghost" aria-label="Share">
          <LuShare2 />
        </IconButton>
      </Card.Footer>
    </Card.Root>
  )
}

export default PostCard