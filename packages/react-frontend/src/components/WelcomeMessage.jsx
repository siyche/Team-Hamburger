import React, { useState, useEffect } from "react";

// Display "Welcome, <name>" message at top of calendar
export default function WelcomeMessage({ displayName }) {
  const [name, setName] = useState(localStorage.getItem("name") || "");

  useEffect(() => {
    if (displayName !== undefined) {
      setName(displayName);
    }
  }, [displayName]);

  return (
    <div className="welcome-message">
      Welcome, {localStorage.getItem("name")}
    </div>
  );
}