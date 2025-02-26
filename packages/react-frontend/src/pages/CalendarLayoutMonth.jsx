// src/components/CalendarLayoutMonth.jsx
// this is thge parent component for the month calendar view -> holds sidebar, month calendar, and current day view

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MonthCalendarView from '../components/MonthCalendar'; // our dynamic calendar view component
import CurrentDayView from '../components/CurrentDayView';
import '../styles/CalendarLayoutMonth.css'; // this file handles the overall three-panel flex layout

const CalendarLayoutMonth = () => {
  // Maintain the currently selected day. Default to today.
  const [selectedDay, setSelectedDay] = useState(new Date());

  return (
    <div className="calendar-layout">
      {/* Left panel */}
      <Sidebar />
      {/* Center panel: the calendar view */}
      <MonthCalendarView onDaySelect={setSelectedDay} />
      {/* Right panel: shows events for the selected day */}
      <CurrentDayView selectedDay={selectedDay} />
    </div>
  );
};

export default CalendarLayoutMonth;