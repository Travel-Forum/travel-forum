import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { useAuth } from '../../hooks/useAuth';
import Loading from '../ui/Loading';
import ProfileCard from '../profile/ProfileCard';
import CreatePostTrigger from '../posts/CreatePostTrigger';
import ChatBotWidget from '../chatbot/ChatBotWidget';
import FeedPostCard from '../posts/FeedPostCard';
import { mockPosts } from '../../mocks/mockPosts';

const Feed = () => {
  const { loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <Grid templateColumns="1fr 2fr 1fr" gap={6} maxW="1200px" w="full" mx="auto" p={4} pt={6} flex="1" minH="0">
      <GridItem overflowY="auto">
        <ProfileCard />
      </GridItem>
      <GridItem overflowY="auto">
        <VStack gap={4} align="stretch">
          <CreatePostTrigger />
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