// src/components/EventInfoModal.jsx
import { useEffect, useRef, useState } from "react";
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
  const end = event.end ? new Date(event.end) : new Date(start.getTime() + 30 * 60000);

  const formatTime = (time) =>
    time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

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
        <span>Event Details</span>
        <button className="event-info-close" onClick={onClose}>✕</button>
      </div>
      <div className="event-info-body">
        <p><strong>Title:</strong> {event.title}</p>
        <p><strong>Time:</strong> {formatTime(start)} - {formatTime(end)}</p>
        <p><strong>Type:</strong> {eventType}</p>
        {event.details && <p><strong>Details:</strong> {event.details}</p>}
      </div>
      <div className="event-info-actions">
        <button className="event-info-button edit" onClick={onEdit}>Edit</button>
        <button className="event-info-button delete" onClick={() => onDelete(event._id)}>Delete</button>
      </div>
    </div>
  );
};

export default EventInfoModal;