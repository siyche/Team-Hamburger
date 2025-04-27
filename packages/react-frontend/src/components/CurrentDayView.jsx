import React, { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Modal from './Modal';
import CreateTaskForm from './CreateTaskForm';
import '../styles/CurrentDayView.css';
const CurrentDayView = ({ selectedDay }) => {
    // Fetch events from the backend
    const [events, setEvents] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [eventToEdit, setEventToEdit] = useState(null);
    
    // useEffect to fetch events when the component mounts
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const token = localStorage.getItem("token");
          // TODO: fix backend api for events to be less complicated
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

    const handleEdit = (event) => {
      setEventToEdit(event);
      setIsEditModalOpen(true);
    };

    const handleDelete = (id) => {
      // TODO: implement delete logic
      console.log('Delete event', id);
    };

    // Function to handle event updates
    const handleUpdate = async (updatedEvent) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/events/events/${updatedEvent.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedEvent),
        });
        if (!response.ok) throw new Error('Update failed');
        // refresh list
        const data = await response.json();
        setIsEditModalOpen(false);
        setEventToEdit(null);
        // re-fetch events
        const eventsRes = await fetch("http://localhost:8000/events/events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const allEvents = await eventsRes.json();
        setEvents(allEvents);
      } catch (err) {
        console.error('Error updating event:', err);
      }
    };

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
                <div className="action-icons">
                  <PencilIcon className="icon edit-icon" onClick={() => handleEdit(event)} />
                  <TrashIcon className="icon delete-icon" onClick={() => handleDelete(event.id)} />
                </div>
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
        {isEditModalOpen && (
  <Modal
    isOpen={isEditModalOpen}
    onCloseRequested={() => {
      setIsEditModalOpen(false);
      setEventToEdit(null);
    }}
    headerLabel="Edit Event"
  >
    <CreateTaskForm
      initialEvent={eventToEdit}
      onSubmit={handleUpdate}
      onCancel={() => {
        setIsEditModalOpen(false);
        setEventToEdit(null);
      }}
    />
  </Modal>
)}
        </div>
    );
    
};



export default CurrentDayView;