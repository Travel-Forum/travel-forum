import { getPostLikeCount } from "../../../utils/post";
import FeedPostCard from "../FeedPostCard/FeedPostCard";

// The list of post cards used by the feed and by user profiles.
const PostList = ({
  posts,
  isLiked,
  getLikeCount,
  onToggleLike,
  onOpen,
  currentUserId,
  onEdit,
  onDelete,
  onShare,
  disabled = false,
}) =>
  posts.map((post) => {
    const likeCount = getLikeCount(post.id, getPostLikeCount(post));

    return (
      <FeedPostCard
        key={post.id}
        post={post}
        onOpen={onOpen}
        liked={isLiked(post.id)}
        likeCount={likeCount}
        onToggleLike={() => onToggleLike(post.id, likeCount)}
        currentUserId={currentUserId}
        onEdit={onEdit}
        onDelete={onDelete}
        onShare={onShare}
        disabled={disabled}
      />
    );
  });

export default PostList;
