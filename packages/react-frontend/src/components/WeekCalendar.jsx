// src/components/WeekCalendarView.jsx
import React, { useState, useEffect } from "react";
import "../styles/WeekCalendarView.css";

const WeekCalendarView = ({ initialSelectedDay, events, refreshEvents, onDaySelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(initialSelectedDay || new Date());

  useEffect(() => {
    if (onDaySelect) onDaySelect(selectedDay);
  }, [selectedDay, onDaySelect]);

  const currentYear = currentDate.getFullYear();

  // Calculate Sunday of the current week
  const firstDayOfWeek = new Date(currentDate);
  while (firstDayOfWeek.getDay() !== 0) {
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - 1);
  }

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

  const daysArray = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);
    return day;
  });

  const handleDayClick = (day) => setSelectedDay(day);

  return (
    <div className="week-calendar-view">
      <div className="week-year-header">
        <span>
          <img src="../hamburger.png" alt="Example" width="35" />
          &nbsp;
          {currentDate.toLocaleString("default", { month: "long" })} {currentYear}
        </span>
        <div className="week-nav-buttons">
          <button onClick={handlePrevWeek}>&lt;</button>
          <button onClick={handleNextWeek}>&gt;</button>
        </div>
      </div>

      <div className="week-day-headers">
        <div className="time-column-header" />
        {daysArray.map((day, index) => (
          <div key={index}>
            {day.toLocaleDateString("default", { weekday: "short", day: "numeric" })}
          </div>
        ))}
      </div>

      <div className="week-grid-wrapper">
        <div className="time-column">
          <div className="time-label-spacer" />
          {
            (() => {
              const now = new Date();
              const top = `calc(${now.getHours() + now.getMinutes() / 60} * var(--slot-height))`;
              return (
                <div
                  className="now-line-label"
                  style={{ top }}
                >
                  {now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                </div>
              );
            })()
          }
          {Array.from({ length: 24 }, (_, hour) => (
            <div key={hour} className="time-label">
              {(hour % 12 || 12)} {hour < 12 ? "AM" : "PM"}
            </div>
          ))}
        </div>

        <div className="week-calendar-grid">
          {daysArray.map((day, dayIndex) => {
            const isToday = day.toDateString() === new Date().toDateString();
            const now = new Date();
            const showNowLine =
              now.getFullYear() === day.getFullYear() &&
              now.getMonth() === day.getMonth() &&
              now.getDate() === day.getDate();

            // Insert sample 3-hour event for testing
            const testEvent = {
              date: new Date(day.getFullYear(), day.getMonth(), day.getDate(), 9, 0).toISOString(),
              end: new Date(day.getFullYear(), day.getMonth(), day.getDate(), 12, 0).toISOString(),
              title: "Sample 3-Hour Bloc 9AM-12PM",
            };
            const dayEvents = [...events, testEvent];

            const positionedEvents = [];

            const filteredEvents = dayEvents
              .filter((event) => {
                const eventDate = new Date(event.date);
                return (
                  eventDate.getFullYear() === day.getFullYear() &&
                  eventDate.getMonth() === day.getMonth() &&
                  eventDate.getDate() === day.getDate()
                );
              })
              .sort((a, b) => new Date(a.date) - new Date(b.date));

            let i = 0;
            while (i < filteredEvents.length) {
              const group = [filteredEvents[i]];
              const groupEnd = new Date(filteredEvents[i].end || new Date(new Date(filteredEvents[i].date).getTime() + 30 * 60000));
              let j = i + 1;
              while (j < filteredEvents.length) {
                const nextStart = new Date(filteredEvents[j].date);
                if (nextStart < groupEnd) {
                  group.push(filteredEvents[j]);
                  j++;
                } else {
                  break;
                }
              }

              group.forEach((event, index) => {
                positionedEvents.push({ event, index, total: group.length });
              });

              i = j;
            }

            return (
              <div
                key={dayIndex}
                className={`week-calendar-day${isToday ? " today" : ""}`}
                onClick={() => handleDayClick(day)}
              >
                <div className="hour-grid">
                  {Array.from({ length: 24 }, (_, hour) => (
                    <div key={hour} className="hour-slot" />
                  ))}
                </div>

                <div className="day-events-container">
                  {positionedEvents.map(({ event, index, total }, idx) => {
                    const start = new Date(event.date);
                    const end = event.end ? new Date(event.end) : new Date(start.getTime() + 30 * 60000);
                    let startHour = (start.getHours() + start.getMinutes() / 60);
                    startHour = Math.min(startHour, 23.49);
                    startHour = Math.round(startHour * 100) / 100;
                    const duration = Math.round(((end - start) / 60000 / 60) * 100) / 100;
                    const widthPercent = 100 / total;
                    const leftPercent = index * widthPercent;

                    return (
                      <div
                        key={idx}
                        className="event-block"
                        style={{
                          top: `calc(${startHour} * var(--slot-height))`,
                          height: `calc(${duration} * var(--slot-height))`,
                          width: `${widthPercent}%`,
                          left: `${leftPercent}%`
                        }}
                      >
                        {event.title}
                        <br />
                        {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    );
                  })}
                  {showNowLine && (
                    <>
                      <div
                        className="now-line"
                        style={{
                          top: `calc(${now.getHours() + now.getMinutes() / 60} * var(--slot-height))`,
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekCalendarView;
