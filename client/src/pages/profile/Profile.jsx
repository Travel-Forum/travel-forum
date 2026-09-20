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
    <div>
      <Navbar />
      <ProfileCard />
      <CreatePostTrigeer />
      {mockPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <ChatBotWidget />
    </div>
  );
};

export default Profile;
