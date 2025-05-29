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

  // Function to refresh events after creating or updating an event. Passed as props to currentdayview and monthcalendar
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

  // Function to apply current filters to events
  const applyFilters = (eventsToFilter, filters) => {
    // If no filters are selected, show ALL events (including those without flags)
    if (filters.length === 0) {
      return eventsToFilter;
    }
    
    // If filters are selected, only show events that have at least one matching flag
    return eventsToFilter.filter(event => {
      // If event has no flags, don't show it when filters are active
      if (!event.flags || !Array.isArray(event.flags) || event.flags.length === 0) {
        return false;
      }
      
      // Check if event has at least one of the selected flags
      return event.flags.some(flag => filters.includes(flag));
    });
  };

  // Handle filter changes from sidebar
  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
    const filtered = applyFilters(events, filters);
    setFilteredEvents(filtered);
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Apply current filters whenever events change (e.g., after creating/updating/deleting events)
  useEffect(() => {
    const filtered = applyFilters(events, selectedFilters);
    setFilteredEvents(filtered);
  }, [events, selectedFilters]);

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