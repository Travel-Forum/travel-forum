import { useAuth } from '../../hooks/useAuth.js';

import Navbar from '../../components/Navbar/Navbar.jsx';
import Loading from '../../components/Ui/Loading.jsx';
import ProfileCard from '../../components/Profile/ProfileCard/ProfileCard.jsx';


const Profile = () => {
  const { loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <div>
      <Navbar />
      <ProfileCard />
    </div>
  );
};

export default Profile;
