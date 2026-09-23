import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Loading from '../components/ui/Loading'


const GuestRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/profile" replace />
  }

  return <Outlet />
}

export default GuestRoute