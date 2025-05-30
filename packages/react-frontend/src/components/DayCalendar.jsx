// src/components/DayCalendar.jsx
// this is the view for the day calendar
import React, { useState, useEffect } from "react";
import "../styles/DayCalendarView.css";
import WelcomeMessage from "./WelcomeMessage";
import EventInfoModal from "./EventInfoModal";
import Modal from "./Modal";
import CreateTaskForm from "./CreateTaskForm";


const DayCalendar = ({ onDaySelect, events,refreshEvents }) => {
  // State hooks: currentDate is the state variable, setCurrentDate is the function, and new Date() initializes currentDate
  const [currentDate, setCurrentDate] = useState(new Date()); // currentDate is used to determine which month/year to display.
  const [selectedDay, setSelectedDay] = useState(new Date()); // selectedDay is maintained locally here so you can highlight the clicked day.
  const [eventToEdit, setEventToEdit] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); 
  const [modalPosition, setModalPosition] = useState({ top: 100, left: 100 });

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

  const daysArray = [currentDate];

  // When a day is clicked, update selectedDay
  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  // What is displayed on the page:
  return (
    <div className="week-calendar-view">
      <div className="day-year-header">
        <div className="day-header-left">
          <img src="../hamburger.png" alt="Example" width="35" />
          <span>{currentDate.toLocaleString("default", { month: "long" })} {currentYear}</span>
        </div>
        <div className="day-header-right">
          <WelcomeMessage displayName={localStorage.getItem("name")} />
          <div className="day-nav-buttons">
            <button onClick={handlePrevDay}>&lt;</button>
            <button onClick={handleNextDay}>&gt;</button>
          </div>
        </div>
      </div>

      <div className="day-headers">
        <div className="time-column-header" />
        {daysArray.map((day, index) => (
          <div key={index}>
            {day.toLocaleDateString("default", { weekday: "short", day: "numeric" })}
          </div>
        ))}
      </div>

      <div className="day-grid-wrapper">
        <div className="time-column">
          <div className="time-label-spacer" />
          {Array.from({ length: 24 }, (_, hour) => (
            <div key={hour} className="time-label">
              {(hour % 12 || 12)} {hour < 12 ? "AM" : "PM"}
            </div>
          ))}
        </div>

        <div className="day-calendar-grid">
          {daysArray.map((day, dayIndex) => {
            const isToday = day.toDateString() === new Date().toDateString();
            const now = new Date();
            const showNowLine =
              now.getFullYear() === day.getFullYear() &&
              now.getMonth() === day.getMonth() &&
              now.getDate() === day.getDate();

            const dayEvents = events;

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
                        onClick={(e) => {
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          setModalPosition({ top: rect.top + window.scrollY + 10, left: rect.left + window.scrollX + 10 });
                          setEventToEdit(event);
                          setShowInfoModal(true);
                        }}
                      >
                        {event.title}
                        <br />
                        {new Date(event.date).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                      </div>
                    );
                  })}
                  {showNowLine && (
                    <div
                      className="now-line"
                      style={{
                        top: `calc(${now.getHours() + now.getMinutes() / 60} * var(--slot-height))`,
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showInfoModal && eventToEdit && (
        <EventInfoModal
          event={eventToEdit}
          position={modalPosition}
          onClose={() => {
            setEventToEdit(null);
            setShowInfoModal(false);
          }}
          onEdit={() => {
            setShowInfoModal(false);
            setShowEditModal(true);
          }}
          onDelete={refreshEvents}
        />
      )}

      {showEditModal && eventToEdit && (
        <Modal
          isOpen={showEditModal}
          onCloseRequested={() => {
            setShowEditModal(false);
            setEventToEdit(null);
          }}
          headerLabel="Edit Event"
        >
          <CreateTaskForm
            initialEvent={eventToEdit}
            onSubmit={() => {
              setShowEditModal(false);
              setEventToEdit(null);
              refreshEvents();
            }}
            onCancel={() => {
              setShowEditModal(false);
              setEventToEdit(null);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default DayCalendar;
