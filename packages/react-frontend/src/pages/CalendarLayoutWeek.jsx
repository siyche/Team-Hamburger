// src/components/CalendarLayoutWeek.jsx
// this is the parent component for the week calendar view -> holds sidebar & week calendar

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import WeekCalendarView from "../components/WeekCalendar"; // our dynamic calendar view component
import "../styles/CalendarLayout.css"; // this file handles the overall two-panel flex layout

const CalendarLayoutWeek = () => {
  return (
    <div className="calendar-layout">
      {/* Left panel */}
      <Sidebar />
      {/* Center panel: the calendar view */}
      <WeekCalendarView />
    </div>
  );
};

export default CalendarLayoutWeek;
