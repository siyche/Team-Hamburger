// SideBar.jsx
import React, { useState } from "react";
import "../styles/Sidebar.css";
import CreateTaskButton from "./CreateTaskButton.jsx";

const SideBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sidebar">
      <div className="nav-section">
        <button className="nav-button" onClick={toggleMenu}>
          <img src="../../public/hamburger.png" alt="Menu" width="30" />
        </button>
        <button className="button1">Monthly View</button>
        
        {isMenuOpen && (
          <div className="dropdown-menu">
            <button className="dropdown-item">Option 1</button>
            <button className="dropdown-item">Option 2</button>
            <button className="dropdown-item">Option 3</button>
          </div>
        )}
      </div>
      <CreateTaskButton />

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