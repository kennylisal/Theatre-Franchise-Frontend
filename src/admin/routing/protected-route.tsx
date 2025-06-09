import { useContext } from "react";
import { AuthContext } from "../auth/auth-provider/authProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useContext(AuthContext);
  if (!auth.isSignedIn()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
