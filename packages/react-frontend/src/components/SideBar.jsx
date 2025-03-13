// SideBar.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import Modal from "./Modal.jsx";
import CreateTaskButton from "./CreateTaskButton.jsx";
import CreateTaskForm from "./CreateTaskForm.jsx";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State for dropdown menu for view switching
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
  const toggleViewMenu = () => setIsViewMenuOpen(!isViewMenuOpen);
  


  // Track whether the modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const toggleMenu = () => {setIsMenuOpen(!isMenuOpen);};
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  // This function receives the new task created in the form
  const handleTaskSubmit = (newTask) => {
    console.log("New task submitted:", newTask);      // log task submission for now
    closeModal();                                    // close the modal
  };

  // Determine the current view from the URL pathname.
  // (If no view is found, default to "Monthly View")
  const currentPath = location.pathname.toLowerCase();
  let currentView = "Monthly View";
  if (currentPath.includes("week")) {
    currentView = "Weekly View";
  } else if (currentPath.includes("day")) {
    currentView = "Daily View";
  }

  // Function to change view by navigating to a new route
  const handleViewChange = (view) => {
    navigate(`/${view}`);
    setIsViewMenuOpen(false);
  };

  return (
    <div className="sidebar">
      <div className="nav-section">
        <button className="nav-button">
          <img src="../../public/hamburger.png" alt="Menu" width="30" />
        </button>
        {/* This button now shows the current view dynamically */}
        <button className="button1" onClick={toggleViewMenu}>
          {currentView}
        </button>
        {isViewMenuOpen && (
          <div className="view-dropdown">
            <button
              className="view-dropdown-item"
              onClick={() => handleViewChange("month")}
            >
              Monthly View
            </button>
            <button
              className="view-dropdown-item"
              onClick={() => handleViewChange("week")}
            >
              Weekly View
            </button>
            <button
              className="view-dropdown-item"
              onClick={() => handleViewChange("day")}
            >
              Daily View
            </button>
          </div>
        )}
      </div>

      {/* "Create Task" button triggers openModal */}
      <CreateTaskButton onClick={openModal} />

      {/* Modal with CreateTaskForm inside */}
      <Modal
        isOpen={isModalOpen}
        onCloseRequested={closeModal}
        headerLabel="Create Event / Task"
      >
        <CreateTaskForm onSubmit={handleTaskSubmit} onCancel={closeModal} />
      </Modal>

      <div className="filter-section">
        <h3>Filter By Type</h3>
        <ul className="filter-list">
          <li className="filter-item assignment">Assignment</li>
          <li className="filter-item study">Study</li>
          <li className="filter-item midterm">Midterm</li>
          <li className="filter-item final">Final</li>
          <li className="filter-item quiz">Quiz</li>
          <li className="filter-item lecture">Lecture</li>
          <li className="filter-item lab">Lab</li>
          <li className="filter-item homework">Homework</li>
          <li className="filter-item presentation">Presentation</li>
          <li className="filter-item exam">Exam</li>
        </ul>
      </div>
    </div>
  );
};



export default SideBar;