import { Navigate, Outlet } from 'react-router-dom'
import { useProfile } from '../hooks/useProfile'
import Loading from '../components/ui/Loading'
import ErrorState from '../components/ui/ErrorState'

const RequireProfile = () => {
  const { profile, loading, error, refreshProfile } = useProfile()

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorState message="Could not load your profile." onRetry={refreshProfile} />
  }

  if (!profile) {
    return <Navigate to="/complete-profile" replace />
  }

  return <Outlet />
}

export default RequireProfile
