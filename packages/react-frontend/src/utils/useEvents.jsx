// hooks/useEvents.js
// reusbale function to fetch events from the backend
// allows all the month, week, and day views to use the same function
// and have the same data

import { useState, useEffect } from 'react';

export default function useEvents() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/events", {
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
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, fetchEvents };
}