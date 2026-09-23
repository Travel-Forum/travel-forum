import { Navigate, Outlet } from 'react-router-dom'
import { useProfile } from '../hooks/useProfile'
import Loading from '../components/ui/Loading'

const RequireNoProfile = () => {
  const { profile, loading } = useProfile()

  if (loading) {
    return <Loading /> 
  }

  if (profile) {
    return <Navigate to="/profile" replace />
  }

  return <Outlet />
}

export default RequireNoProfile