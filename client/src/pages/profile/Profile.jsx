import { Flex, Grid, GridItem, VStack } from '@chakra-ui/react';
import { useAuth } from '../../hooks/useAuth.js';

import Navbar from '../../components/Navbar/Navbar.jsx';
import Loading from '../../components/Ui/Loading.jsx';
import ProfileCard from '../../components/Profile/ProfileCard/ProfileCard.jsx';
import CreatePostTrigeer from '../../components/Posts/CreatePostTrigger.jsx';
import ChatBotWidget from '../../components/ChatBot/ChatBotWidget.jsx';
import PostCard from '../../components/Posts/PostCard.jsx';

const mockPosts = [
  {
    id: 1,
    authorName: 'Ivan Petrov',
    authorAvatar: '',
    authorTitle: 'Travel enthusiast',
    timeAgo: '2h ago',
    content: 'Just came back from an amazing week in Lisbon. Any tips for my next trip?',
    image: '',
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    authorName: 'Maria Ivanova',
    authorAvatar: '',
    authorTitle: 'Photographer',
    timeAgo: '1d ago',
    content: 'Sunrise over the Rila mountains.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    likes: 48,
    comments: 9,
  },
];


const Profile = () => {
  const { loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <Flex direction="column" h="100vh">
      <Navbar />
      <Grid
        templateColumns="1fr 2fr 1fr"
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
            <CreatePostTrigeer />
            {mockPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </VStack>
        </GridItem>

        <GridItem overflowY="auto">
          <ChatBotWidget />
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Profile;
