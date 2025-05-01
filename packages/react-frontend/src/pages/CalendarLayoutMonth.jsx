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

  // Function to refresh events after creating or updating an event. Passed  as props to currentdayview and monthcalendar
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/events", {
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

  // useEffect to fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="calendar-layout">
      {/* Left panel */}
      <Sidebar onEventCreated={fetchEvents} />
      {/* Center panel: the calendar view */}
      <MonthCalendarView
        onDaySelect={setSelectedDay}
        events={events}
        refreshEvents={fetchEvents}
      />
      {/* Right panel: shows events for the selected day */}
      <CurrentDayView
        selectedDay={selectedDay}
        events={events}
        refreshEvents={fetchEvents}
      />
    </div>
  );
};

export default CalendarLayoutMonth;
