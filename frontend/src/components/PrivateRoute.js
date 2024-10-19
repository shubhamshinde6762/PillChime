import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import useAuth hook to get current user

const PrivateRoute = () => {
  const { currentUser } = useAuth(); // Check if the user is authenticated

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
