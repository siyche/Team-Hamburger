// src/components/Settings.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css";

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    theme: "light",
    notifications: false,
    emailUpdates: false,
    weekStartsOn: "sunday",
    timeFormat: "12",
    defaultView: "week",
  });
  const [isDirty, setIsDirty] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Load saved settings on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("calendarSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleBackClick = () => {
    if (isDirty && !window.confirm("You have unsaved changes. Are you sure you want to leave?")) {
      return;
    }
    navigate(-1);
  };

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    setIsDirty(true);
  };

  const handleSaveSettings = () => {
    localStorage.setItem("calendarSettings", JSON.stringify(settings));
    applyTheme(settings.theme);
    setIsDirty(false);
    // In a real app, you would also send to your backend
    alert("Settings saved successfully!");
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  const resetToDefaults = () => {
    if (window.confirm("Are you sure you want to reset all settings to default?")) {
      const defaults = {
        theme: "light",
        notifications: false,
        emailUpdates: false,
        weekStartsOn: "sunday",
        timeFormat: "12",
        defaultView: "week",
      };
      setSettings(defaults);
      setIsDirty(true);
    }
  };

  return (
    <div className={`settings-page ${settings.theme}`} data-theme={settings.theme}>
      <div className="settings-header">
        <button className="back-button" onClick={handleBackClick}>
          &larr; Back
        </button>
        <h1>Settings</h1>
        {isDirty && <span className="unsaved-changes"></span>}
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2>Appearance</h2>
          <div className="setting-option">
            <label htmlFor="theme">Theme:</label>
            <select
              id="theme"
              name="theme"
              value={settings.theme}
              onChange={handleSettingChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>
          
          <div className="setting-option">
            <label htmlFor="defaultView">Default View:</label>
            <select
              id="defaultView"
              name="defaultView"
              value={settings.defaultView}
              onChange={handleSettingChange}
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h2>Notifications</h2>
          <div className="setting-option">
            <label>
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleSettingChange}
              />
              Text Updates
            </label>
          </div>
          <div className="setting-option">
            <label>
              <input
                type="checkbox"
                name="emailUpdates"
                checked={settings.emailUpdates}
                onChange={handleSettingChange}
              />
              Email Updates
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h2>Date & Time</h2>
          <div className="setting-option">
            <label htmlFor="weekStartsOn">Week Starts On:</label>
            <select
              id="weekStartsOn"
              name="weekStartsOn"
              value={settings.weekStartsOn}
              onChange={handleSettingChange}
            >
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
            </select>
          </div>
          <div className="setting-option">
            <label htmlFor="timeFormat">Time Format:</label>
            <select
              id="timeFormat"
              name="timeFormat"
              value={settings.timeFormat}
              onChange={handleSettingChange}
            >
              <option value="12">12-hour</option>
              <option value="24">24-hour</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h2>Account</h2>
          <div className="setting-option">
            <button className="account-button">Change Password</button>
            <button className="account-button">Export Data</button>
          </div>
          <div className="setting-option">
            {!showDeleteConfirm ? (
              <button 
                className="account-button danger"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Account
              </button>
            ) : (
              <div className="delete-confirm">
                <span>Are you sure?</span>
                <button className="account-button danger">Confirm</button>
                <button 
                  className="account-button"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="settings-actions">
  
          <button 
            className="save-button" 
            onClick={handleSaveSettings}
            disabled={!isDirty}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;