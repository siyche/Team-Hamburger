import React from 'react';
import '../styles/CurrentDayView.css';

const CurrentDayView = ({ selectedDay }) => {
    // TODO: add ability to edit and delete events 
    const sampleEvents = [
        {
          time: "8:10",
          type: "Academic",
          title: "CSC 309 - Software Engineering II",
          details: "Sprint #4 WOOOO",
        },
        {
          time: "11:00",
          type: "Task",
          title: "Self Reflection",
          details: "Self reflect on myself or something?",
        },
      ];

    return (
        <div className="current-day-view">
        {/* Display the selected day's full date */}
        <h3>{selectedDay.toDateString()}</h3>
        <div className="events">
          {sampleEvents.map((event, index) => (
            <div key={index} className="event-item">
              <div className="event-time">{event.time}</div>
              <div className="event-type">{event.type}</div>
              <div className="event-title">{event.title}</div>
              <div className="event-details">{event.details}</div>
            </div>
          ))}
        </div>
        </div>
    );
};

export default CurrentDayView;