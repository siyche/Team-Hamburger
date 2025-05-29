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
  const end = event.end ? new Date(event.end) : new Date(start.getTime() + 30 * 60000);

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
        <p><strong>Type:</strong> {eventType}</p>
        {event.details && <p><strong>Details:</strong> {event.details}</p>}
      </div>
    </div>
  );
};

export default EventInfoModal;