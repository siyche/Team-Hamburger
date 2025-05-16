// src/main.jsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import CalendarLayoutMonth from "./pages/CalendarLayoutMonth";
import CalendarLayoutWeek from "./pages/CalendarLayoutWeek";
import CalendarLayoutDay from "./pages/CalendarLayoutDay";
import Login from "./pages/auth/LoginPage";
import SignUp from "./pages/auth/SignUpPage";
import HomePage from "./pages/Homepage";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import "./main.css"; // global styles if needed
import Settings from "./components/Settings";
import "./main.css";
import { checkTokenExpiration } from "./pages/auth/tokenExpiration.jsx";

// Main App component with routing
const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If there is a token, and it is expired, redirect to login
    if (token && checkTokenExpiration(token)) {
      localStorage.clear();
      navigate("/login");
    }
  }, [navigate]);

  return (

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />

      <Route
        path="/month"
        element={
          <ProtectedRoute>
            <CalendarLayoutMonth />
          </ProtectedRoute>
        }
      />

      <Route
        path="/week"
        element={
          <ProtectedRoute>
            <CalendarLayoutWeek />
          </ProtectedRoute>
        }
      />

      <Route
        path="/day"
        element={
          <ProtectedRoute>
            <CalendarLayoutDay />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <ProtectedRoute>
            <CalendarLayoutMonth />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const Root = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
