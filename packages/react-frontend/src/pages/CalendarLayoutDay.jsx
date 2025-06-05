// src/components/CalendarLayoutDay.jsx
// this is the parent component for the day calendar view -> holds sidebar & day calendar

import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import DayCalendarView from "../components/DayCalendar"; // our dynamic calendar view component
import "../styles/CalendarLayout.css"; // this file handles the overall two-panel flex layout
import useEvents from "../utils/useEvents"; // custom hook to fetch events -- this is a reusable function that can be used in other components

const CalendarLayoutDay = () => {
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
      <DayCalendarView 
        onDaySelect={setSelectedDay}
        events={filteredEvents}
        refreshEvents={fetchEvents}
      />
    </div>
  );
};

export default CalendarLayoutDay;
