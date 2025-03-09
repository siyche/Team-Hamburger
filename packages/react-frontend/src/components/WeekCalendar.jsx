// src/components/WeekCalendarView.jsx
// this is the view for the week calendar
import React, { useState, useEffect } from "react";
import "../styles/WeekCalendarView.css";

const WeekCalendarView = ({ onDaySelect }) => {
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

  // Calculate the starting day for the grid
  const firstDayOfWeek = currentDate;
  while (firstDayOfWeek.getDay() != 0) {
    // If current day isn't first day of the week, counts backwards until found
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - 1); // 0 = Sunday, 1 = Monday, etc.
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

  // Grid should start on a Sunday—even if that means showing days from the previous month
  const gridStartDate = new Date(firstDayOfWeek);

  // Build an array for a 7-cell grid (1 week)
  const daysArray = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(gridStartDate);
    day.setDate(gridStartDate.getDate() + i);
    daysArray.push(day);
  }

  // When a day is clicked, update selectedDay
  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  // What is displayed on the page:
  return (
    <div className="week-calendar-view">
      {/* Header with month/year and navigation */}
      <div className="month-year-header">
        <span>
          <img src="../hamburger.png" alt="Example Image" width="35" />
          &nbsp; {/* extra space */}
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentYear}
        </span>
        <div className="nav-buttons">
          <button onClick={handlePrevWeek}>&lt;</button>
          <button onClick={handleNextWeek}>&gt;</button>
        </div>
      </div>

      {/* Day-of-week headers */}
      <div className="day-headers">
        <div>Sunday</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
      </div>

      {/* Calendar grid */}
      <div className="calendar-grid">
        {daysArray.map((day, index) => {
          const cellClass = "calendar-cell";
          // Mark as selected if it matches selectedDay
          const isSelected = day.toDateString() === selectedDay.toDateString();
          return (
            <div
              key={index}
              className={`${cellClass} ${isSelected ? "selected" : ""}`}
              onClick={() => handleDayClick(day)}
            >
              <span>{day.getDate().toString().padStart(2, "0")}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekCalendarView;
