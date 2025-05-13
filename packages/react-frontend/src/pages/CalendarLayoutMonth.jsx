// src/components/CalendarLayoutMonth.jsx
// this is the parent component for the month calendar view -> holds sidebar, month calendar, and current day view

import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar.jsx";
import MonthCalendarView from "../components/MonthCalendar"; // our dynamic calendar view component
import CurrentDayView from "../components/CurrentDayView";
import "../styles/CalendarLayout.css"; // this file handles the overall three-panel flex layout

const CalendarLayoutMonth = () => {
  // Maintain the currently selected day. Default to today.
  const [selectedDay, setSelectedDay] = useState(new Date());

  // State to hold events fetched from the API
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Function to refresh events after creating or updating an event. Passed  as props to currentdayview and monthcalendar
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('/api/events', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error("Failed to fetch events");
      }
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  // Add new function to handle filter changes
  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
    
    if (filters.length === 0) {
      // If no filters are selected, show all events
      setFilteredEvents(events);
    } else {
      // Filter events based on selected flags
      const filtered = events.filter(event => 
        event.flags && event.flags.some(flag => filters.includes(flag))
      );
      setFilteredEvents(filtered);
    }
  };

  // Update useEffect to set filtered events when events change
  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

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
