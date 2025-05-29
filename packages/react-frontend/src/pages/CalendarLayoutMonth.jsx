// src/components/CalendarLayoutMonth.jsx
// this is the parent component for the month calendar view -> holds sidebar, month calendar, and current day view

import React, { useState } from "react";
import Sidebar from "../components/SideBar.jsx";
import useEvents from "../utils/useEvents"; // custom hook to fetch events -- this is a reusable function that can be used in other components
import MonthCalendarView from "../components/MonthCalendar"; // our dynamic calendar view component
import CurrentDayView from "../components/CurrentDayView";
import "../styles/CalendarLayout.css"; // this file handles the overall three-panel flex layout

const CalendarLayoutMonth = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const { events, fetchEvents, handleFilterChange, filteredEvents} = useEvents();

  return (
    <div className="calendar-layout">
      {/* Left panel */}
      <Sidebar 
        onEventCreated={fetchEvents}
        events={events}
        onFilterChange={handleFilterChange}
      />
      {/* Center panel: the calendar view */}
      <MonthCalendarView
        onDaySelect={setSelectedDay}
        events={filteredEvents}
        refreshEvents={fetchEvents}
      />
      {/* Right panel: shows events for the selected day */}
      <CurrentDayView
        selectedDay={selectedDay}
        events={filteredEvents}
        refreshEvents={fetchEvents}
      />
    </div>
  );
};

export default CalendarLayoutMonth;