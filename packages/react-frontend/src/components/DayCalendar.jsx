// src/components/DayCalendar.jsx
import React, { useState, useEffect } from "react";
import "../styles/DayCalendarView.css";

const DayCalendarView = ({ onDaySelect }) => {
  // currentDate holds the day being viewed
  const [currentDate, setCurrentDate] = useState(new Date());
  // selectedDay is maintained locally so we can highlight the clicked cell
  const [selectedDay, setSelectedDay] = useState(new Date());

  // Notify parent when selectedDay changes
  useEffect(() => {
    if (onDaySelect) onDaySelect(selectedDay);
  }, [selectedDay, onDaySelect]);

  const currentYear = currentDate.getFullYear();

  // Handlers to navigate days
  const handlePrevDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    setCurrentDate(prev);
  };

  const handleNextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    setCurrentDate(next);
  };

  // Build an array for 12 hour blocks (1–12)
  const timeArray = [];
  for (let i = 0; i < 12; i++) {
    timeArray.push(i + 1);
  }

  // In day view, clicking a cell simply selects the current day
  const handleCellClick = () => {
    setSelectedDay(currentDate);
  };

  return (
    <div className="day-calendar-view">
      {/* Header with day information and navigation */}
      <div className="day-time-header">
        <span>
          <img src="/hamburger.png" alt="Menu" width="35" />
          &nbsp;
          {currentDate.toLocaleString("default", { weekday: "long" })},{" "}
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getDate()}, {currentYear}
        </span>
        <div className="nav-buttons">
          <button onClick={handlePrevDay}>&lt;</button>
          <button onClick={handleNextDay}>&gt;</button>
        </div>
      </div>

      {/* AM/PM headers */}
      <div className="day-headers">
        <div>A.M.</div>
        <div></div>
        <div>P.M.</div>
      </div>

      {/* Calendar grid for day view (each cell represents an hour block) */}
      <div className="calendar-grid">
        {timeArray.map((time, index) => (
          <div key={index} className="calendar-cell" onClick={handleCellClick}>
            <div>{time}:00</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayCalendarView;