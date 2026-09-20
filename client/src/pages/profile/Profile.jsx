import { Flex, Grid, GridItem, VStack } from '@chakra-ui/react';
import { useAuth } from '../../hooks/useAuth.js';

import Navbar from '../../components/Navbar/Navbar.jsx';
import Loading from '../../components/Ui/Loading.jsx';
import ProfileCard from '../../components/Profile/ProfileCard/ProfileCard.jsx';
import CreatePostTrigger from '../../components/Posts/CreatePostTrigger.jsx';
import ChatBotWidget from '../../components/ChatBot/ChatBotWidget.jsx';
import PostCard from '../../components/Posts/PostCard.jsx';
import { mockPosts } from '../../mockData/mockPosts.js';

const Profile = () => {
  const { loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <Flex direction="column" h="100dvh">
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
            <CreatePostTrigger />
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
