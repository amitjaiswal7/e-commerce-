import { Navigate } from "react-router-dom";
import { useAuth } from "../context/User.login.context";




const ProtectedRoute = ({ children }) => {
  const { user, loading , accessToken} = useAuth();

  if (loading) {
    return <h2>Checking authentication...</h2>;
  }

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;