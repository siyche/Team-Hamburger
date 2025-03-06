// src/components/CreateTaskForm.jsx
import React, { useState } from "react";

const CreateTaskForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // build new task/event object
    const newTask = {
      title,
      time,
      details
    };
    // pass the new task to the parent handler (e.g., to update state or send to backend)
    if (onSubmit) {
      onSubmit(newTask);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="taskTitle">Title:</label>
        <input
          type="text"
          id="taskTitle"
          name="taskTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="taskTime">Time:</label>
        <input
          type="time"
          id="taskTime"
          name="taskTime"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="taskDetails">Details:</label>
        <textarea
          id="taskDetails"
          name="taskDetails"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <button type="submit">Create Task</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateTaskForm;