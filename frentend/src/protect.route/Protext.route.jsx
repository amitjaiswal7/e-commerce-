import { Navigate } from "react-router-dom";
import { useAuth } from "../context/User.login.context";

const ProtectedRoute_for_login = ({ children }) => {
  const { accessToken,user, loading } = useAuth();

  if (loading) {
    return <h2>Checking authentication...</h2>;
  }

  if (!accessToken) {
    return <Navigate to="/singup" replace />;
  }

  return children;
};

export default ProtectedRoute_for_login;