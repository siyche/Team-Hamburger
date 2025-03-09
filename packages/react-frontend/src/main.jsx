// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import CalendarLayoutDay from "./pages/CalendarLayoutDay";
import "./main.css"; // global styles if needed

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CalendarLayoutDay />
  </React.StrictMode>
);
