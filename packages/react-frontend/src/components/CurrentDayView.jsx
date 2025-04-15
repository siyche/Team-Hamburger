import React, { useEffect, useState } from 'react';
import '../styles/CurrentDayView.css';

const CurrentDayView = ({ selectedDay }) => {
    // Fetch events from the backend
    const [events, setEvents] = useState([]);
    
    // useEffect to fetch events when the component mounts
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch("http://localhost:8000/events/events", {
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
    
      fetchEvents();
    }, []);

    return (
        <div className="current-day-view">
        {/* Display the selected day's full date */}
        <h3>{selectedDay.toDateString()}</h3>
        <div className="events">
          {events
            .filter((event) => {
              const eventDate = new Date(event.date);
              return (
                eventDate.getFullYear() === selectedDay.getFullYear() &&
                eventDate.getMonth() === selectedDay.getMonth() &&
                eventDate.getDate() === selectedDay.getDate()
              );
            })
            .map((event, index) => (
              <div key={index} className="event-item">
                <div className="event-time">
                  {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="event-type">
                  {event.course_no ? "Academic" : event.deadline ? "Task" : "Regular"}
                </div>
                <div className="event-title">{event.title}</div>
                <div className="event-details">{event.details}</div>
              </div>
            ))}
        </div>
        </div>
    );
};

export default CurrentDayView;