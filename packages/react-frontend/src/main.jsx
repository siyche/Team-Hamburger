// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CalendarLayoutMonth from './pages/CalendarLayoutMonth';
import CalendarLayoutWeek from './pages/CalendarLayoutWeek';
import CalendarLayoutDay from './pages/CalendarLayoutDay';
import "./main.css"; // global styles if needed


const App = () => (
  <Routes>
    <Route path="/month" element={<CalendarLayoutMonth />} />
    <Route path="/week" element={<CalendarLayoutWeek />} />
    <Route path="/day" element={<CalendarLayoutDay />} />
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