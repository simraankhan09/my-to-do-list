import React from "react";
import { useAuth } from "../context/AuthenticationContext";
import { Navigate } from "react-router-dom";
import { routesPathName } from "../constants";

function LoginPage() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={routesPathName.todo} />;
  }

  return <div>LoginPage</div>;
}

export default LoginPage;
