import React from 'react';
import '../styles/Sidebar.css';

const SideBar = () => {
  return (
    <div className="sidebar">
      <button className="nav-button">Monthly View</button>
      <button className="nav-button">Create Task</button>
      
      <div className="filter-section">
        <h3>Filter By Type</h3>
        <ul className="filter-list">
          <button className="filter-item assignment">Assignment</button>
          <button className="filter-item study">Study</button>
          <button className="filter-item midterm">Midterm</button>
          <button className="filter-item final">Final</button>
          <button className="filter-item quiz">Quiz</button>
          <button className="filter-item lecture">Lecture</button>
          <button className="filter-item lab">Lab</button>
          <button className="filter-item homework">Homework</button>
          <button className="filter-item presentation">Presentation</button>
          <button className="filter-item exam">Exam</button>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;