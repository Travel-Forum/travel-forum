import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

import Loading from '../components/ui/Loading'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <Loading /> 
  }

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  return children
}

export default ProtectedRoute