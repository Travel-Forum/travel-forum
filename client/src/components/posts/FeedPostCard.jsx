import { Card, HStack, Text, IconButton, Separator } from "@chakra-ui/react"
import { LuMessageCircle, LuShare2 } from "react-icons/lu"
import PostMediaGallery from "./PostMediaGallery"
import PostAuthor from "./PostAuthor"
import LikeButton from "./LikeButton"

const FeedPostCard = ({ post, onOpen, liked, likeCount, onToggleLike }) => {
  const commentCount = post.comments?.[0]?.count ?? 0
  const openPost = () => onOpen(post.id)
  const handleKeyDown = (event) => {
    if (event.key === "Enter") openPost()
  }

  return (
    <Card.Root>
      <Card.Header>
        <PostAuthor author={post.author} date={post.created_at} />
      </Card.Header>

      <Card.Body cursor="pointer" role="button" tabIndex={0} onClick={openPost} onKeyDown={handleKeyDown}>
        <Text fontSize="lg" fontWeight="semibold" mb={2}>{post.title}</Text>
        <Text whiteSpace="pre-wrap">{post.content}</Text>
        <PostMediaGallery media={post.media} title={post.title} />
      </Card.Body>
      <Separator />

      <Card.Footer justify="space-between">
        <LikeButton liked={liked} count={likeCount} onToggle={onToggleLike} />

        <HStack gap={1}>
          <IconButton variant="ghost" aria-label="Comment" onClick={openPost}>
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