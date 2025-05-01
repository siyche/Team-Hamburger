import React from "react";

// Display "Welcome, <name>" message at top of calendar
// TODO: this is broken
export default function WelcomeMessage() {
  return (
    <div className="welcome-message">
      Welcome, {localStorage.getItem("email")}
    </div>
  );
}
