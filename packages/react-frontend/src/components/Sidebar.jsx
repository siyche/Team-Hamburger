import React from "react";
import "./Sidebar.css";

<link src="/Sidebar.css" rel="stylesheet" />;

// NOTE: all elements, even simple ones, include props as their color/theme can be changed

// Create Task Button
function CreateTaskButton(props) {
  // props include colors
  return <button class="MenuButton"> Create Task </button>;
}

// Monthly/Daily/Weekly View Button
function ViewButton(props) {
  // props include time (daily/monthly/weekly) and colors
  return (
    <button class="MenuButton">
      {" "}
      {props.time}
      View{" "}
    </button>
  );
}

// Filter Menu
function FilterMenu(props) {
  // Should be a table with a header reading 'filter by type' and a body with a column of check boxes
  // Some options exist by default; others can be created. All can be removed. There are more buttons at the bottom to do this.
}

export default CreateTaskButton;
