import React from "react";
import { Navigate } from "react-router-dom";

// Defines protected routes
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If token doesn't exist, redirect to login
  if (!token) {
    localStorage.clear(); // remove user data from local storage
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
