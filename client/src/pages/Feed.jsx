import { useCallback, useEffect, useState } from 'react';
import { Grid, GridItem, Spinner, Text, VStack } from '@chakra-ui/react';

import { useAuth } from '../hooks/useAuth';
import { createPost, deletePost, getFeedPosts } from '../services/postsService';
import { uploadPostMedia } from '../services/mediaService';
import { showError, showSuccess } from '../utils/toast';

import ProfileCard from '../components/profile/ProfileCard';
import CreatePostTrigger from '../components/posts/CreatePostTrigger';
import CreatePostModal from '../components/posts/CreatePostModal';
import ChatBotWidget from '../components/chatbot/ChatBotWidget';
import FeedPostCard from '../components/posts/FeedPostCard';
import { usePostDetails } from '../hooks/usePostDetails';
import PostDetailsModal from '../components/posts/PostDetailsModal';

const Feed = () => {
  const { user } = useAuth();
  const { post: openedPost, loading: postLoading, isOpen, openPost, closePost } = usePostDetails();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = useCallback(async () => {
    const { data, error } = await getFeedPosts();

    if (error) {
      showError('Could not load posts', error);
    } else {
      setPosts(data);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleCreatePost = async (formData) => {
    const { data: post, error } = await createPost({
      authorId: user.id,
      ...formData,
    });

    if (error) {
      showError('Could not create post', error);
      return;
    }

    const { error: mediaError } = await uploadPostMedia({
      userId: user.id,
      postId: post.id,
      files: formData.media,
    });

    if (mediaError) {
      // Roll back so a retry doesn't create a duplicate post
      await deletePost(post.id);
      showError('Could not upload media', mediaError);
      return;
    }

    showSuccess('Post created', 'Your post is now live.');
    setIsCreateOpen(false);
    await loadPosts();
  };

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "1fr 2fr 1fr" }}
      gap={6}
      maxW="1200px"
      w="full"
      mx="auto"
      p={4}
      pt={6}
      flex="1"
      minH="0"
    >
      <GridItem overflowY="auto">
        <ProfileCard />
      </GridItem>
      <GridItem overflowY="auto">
        <VStack gap={4} align="stretch">
          <CreatePostTrigger onOpenModal={() => setIsCreateOpen(true)} />
          <CreatePostModal
            open={isCreateOpen}
            onClose={() => setIsCreateOpen(false)}
            onSubmit={handleCreatePost}
          />

          <PostDetailsModal
            open={isOpen}
            post={openedPost}
            loading={postLoading}
            onClose={closePost}
          />

          {loading && <Spinner alignSelf="center" color="blue.solid" mt={4} />}

          {!loading && posts.length === 0 && (
            <Text color="fg.muted" textAlign="center" mt={4}>
              No posts yet. Be the first to share your travel story!
            </Text>
          )}

          {posts.map((post) => (
            <FeedPostCard key={post.id} post={post} onOpen={openPost} />
          ))}
        </VStack>
      </GridItem>
      <GridItem overflowY="auto">
        <ChatBotWidget />
      </GridItem>
    </Grid>
  );
};

export default Feed;