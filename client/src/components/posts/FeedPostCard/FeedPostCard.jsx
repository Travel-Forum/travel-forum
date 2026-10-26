import {
  Card,
  HStack,
  Heading,
  Text,
  IconButton,
  Separator,
} from "@chakra-ui/react";
import { LuMessageCircle, LuShare2 } from "react-icons/lu";
import PostMediaGallery from "../PostMediaGallery/PostMediaGallery";
import PostAuthor from "../PostAuthor/PostAuthor";
import LikeButton from "../LikeButton/LikeButton";
import PostActionsMenu from "../PostActionsMenu/PostActionsMenu";
import { cardHoverStyles } from "../../../config/theme";

const FeedPostCard = ({
  post,
  onOpen,
  liked,
  likeCount,
  onToggleLike,
  currentUserId,
  onEdit,
  onDelete,
  disabled = false,
}) => {
  const commentCount = post.comments?.[0]?.count ?? 0;
  const isOwn = post.author?.id === currentUserId;
  const openPost = () => onOpen(post.id);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") openPost();
  };

  return (
    <Card.Root {...cardHoverStyles}>
      <Card.Header>
        <HStack justify="space-between" align="start">
          <PostAuthor author={post.author} date={post.created_at} />
          {isOwn && (
            <PostActionsMenu
              onEdit={() => onEdit(post)}
              onDelete={() => onDelete(post)}
              disabled={disabled}
            />
          )}
        </HStack>
      </Card.Header>

      <Card.Body
        cursor="pointer"
        role="button"
        tabIndex={0}
        onClick={openPost}
        onKeyDown={handleKeyDown}
      >
        <Heading as="h3" size="lg" mb={2}>
          {post.title}
        </Heading>
        <Text whiteSpace="pre-wrap">{post.content}</Text>
        <PostMediaGallery media={post.media} title={post.title} />
      </Card.Body>
      <Separator />

      <Card.Footer justify="space-between" py={2}>
        <LikeButton
          liked={liked}
          count={likeCount}
          onToggle={onToggleLike}
          disabled={disabled}
        />

        <HStack gap={1}>
          <IconButton variant="ghost" aria-label="Comment" onClick={openPost}>
            <LuMessageCircle />
          </IconButton>
          <Text fontSize="sm">{commentCount}</Text>
        </HStack>

        {/* Sharing is not implemented yet */}
        <IconButton variant="ghost" aria-label="Share" disabled>
          <LuShare2 />
        </IconButton>
      </Card.Footer>
    </Card.Root>
  );
};

export default FeedPostCard;
