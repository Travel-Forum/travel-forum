import { Card, HStack, VStack, Avatar, Text, IconButton, Separator } from "@chakra-ui/react"
import { LuThumbsUp, LuMessageCircle, LuShare2 } from "react-icons/lu"
import { getFullName } from "../../utils/profile"
import { formatDate } from "../../utils/date"

const FeedPostCard = ({ post }) => {
  const { author } = post
  const authorName = getFullName(author) || "Unknown user"
  const likeCount = post.post_likes?.[0]?.count ?? 0
  const commentCount = post.comments?.[0]?.count ?? 0

  return (
    <Card.Root>
      <Card.Header>
        <HStack gap={3}>
          <Avatar.Root>
            <Avatar.Fallback name={authorName} />
            <Avatar.Image src={author?.avatar_url} />
          </Avatar.Root>
          <VStack align="start" gap={0}>
            <Text fontWeight="bold">{authorName}</Text>
            {author?.username && (
              <Text fontSize="sm" color="fg.muted">@{author.username}</Text>
            )}
            <Text fontSize="xs" color="fg.muted">{formatDate(post.created_at)}</Text>
          </VStack>
        </HStack>
      </Card.Header>

      <Card.Body>
        <Text fontSize="lg" fontWeight="semibold" mb={2}>{post.title}</Text>
        <Text whiteSpace="pre-wrap">{post.content}</Text>
      </Card.Body>

      <Separator />

      <Card.Footer justify="space-between">
        <HStack gap={1}>
          <IconButton variant="ghost" aria-label="Like">
            <LuThumbsUp />
          </IconButton>
          <Text fontSize="sm">{likeCount}</Text>
        </HStack>

        <HStack gap={1}>
          <IconButton variant="ghost" aria-label="Comment">
            <LuMessageCircle />
          </IconButton>
          <Text fontSize="sm">{commentCount}</Text>
        </HStack>

        <IconButton variant="ghost" aria-label="Share">
          <LuShare2 />
        </IconButton>
      </Card.Footer>
    </Card.Root>
  )
}

export default FeedPostCard