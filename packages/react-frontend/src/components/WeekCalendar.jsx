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

  // Ensure allEvents is defined before use
  const allEvents = [...events];
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
      <div className="week-calendar-grid">
        {daysArray.map((day, index) => {
          const isSelected = day.toDateString() === new Date().toDateString();
          return (
            <div
              key={index}
              className={`week-calendar-day ${isSelected ? "selected" : ""}`}
              onClick={() => handleDayClick(day)}
            >
              {/* All day events slot */}
              <div className="all-day-events">
                {/* Insert all-day events logic here */}
                <strong>All Day</strong>
              </div>

              {/* 12 AM to 11 PM timeline with 5-minute increments */}
              <div className="hourly-events">
                {Array.from({ length: 24 }, (_, hour) =>
                  Array.from({ length: 12 }, (_, i) => {
                    const minutes = i * 5;
                    const label = minutes === 0 ? `${(hour % 12 || 12)} ${hour < 12 ? "AM" : "PM"}` : "";
                    const showLabel = index === 0 && minutes === 0;

                    const slotTime = new Date(day);
                    slotTime.setHours(hour);
                    slotTime.setMinutes(minutes);
                    slotTime.setSeconds(0);
                    slotTime.setMilliseconds(0);

                    const matchingEvents = allEvents.filter((event) => {
                      const eventStart = new Date(event.start);
                      return (
                        eventStart.getFullYear() === day.getFullYear() &&
                        eventStart.getMonth() === day.getMonth() &&
                        eventStart.getDate() === day.getDate() &&
                        eventStart.getHours() === hour &&
                        Math.floor(eventStart.getMinutes() / 5) === i
                      );
                    });

                    const highlighted =
                      isSelected &&
                      hour === new Date().getHours() &&
                      i === Math.floor(new Date().getMinutes() / 5);

                    return (
                      <div
                        key={`${hour}-${minutes}`}
                        className={`hour-slot${showLabel ? " labelled" : ""}${highlighted ? " highlight" : ""}`}
                      >
                        {showLabel && (
                          <span className="hour-label">
                            {label}
                          </span>
                        )}
                        {matchingEvents.map((event, idx) => (
                          <div
                            key={idx}
                            className="event-block"
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekCalendarView;
