// src/components/MonthCalendar.jsx
import React, { useState, useEffect } from "react";
import "../styles/MonthCalendarView.css";
import WelcomeMessage from "./WelcomeMessage";

const MonthCalendarView = ({ onDaySelect, events, refreshEvents }) => {
  // currentDate is used to determine which month/year to display.
  const [currentDate, setCurrentDate] = useState(new Date());
  // selectedDay is maintained locally so you can highlight the clicked day.
  const [selectedDay, setSelectedDay] = useState(new Date());

  // Update the parent (if provided) when the selected day changes
  useEffect(() => {
    if (onDaySelect) {
      onDaySelect(selectedDay);
    }
  }, [selectedDay, onDaySelect]);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-indexed

  // Handlers to navigate months
  const handlePrevMonth = () => {
    const prev = new Date(currentYear, currentMonth - 1, 1);
    setCurrentDate(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(currentYear, currentMonth + 1, 1);
    setCurrentDate(next);
  };

  const handleCurrentMonth = () => {
    const cur = new Date();
    setCurrentDate(cur);
  };

  // Calculate the starting day for the grid
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startDay = firstDayOfMonth.getDay(); // 0 = Sunday, 6 = Saturday

  // Grid should start on a Sunday—even if that means showing days from the previous month
  const gridStartDate = new Date(firstDayOfMonth);
  gridStartDate.setDate(firstDayOfMonth.getDate() - startDay);

  // Build an array for a 42-cell grid (6 weeks)
  const daysArray = [];
  for (let i = 0; i < 42; i++) {
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
    <div className="month-calendar-view">
      {/* Header with month/year and navigation */}
      <div className="month-year-header">
        <div className="month-header-left">
          <img src="../hamburger.png" alt="Example Image" width="35" />
          <span>
            {currentDate.toLocaleString("default", { month: "long" })} {currentYear}
          </span>
        </div>
        <div className="month-header-right">
          <WelcomeMessage />
          <div className="month-nav-buttons">
            <button onClick={handlePrevMonth}>&lt;</button>
            <button onClick={handleCurrentMonth}>Today</button>
            <button onClick={handleNextMonth}>&gt;</button>
          </div>
        </div>
      </div>

      {/* Day-of-week headers */}
      <div className="month-day-headers">
        <div>Sunday</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
      </div>

      {/* Calendar grid */}
      <div className="month-calendar-grid">
        {daysArray.map((day, index) => {
          // Only highlight the days that belong to the current month
          const isCurrentMonth = day.getMonth() === currentMonth;
          const cellClass = isCurrentMonth
            ? "month-calendar-cell"
            : "month-calendar-cell grayed-out";
          // Mark as selected if it matches selectedDay
          const isSelected = day.toDateString() === selectedDay.toDateString();
          return (
            <div
              key={index}
              className={`${cellClass} ${isSelected ? "selected" : ""}`}
              onClick={() => handleDayClick(day)}
            >
          <span>{day.getDate().toString().padStart(2, "0")}</span>

          {/* Display events for the selected day
            Fetches events from props passed in from calendarlayoutmonth.jsx 
            */}
          <div className="month-event-list">
            {events
              .filter(event => new Date(event.date).toDateString() === day.toDateString())
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((eventItem, idx) => (
                <div key={idx} className="month-event">
                  {new Date(eventItem.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                  {eventItem.title}
                </div>
              ))
            }
          </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthCalendarView;
