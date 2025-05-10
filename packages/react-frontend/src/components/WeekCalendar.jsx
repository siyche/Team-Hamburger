// src/components/WeekCalendarView.jsx
import React, { useState, useEffect } from "react";
import "../styles/WeekCalendarView.css";
import WelcomeMessage from "./WelcomeMessage";

const WeekCalendarView = ({ initialSelectedDay, events, refreshEvents, onDaySelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(initialSelectedDay || new Date());

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
        {daysArray.map((day, index) => (
          <div key={index}>
            {day.toLocaleDateString("default", { weekday: "short", day: "numeric" })}
          </div>
        ))}
      </div>

      {/* Scrollable calendar grid */}
      <div className="week-calendar-grid" style={{ overflowX: "auto", overflowY: "scroll", height: "600px", position: "relative" }}>
        {daysArray.map((day, index) => {
          const isSelected = day.toDateString() === new Date().toDateString();
          return (
            <div
              key={index}
              className={`week-calendar-cell ${isSelected ? "selected" : ""}`}
              onClick={() => handleDayClick(day)}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {/* All day events slot */}
              <div className="all-day-events" style={{ minHeight: "40px", borderBottom: "1px solid #ccc", textAlign: "center" }}>
                {/* Insert all-day events logic here */}
                <strong>All Day</strong>
              </div>

              {/* 12 AM to 11 PM timeline */}
              <div className="hourly-events" style={{ flexGrow: 1 }}>
                {Array.from({ length: 24 }, (_, hour) => (
                  <div
                    key={hour}
                    className="hour-slot"
                    style={{
                      borderBottom: "1px solid #e0e0e0",
                      height: "40px",
                      padding: "2px",
                      backgroundColor:
                        isSelected && hour === new Date().getHours() ? "#fff0f0" : "transparent",
                    }}
                  >
                    <span
                      style={{ fontSize: "10px", color: "#999" }}
                      data-hour-label={`${(hour % 12 || 12)} ${hour < 12 ? "AM" : "PM"}`}
                    />
                    {/* Insert timed events display here */}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekCalendarView;
