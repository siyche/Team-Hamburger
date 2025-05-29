// src/components/CalendarLayoutWeek.jsx
// this is the parent component for the week calendar view -> holds sidebar & week calendar

import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import WeekCalendarView from "../components/WeekCalendar"; // our dynamic calendar view component

import useEvents from "../utils/useEvents"; // custom hook to fetch events -- this is a reusable function that can be used in other components
import "../styles/CalendarLayout.css"; // this file handles the overall two-panel flex layout

const CalendarLayoutWeek = () => {
  // Maintain the currently selected day. Default to today.
  const [selectedDay, setSelectedDay] = useState(new Date());

  // events are fetched from backend using hook in the utils folder
  // to create easier to read code and make it reusable for other components
  const { events, fetchEvents, handleFilterChange, filteredEvents} = useEvents();

  return (
    <div className="calendar-layout">
      {/* COMMENTED OUT: Left panel */}
      {/* Left panel */}
      <Sidebar 
        onEventCreated={fetchEvents}
        events={events}
        onFilterChange={handleFilterChange}
      />
      {/* Center panel: the calendar view */}
      <WeekCalendarView
        onDaySelect={setSelectedDay}
        events={events}
        refreshEvents={fetchEvents}/>
    </div>
  );
};

export default CalendarLayoutWeek;
