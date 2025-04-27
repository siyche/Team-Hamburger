import React, { useState } from "react";
import "../styles/CreateTaskForm.css";
const CreateTaskForm = ({ onSubmit, onCancel }) => {
  // State variables for form inputs
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [eventType, setEventType] = useState("Regular");
  const [deadline, setDeadline] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const [courseDept, setCourseDept] = useState("CSC");
  const [courseNo, setCourseNo] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateTimeString = `${date}T${time}`;
    const eventDate = new Date(dateTimeString);

    // create event object 
    const newEvent = {
      date: eventDate,
      flags: [],
      visible: true,
      priority: {
        amount: 0,
        label: priority,
      },
      title,
      details,
    };

    // Set specific properties based on event type (i.e. Task, Academic, Regular)
    if (eventType === "Task") {
      // TODO: for task, should there be a time deadline for the task or just a date?
      // Task event
      newEvent.date_created = new Date();
      newEvent.deadline = new Date(`${deadline}T${time}`);
      newEvent.in_progress = inProgress;
      newEvent.completed = false;
    } else if (eventType === "Academic") {
      // Academic event
      newEvent.course_no = {
        dept: courseDept,
        no: parseInt(courseNo),
      };
    } else {
      // Regular event
      newEvent.all_day = false;
      newEvent.start_date = eventDate;
      newEvent.end_date = eventDate;
      newEvent.length = 60;
    }

    // attempt POST request to backend
    try {
      const token = localStorage.getItem("token");
      //TODO: clean up API URL
      const response = await fetch("http://localhost:8000/events/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      })

      if (!response.ok) {
        const err = await response.json();
        alert(`❌ Failed to create event: ${err.error}`);
        return;
      }
  
      const result = await response.json();
      alert("✅ Event created successfully!");
      console.log("Created event:", result);
      
      if (onSubmit) onSubmit(result);
    } catch {
      console.error("Error submitting event:", error);
      alert("🚨 Network error. Please try again.");
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
      <div className="form-group">
        <label htmlFor="eventType">Event Type:</label>
        <select
          id="eventType"
          name="eventType"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="Regular">Regular</option>
          <option value="Task">Task</option>
          <option value="Academic">Academic</option>
        </select>
      </div>
      {eventType === "Task" && (
        <>
          <div className="form-group">
            <label htmlFor="deadline">Deadline:</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div className="form-group checkbox-group">
            <label htmlFor="inProgress">In Progress:</label>
            <input
              type="checkbox"
              id="inProgress"
              name="inProgress"
              checked={inProgress}
              onChange={(e) => setInProgress(e.target.checked)}
            />
          </div>
        </>
      )}

      {eventType === "Academic" && (
        <>
          <div className="form-group">
            <label htmlFor="courseDept">Department:</label>
            <select
              id="courseDept"
              name="courseDept"
              value={courseDept}
              onChange={(e) => setCourseDept(e.target.value)}
            >
              <option value="CSC">CSC</option>
              <option value="CPE">CPE</option>
              <option value="EE">EE</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="courseNo">Course Number:</label>
            <input
              type="number"
              id="courseNo"
              name="courseNo"
              value={courseNo}
              onChange={(e) => setCourseNo(e.target.value)}
            />
          </div>
        </>
      )}
      <div className="form-group">
        <label htmlFor="title">Title:</label>
          <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
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
