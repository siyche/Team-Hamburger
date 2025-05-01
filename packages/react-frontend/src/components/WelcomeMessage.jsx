import React, { useState, useEffect } from "react";

// Display "Welcome, <name>" message at top of calendar
export default function WelcomeMessage() {
  return (
    <div className="welcome-message">
      Welcome, {localStorage.getItem("name")}
    </div>
  );
}