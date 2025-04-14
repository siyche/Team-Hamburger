import React from "react";
import { Navigate } from "react-router-dom";

// Defines protected routes
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If token doesn't exist, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
