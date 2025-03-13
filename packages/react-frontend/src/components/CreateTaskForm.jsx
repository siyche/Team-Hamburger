// src/components/CreateTaskForm.jsx
import React, { useState } from "react";
import "../styles/CreateTaskForm.css";

const CreateTaskForm = ({ onSubmit, onCancel }) => {
  // State variables for form inputs
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [isTask, setIsTask] = useState(false);
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine date and time into a full Date object
    const dateTimeString = `${date}T${time}`;
    const eventDate = new Date(dateTimeString);

    // Create the event object matching your backend schema
    const newEvent = {
      date: eventDate,        // Date field
      flags: [],              // Empty flags array
      visible: true,          // Default visibility
      priority: {
        amount: 0,            // Default amount
        label: priority,      // Priority label ("LOW", "MEDIUM", "HIGH")
      },
      details,                // Additional event details
      isTask,                 // Boolean: true if Task, false for Regular event
    };

    if (onSubmit) {
      onSubmit(newEvent);
    }
  };

  return (
    <form className="create-task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="eventDate">Date:</label>
        <input
          type="date"
          id="eventDate"
          name="eventDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="eventTime">Time:</label>
        <input
          type="time"
          id="eventTime"
          name="eventTime"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>
      <div className="form-group checkbox-group">
        <label htmlFor="isTask">Task?</label>
        <input
          type="checkbox"
          id="isTask"
          name="isTask"
          checked={isTask}
          onChange={(e) => setIsTask(e.target.checked)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="details">Details:</label>
        <textarea
          id="details"
          name="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows="4"
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-btn">Create Event</button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateTaskForm;