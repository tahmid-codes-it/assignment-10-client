import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../firebase/Firebase.config";

const PrivateRoute = ({ children }) => {
  const user = auth.currentUser;
  const location = useLocation();

  if (user) {
    return children;
  }

  // Redirect to login and save where we came from
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
