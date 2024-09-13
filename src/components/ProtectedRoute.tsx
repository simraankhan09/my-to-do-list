import { PropsWithChildren } from "react";
import { useAuth } from "../context/AuthenticationContext";
import { Navigate } from "react-router-dom";
import { routesPathName } from "../constants";

function ProtectedRoute({ children }: PropsWithChildren) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={routesPathName.login} />;
  }

  return children;
}

export default ProtectedRoute;
