// src/components/WeekCalendarView.jsx
import React, { useState, useEffect } from "react";
import "../styles/WeekCalendarView.css";
import WelcomeMessage from "./WelcomeMessage";

const WeekCalendarView = ({ onDaySelect, events, refreshEvents}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  // Update parent when selected day changes
  useEffect(() => {
    if (onDaySelect) {
      onDaySelect(selectedDay);
    }
  }, [selectedDay, onDaySelect]);

  const currentYear = currentDate.getFullYear();

  // For week view, adjust currentDate so that we start at Sunday of the current week.
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

  // Build an array for a 7-cell grid (1 week)
  const daysArray = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);
    daysArray.push(day);
  }

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className="week-calendar-view">
      {/* Header with week info and navigation */}
      <div className="week-year-header">
        <span>
          <img src="../hamburger.png" alt="Example Image" width="35" />
          &nbsp;
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentYear}
        </span>
        <WelcomeMessage />
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
        {daysArray.map((day, index) => {
          const cellClass = "week-calendar-cell";
          const isSelected = day.toDateString() === selectedDay.toDateString();
          return (
            <div
              key={index}
              className={`${cellClass} ${isSelected ? "selected" : ""}`}
              onClick={() => handleDayClick(day)}
            >
              <span>{day.getDate().toString().padStart(2, "0")}</span>
              {/* Future: Render event info if needed */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekCalendarView;
