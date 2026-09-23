import { Navigate, Outlet } from 'react-router-dom'
import { useProfile } from '../hooks/useProfile'
import Loading from '../components/ui/Loading'

const RequireProfile = () => {
  const { profile, loading } = useProfile()

  if (loading) {
    return <Loading /> 
  }

  if (!profile) {
    return <Navigate to="/complete-profile" replace />
  }

  return <Outlet />
}

export default RequireProfile