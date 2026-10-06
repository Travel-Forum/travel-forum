import { Box, Card, HStack, Separator, Text } from "@chakra-ui/react";
import { LuMessageCircle } from "react-icons/lu";
import PostAuthor from "./PostAuthor";
import PostCommentList from "./PostCommentList";
import CommentForm from "./CommentForm";
import LikeButton from "./LikeButton";
import PostActionsMenu from "./PostActionsMenu";
import ExpandableText from "../ui/ExpandableText";

const PostDetailsPanel = ({
  post,
  liked,
  likeCount,
  onToggleLike,
  currentUserId,
  onAddComment,
  onReplyComment,
  onEditComment,
  onDeleteComment,
  onEditPost,
  onDeletePost,
}) => {
  const comments = post.comments ?? [];
  const canManagePost =
    post.author?.id === currentUserId && onEditPost && onDeletePost;

  return (
    <Card.Root maxH={{ lg: "65vh" }} overflow="hidden">
      <Card.Header>
        <HStack justify="space-between" align="start">
          <PostAuthor author={post.author} date={post.created_at} />
          {canManagePost && (
            <PostActionsMenu
              portalled={false}
              onEdit={() => onEditPost(post)}
              onDelete={() => onDeletePost(post)}
            />
          )}
        </HStack>
      </Card.Header>

      <Card.Body overflowY="auto" gap={4}>
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            {post.title}
          </Text>
          <ExpandableText>{post.content}</ExpandableText>
        </Box>

        <HStack gap={4} color="fg.muted" fontSize="sm">
          <LikeButton
            liked={liked}
            count={likeCount}
            onToggle={onToggleLike}
            size="sm"
          />
          <HStack gap={1}>
            <LuMessageCircle />
            <Text>{comments.length} comments</Text>
          </HStack>
        </HStack>

        <Separator />

        <CommentForm onSubmit={onAddComment} />

        <PostCommentList 
          comments={comments}
          currentUserId={currentUserId}
          onReply={onReplyComment}
          onEdit={onEditComment}
          onDelete={onDeleteComment}
        />
      </Card.Body>
    </Card.Root>
  );
};

export default PostDetailsPanel;