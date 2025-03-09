// src/components/DayCalendarView.jsx
// this is the view for the day calendar
import React, { useState, useEffect } from "react";
import "../styles/DayCalendarView.css";

const DayCalendarView = ({ onDaySelect }) => {
  // State hooks: currentDate is the state variable, setCurrentDate is the function, and new Date() initializes currentDate
  const [currentDate, setCurrentDate] = useState(new Date()); // currentDate is used to determine which month/year to display.
  const [selectedDay, setSelectedDay] = useState(new Date()); // selectedDay is maintained locally here so you can highlight the clicked day.

  // Update the parent (if provided) when the selected day changes
  useEffect(() => {
    if (onDaySelect) {
      onDaySelect(selectedDay);
    }
  }, [selectedDay, onDaySelect]);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-indexed

  // Handlers to navigate weeks
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

  // Build an array for a 24-hour day, split into A.M. & P.M. columns
  const timeArray = [];
  for (let i = 0; i < 12; i++) {
    timeArray.push(i + 1);
  }

  // When a day is clicked, update selectedDay
  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  // What is displayed on the page:
  return (
    <div className="day-calendar-view">
      {/* Header with month/year and navigation */}
      <div className="month-year-header">
        <span>
          &nbsp;&nbsp; {/* extra space */}
          <img src="../hamburger.png" alt="Example Image" width="35" />
          &nbsp; {/* extra space */}
          {currentDate.toLocaleString("default", { weekday: "long" })}
          {/* Day of the week */}
          {", "}
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getDate()}
          {", "}
          {currentYear}
        </span>
        <div className="nav-buttons">
          <button onClick={handlePrevDay}>&lt;</button>
          <button onClick={handleNextDay}>&gt;</button>
        </div>
      </div>

      {/* Day-of-week headers */}
      <div className="day-headers">
        <div>A.M.</div>
        <div>{/* Blank spot */}</div>
        <div>P.M.</div>
      </div>

      {/* Calendar grid */}
      <div className="calendar-grid">
        {timeArray.map((time, index) => {
          const cellClass = "calendar-cell";
          // Mark as selected if it matches selectedDay
          return (
            <div key={index} className={`${cellClass}`}>
              <div>{/* Blank spot */}</div>
              <div>{time}:00</div>
              <div>{/* Blank spot */}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayCalendarView;
