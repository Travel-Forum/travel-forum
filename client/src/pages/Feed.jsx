import { Grid, GridItem, VStack } from '@chakra-ui/react';
import ProfileCard from '../components/profile/ProfileCard';
import CreatePostTrigger from '../components/posts/CreatePostTrigger';
import ChatBotWidget from '../components/chatbot/ChatBotWidget';
import FeedPostCard from '../components/posts/FeedPostCard';
import { mockPosts } from '../mocks/mockPosts';

const Feed = () => {
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