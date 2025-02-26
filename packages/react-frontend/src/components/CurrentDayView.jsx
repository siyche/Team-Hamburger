import React from 'react';
import '../styles/CurrentDayView.css';

const CurrentDayView = ({ selectedDay }) => {
    // Sample events -> will eventually include dynamic fetching
    const sampleEvents = [
        { time: "8:10", title: "CSC 308 - Software Engineering I" },
        { time: "11:00", title: "Lunch"}
    ];

    return (
        <div className="current-day-view">
        {/* Display the selected day's full date */}
        <h3>{selectedDay.toDateString()}</h3>
        <div className="events">
            {sampleEvents.map((event, index) => (
            <div key={index} className="event-item">
                <span className="event-time">{event.time}</span> -{" "}
                <span className="event-title">{event.title}</span>
            </div>
            ))}
        </div>
        </div>
    );
};

export default CurrentDayView;