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
    
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        // TODO: remove hardcoded localhost url in prepration for deployment
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

    const handleEdit = (event) => {
      setEventToEdit(event);
      setIsEditModalOpen(true);
    };

    const handleDelete = async (id) => {
      console.log('Delete event', id);
      
      // TODO: temporary delete confirmation - ideally, this should be a modal with styles
      const deleteConfirm = window.confirm("Are you sure you want to delete this event?");
      if (!deleteConfirm) return;

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/events/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to delete event');
        } 
        await fetchEvents(); // re-fetch events after deletion
      } catch (error) {
        console.error('Error deleting event:', error);
        alert(`❌ Failed to delete event: ${error.message}`);
      }
    };

    // Function to handle event updates
    const handleUpdate = async (updatedEvent) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/events/${updatedEvent._id}`, {
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
        const eventsRes = await fetch("http://localhost:8000/api/events", {
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
                  <TrashIcon className="icon delete-icon" onClick={() => handleDelete(event._id)} />
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