// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import CalendarLayoutMonth from './pages/CalendarLayoutMonth';
import './main.css'; // global styles if needed

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CalendarLayoutMonth />
  </React.StrictMode>
);