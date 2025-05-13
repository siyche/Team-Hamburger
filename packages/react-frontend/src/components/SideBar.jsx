// src/components/SideBar.jsx
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import PropTypes from "prop-types";

import Modal from "./Modal.jsx";
import CreateTaskButton from "./CreateTaskButton.jsx";
import CreateTaskForm from "./CreateTaskForm.jsx";

const SideBar = ({ onEventCreated, events, onFilterChange }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // State for nav dropdown (hamburger) for settings/logout
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navDropdownRef = useRef(null);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // State for view dropdown for switching calendar views
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
  const viewDropdownRef = useRef(null);
  const toggleViewMenu = () => setIsViewMenuOpen(!isViewMenuOpen);

  // State for Create Task Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Add new state for filters
  const [availableFlags, setAvailableFlags] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Fetch all unique flags from events
  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch('/api/events/flags', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch flags');
        }
        
        const data = await response.json();
        setAvailableFlags(data.flags);
      } catch (error) {
        console.error('Error fetching flags:', error);
      }
    };

    fetchFlags();
  }, [events]); // Re-fetch when events change

  // Handle filter selection
  const handleFilterClick = (flag) => {
    setSelectedFilters(prev => {
      const newFilters = prev.includes(flag)
        ? prev.filter(f => f !== flag)
        : [...prev, flag];
      
      // Notify parent component about filter change
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Handle task submission from the form
  const handleTaskSubmit = (newTask) => {
    console.log("New task submitted:", newTask);
    closeModal();
    onEventCreated(); // Refresh events after creating a new task
  };

  // Handle settings navigation
  const handleSettingsClick = () => {
    navigate("/settings");
    setIsMenuOpen(false); // Close the dropdown after navigation
  };

  // Handle logout
  const handleLogout = () => {
    // Clear user data from localStorage or context
    localStorage.clear();
    // localStorage.removeItem("userData");

    // Redirect to login page
    navigate("/login");
    setIsMenuOpen(false); // Close the dropdown after logout

    // You might want to add additional logout logic here
    // like clearing React context or making an API call to invalidate the session
  };

  // Determine the current view from the URL pathname
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

  // Add document click listener to close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        navDropdownRef.current &&
        !navDropdownRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
      if (
        isViewMenuOpen &&
        viewDropdownRef.current &&
        !viewDropdownRef.current.contains(event.target)
      ) {
        setIsViewMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, isViewMenuOpen]);

  return (
    <div className="sidebar">
      <div className="nav-section">
        {/* Hamburger button that toggles the nav dropdown */}
        <button className="nav-button" onClick={toggleMenu}>
          <img src="/hamburger.png" alt="Menu" width="40" />
        </button>
        {/* Render nav dropdown for Settings and Logout */}
        {isMenuOpen && (
          <div className="nav-dropdown" ref={navDropdownRef}>
            <button className="nav-dropdown-item" onClick={handleSettingsClick}>
              Settings
            </button>
            <button className="nav-dropdown-item" onClick={handleSettingsClick}>
              Share
            </button>
            <button className="nav-dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
        {/* View switcher button */}
        <button className="button1" onClick={toggleViewMenu}>
          {currentView}
        </button>
        {isViewMenuOpen && (
          <div className="view-dropdown" ref={viewDropdownRef}>
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
          {availableFlags.map((flag, index) => (
            <li
              key={index}
              className={`filter-item ${flag.toLowerCase()} ${
                selectedFilters.includes(flag) ? 'selected' : ''
              }`}
              onClick={() => handleFilterClick(flag)}
            >
              {flag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  onEventCreated: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default SideBar;
