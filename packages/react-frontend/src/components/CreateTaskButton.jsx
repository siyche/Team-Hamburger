import React from "react";
import "../styles/CreateTaskButton.css";


// onclick is the props -> use to open modal
function CreateTaskButton({onClick}) {
  return (
    <button id="CreateTask" onClick={onClick}> 
     Create Event/Task 
    </button>
  )
}

export default CreateTaskButton;