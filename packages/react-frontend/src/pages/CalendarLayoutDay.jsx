// src/components/CalendarLayoutDay.jsx
// this is the parent component for the day calendar view -> holds sidebar & day calendar

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DayCalendarView from "../components/DayCalendar"; // our dynamic calendar view component
import "../styles/CalendarLayout.css"; // this file handles the overall two-panel flex layout

const CalendarLayoutDay = () => {
  return (
    <div className="calendar-layout">
      {/* Left panel */}
      <Sidebar />
      {/* Center panel: the calendar view */}
      <DayCalendarView />
    </div>
  );
};

export default CalendarLayoutDay;
