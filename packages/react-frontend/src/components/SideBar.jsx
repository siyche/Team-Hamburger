// SideBar.jsx
import React, { useState } from "react";
import "../styles/Sidebar.css";
import Modal from "./Modal.jsx";
import CreateTaskButton from "./CreateTaskButton.jsx";
import CreateTaskForm from "./CreateTaskForm.jsx";

const SideBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Track whether the modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // This function receives the new task created in the form
  const handleTaskSubmit = (newTask) => {
    // log task submission for now
    console.log("New task submitted:", newTask);
    // Close the modal after submission.
    closeModal();
  };

  return (
    <div className="sidebar">
      <div className="nav-section">
        <button className="nav-button" onClick={toggleMenu}>
          <img src="../../public/hamburger.png" alt="Menu" width="30" />
        </button>

        {/*Needs to be dynamic to get the current view selected */}
        <button className="button1">Monthly View</button>
        
        {/*Routing will go here to move to Weekly, Daily, and Montly View*/}
        {isMenuOpen && (
          <div className="dropdown-menu">
            <button className="dropdown-item">Option 1</button>
            <button className="dropdown-item">Option 2</button>
            <button className="dropdown-item">Option 3</button>
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