// src/components/WeekCalendar.jsx
import React, { useState, useEffect } from "react";
import "../styles/WeekCalendarView.css";

const WeekCalendarView = ({ onDaySelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  // Notify parent when selectedDay changes
  useEffect(() => {
    if (onDaySelect) onDaySelect(selectedDay);
  }, [selectedDay, onDaySelect]);

  const currentYear = currentDate.getFullYear();

  // Adjust currentDate so that the week starts on Sunday
  const firstDayOfWeek = new Date(currentDate);
  while (firstDayOfWeek.getDay() !== 0) {
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - 1);
  }

  // Handlers to navigate weeks
  const handlePrevWeek = () => {
    const prev = new Date(firstDayOfWeek);
    prev.setDate(prev.getDate() - 7);
    setCurrentDate(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(firstDayOfWeek);
    next.setDate(next.getDate() + 7);
    setCurrentDate(next);
  };

  // Build an array for a 7-day week
  const daysArray = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);
    daysArray.push(day);
  }

  const handleCellClick = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className="week-calendar-view">
      {/* Header with week info and navigation */}
      <div className="week-year-header">
        <span>
          <img src="/hamburger.png" alt="Menu" width="35" />
          &nbsp;
          {currentDate.toLocaleString("default", { month: "long" })} {currentYear}
        </span>
        <div className="week-nav-buttons">
          <button onClick={handlePrevWeek}>&lt;</button>
          <button onClick={handleNextWeek}>&gt;</button>
        </div>
      </div>

      {/* Day-of-week headers */}
      <div className="week-day-headers">
        <div>Sunday</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
      </div>

      {/* Calendar grid for week view */}
      <div className="week-calendar-grid">
        {daysArray.map((day, index) => (
          <div key={index} className="week-calendar-cell" onClick={() => handleCellClick(day)}>
            <span>{day.getDate().toString().padStart(2, "0")}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekCalendarView;