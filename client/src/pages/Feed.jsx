import { useState } from 'react';
import { Grid, GridItem, VStack } from '@chakra-ui/react';

import { useAuth } from '../hooks/useAuth';
import { createPost } from '../services/postsService';
import { showError, showSuccess } from '../utils/toast';

import ProfileCard from '../components/profile/ProfileCard';
import CreatePostTrigger from '../components/posts/CreatePostTrigger';
import CreatePostModal from '../components/posts/CreatePostModal';
import ChatBotWidget from '../components/chatbot/ChatBotWidget';
import FeedPostCard from '../components/posts/FeedPostCard';
import { mockPosts } from '../mocks/mockPosts';

const Feed = () => {
  const { user } = useAuth();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreatePost = async (formData) => {
    const { error } = await createPost({
      authorId: user.id,
      ...formData,
    });

    if (error) {
      showError('Could not create post', error);
      return;
    }

    showSuccess('Post created', 'Your post is now live.');
    setIsCreateOpen(false);
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
          {mockPosts.map((post) => (
            <FeedPostCard key={post.id} post={post} />
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