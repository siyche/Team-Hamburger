import React, { useState } from 'react';
import '../styles/MonthCalendarView.css';

const MonthCalendarView = () => {
  // Hold the current date for the calendar (month/year)
  const [currentDate, setCurrentDate] = useState(new Date());

  // Extract current year and month
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-indexed

  // Navigation handlers: update currentDate to the first day of the previous or next month
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Get the first day of the current month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  // Determine the day of the week (0 = Sunday, ... 6 = Saturday)
  const startDay = firstDayOfMonth.getDay();

  // Calculate the start date for the grid (including dates from previous month)
  const gridStartDate = new Date(firstDayOfMonth);
  gridStartDate.setDate(firstDayOfMonth.getDate() - startDay);

  // Build a 42-cell (6 weeks) calendar grid
  const daysArray = [];
  for (let i = 0; i < 42; i++) {
    const day = new Date(gridStartDate);
    day.setDate(gridStartDate.getDate() + i);
    daysArray.push(day);
  }

  return (
    <div className="main-content">
      <div className="month-year-header">
        <button onClick={handlePrevMonth} className="nav-btn">&lt;</button>
        <span>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentYear}
        </span>
        <button onClick={handleNextMonth} className="nav-btn">&gt;</button>
      </div>
      <div className="day-headers">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="calendar">
        {daysArray.map((day, index) => {
          // Check if the day is in the current month
          const isCurrentMonth = day.getMonth() === currentMonth;
          const cellClass = isCurrentMonth ? '' : 'grayed-out';
          return (
            <div key={index} className={cellClass}>
              <span>{day.getDate().toString().padStart(2, '0')}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthCalendarView;