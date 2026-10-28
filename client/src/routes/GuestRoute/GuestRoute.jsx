import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../components/ui/Loading/Loading";
import { getRedirectPath } from "../../utils/getRedirectPath";

const GuestRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to={getRedirectPath(location)} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
