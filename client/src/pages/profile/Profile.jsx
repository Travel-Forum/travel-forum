import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js';

const Profile = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const HandleSignOut = async () => {
    await signOut();
    navigate("/");
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={HandleSignOut}>Sign Out</button>
    </div>
  );
};

export default Profile;
