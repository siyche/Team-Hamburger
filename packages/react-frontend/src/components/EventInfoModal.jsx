// src/components/EventInfoModal.jsx
import { useEffect, useRef, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import "../styles/EventInfoModal.css";

const EventInfoModal = ({ event, position, onClose, onEdit, onDelete }) => {
  const modalRef = useRef(null);
  const [adjustedTop, setAdjustedTop] = useState(position?.top ?? 100);

  

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    setAdjustedTop(position?.top >= 945 ? 945 : position?.top ?? 100);
  }, [position]);

  if (!event) return null;

  const start = new Date(event.date);
  const end = event.end_date ? new Date(event.end_date) : start;

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "2-digit" };
    return time.toLocaleTimeString([], options);
  };

  const eventType = event.course_no
    ? "Academic Event"
    : event.deadline
    ? "Task"
    : "Regular Event";

  const modalWidth = 320;
  const left = position?.left
    ? Math.max(10, position.left - modalWidth - 10)
    : 100;

  return (
    <div
      className="event-info-modal"
      ref={modalRef}
      style={{ top: `${adjustedTop}px`, left: `${left}px` }}
    >
      <div className="event-info-header">
        <h2 className="event-title">{event.title}</h2>
        <div className="event-info-actions-header">
          <PencilIcon className="icon-button" onClick={onEdit} />
          <TrashIcon className="icon-button" onClick={() => onDelete(event._id)} />
          <button className="event-info-close" onClick={onClose}>✕</button>
        </div>
      </div>
      <div className="event-info-body">
        <p className="event-time">
          {start.toLocaleDateString(undefined, {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
          })} &nbsp; {formatTime(start)} - {formatTime(end)}
        </p>
        <span className={`event-type-badge ${eventType.replace(" ", "-").toLowerCase()}`}>
          {eventType}
        </span>

        {eventType === "Academic Event" && event.course_no && (
          <span className="event-badge secondary">
            {event.course_no.dept} {event.course_no.no}
          </span>
        )}

        {event.priority?.level && (
          <div className="event-info-block">
            Priority: {event.priority.level}
          </div>
        )}

        {event.details && (
          <p className="event-details-text">
            {event.details}
          </p>
        )}

        {eventType === "Task" && (
          <>
            <p><strong>Deadline:</strong> {event.deadline && new Date(event.deadline).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {event.completed ? "Completed" : event.in_progress ? "In Progress" : "Not Started"}</p>
          </>
        )}

        {eventType === "Regular Event" && event.all_day && (
          <p><strong>All Day:</strong> Yes</p>
        )}
      </div>
    </div>
  );
};

export default EventInfoModal;