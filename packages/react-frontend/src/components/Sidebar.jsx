import React from "react";
import CreateTaskButton from "./CreateTaskButton.jsx";
import "../styles/Sidebar.css";

const SideBar = () => {
  // Sidebar component -> this will eventually hold the buttons for navigating
  return (
    <div className="sidebar">
      <p>This will be the sidebar</p>
      <CreateTaskButton />
    </div>
  );
};

export default SideBar;
