import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import CreateTaskForm from "./CreateTaskForm";
import "../styles/CurrentDayView.css";

const CurrentDayView = ({ selectedDay, events, refreshEvents }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  const handleEdit = (event) => {
    setEventToEdit(event);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    console.log("Delete event", id);

    // TODO: temporary delete confirmation - ideally, this should be a modal with styles
    const deleteConfirm = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!deleteConfirm) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete event");
      }
      await refreshEvents(); // re-fetch events after deletion
    } catch (error) {
      console.error("Error deleting event:", error);
      alert(`❌ Failed to delete event: ${error.message}`);
    }
  };

  // Function to handle event updates after form submission
  const handleUpdate = () => {
    setIsEditModalOpen(false);
    setEventToEdit(null);
    refreshEvents(); // Refresh events after editing
  };

  return (
    <div className="current-day-view">
      {/* Display the selected day's full date */}
      <h3>{selectedDay.toDateString()}</h3>
      <div className="events">
        {events
          // Filter events to show only those for the selected day
          .filter((event) => {
            const eventDate = new Date(event.date);
            return (
              eventDate.getFullYear() === selectedDay.getFullYear() &&
              eventDate.getMonth() === selectedDay.getMonth() &&
              eventDate.getDate() === selectedDay.getDate()
            );
          })
          // Sort events by chronological order
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          // Map through the filtered and sorted events
          .map((event, index) => (
            <div key={index} className="event-item">
              <div className="action-icons">
                <PencilIcon
                  className="icon edit-icon"
                  onClick={() => handleEdit(event)}
                />
                <TrashIcon
                  className="icon delete-icon"
                  onClick={() => handleDelete(event._id)}
                />
              </div>
              <div className="event-time">
                {new Date(event.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              
              {/* Displaying the event type and course chip inline, with title on its own line */}
              <div className="event-type-line">
                <span
                  className={`event-type ${
                    event.course_no
                      ? "academic"
                      : event.deadline
                      ? "task"
                      : "regular"
                  }`}
                >
                  {event.course_no ? "Academic" : event.deadline ? "Task" : "Regular"}
                </span>
                {event.course_no && (
                  <span className="course-chip inline">{`${event.course_no.dept} ${event.course_no.no}`}</span>
                )}
              </div>
              <div className="event-title">{event.title}</div>
              <div className="event-details">{event.details}</div>
              {/* TODO: Displaying the event flags if applicable  */}
              <div className="event-flags">
                {event.flag && event.flag.length > 0 ? (
                  event.flag.map((flag, idx) => (
                    <span key={idx} className="flag-chip">
                      {flag}
                    </span>
                  ))
                ) : (
                  // TODO: Placeholder for when no flags are present
                  <span className="flag-chip placeholder">Placeholder Flag</span>
                )}
              </div>
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
