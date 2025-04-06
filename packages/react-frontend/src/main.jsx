// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CalendarLayoutMonth from './pages/CalendarLayoutMonth';
import CalendarLayoutWeek from './pages/CalendarLayoutWeek';
import CalendarLayoutDay from './pages/CalendarLayoutDay';
import Login from './pages/auth/LoginPage';
import SignUp from './pages/auth/SignUpPage';
import "./main.css"; // global styles if needed

//TODO: WILL NEED TO BE REWORKED ONCE WE IMPLEMENT AUTHENTICATION TO INCLUDE PROTECTED ROUTING/LOGIN TOKEN
// APP ROUTING BEGINS HERE TO ALL THE PAGES
import Settings from './components/Settings'; // ADD THIS IMPORT
import "./main.css";

// Main App component with routing
// TODO: PROTECTED ROUTING
const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<SignUp />} />
    <Route path="/month" element={<CalendarLayoutMonth />} />
    <Route path="/week" element={<CalendarLayoutWeek />} />
    <Route path="/day" element={<CalendarLayoutDay />} />
    <Route path="/settings" element={<Settings />} /> 
    <Route path="*" element={<CalendarLayoutMonth />} />
  </Routes>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);