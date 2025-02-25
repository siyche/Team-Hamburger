// src/main.jsx 
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/MonthCalendar';
import './main.css'; // Make sure Tailwind and your styles are imported

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);