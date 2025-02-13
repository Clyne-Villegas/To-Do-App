import React, { useState } from "react";
import "./Calendar.css";

// Helper functions to get the number of days and the first day of the month
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const Calendar = ({ tasks }) => {
  console.log("Tasks received in Calendar:", tasks);

  const [currentYear, setCurrentYear] = useState(2025);
  const [currentMonth, setCurrentMonth] = useState(1); // February (0-based index)
  const [selectedDate, setSelectedDate] = useState(null); // State to track the selected date
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

  // Calculate number of empty slots before the first day (leading empty spaces)
  const lastDayIndex = (firstDayIndex + daysInMonth - 1) % 7;
  const emptySlotsBefore = firstDayIndex;
  const emptySlotsAfter = lastDayIndex === 6 ? 0 : 6 - lastDayIndex;

  // Calculate number of rows (weeks)
  const totalSlots = daysInMonth + emptySlotsBefore + emptySlotsAfter;
  const rows = Math.ceil(totalSlots / 7); // Calculate rows based on the total number of slots

  // Function to change month
  const changeMonth = (step) => {
    let newMonth = currentMonth + step;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  // Handle clicking a date
  const handleDateClick = (day) => {
    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day + 1).padStart(2, '0')}`;
    setSelectedDate(dateKey);
    setIsModalOpen(true); // Open modal when a date is selected
  };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  return (
    <div className="calendar">
      {/* Calendar Controls */}
      <div className="calendar-controls">
        <button onClick={() => changeMonth(-1)} className="arrow-btn">
          ◀
        </button>
        <div className="month-year-display">
          <select
            className="month-picker"
            value={currentMonth}
            onChange={(e) => setCurrentMonth(Number(e.target.value))}
          >
            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select
            className="year-picker"
            value={currentYear}
            onChange={(e) => setCurrentYear(Number(e.target.value))}
          >
            {Array.from({ length: 21 }, (_, i) => 2000 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button onClick={() => changeMonth(1)} className="arrow-btn">
          ▶
        </button>
      </div>

      {/* Calendar Header */}
      <div className="calendar-header">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} className="day-header">{day}</div>
        ))}
      </div>

      {/* Calendar Body */}
      <div
        className="calendar-body"
        style={{ gridTemplateRows: `repeat(${rows}, 1fr)` }} // Dynamically adjust row count
      >
        {/* Empty spaces before the first day */}
        {Array(emptySlotsBefore)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-before-${index}`} className="calendar-day empty"></div>
          ))}

        {/* Render each day */}
        {Array.from({ length: daysInMonth }, (_, day) => {
          const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day + 1).padStart(2, '0')}`;

          return (
            <div
              key={dateKey}
              className={`calendar-day ${selectedDate === dateKey ? "selected" : ""}`}
              onClick={() => handleDateClick(day)}
            >
              <span className="date-number">{day + 1}</span>

              {/* Show tasks on the respective date */}
              {tasks
                .filter((task) => task.date === dateKey)
                .map((task) => (
                  <div key={`task-${task.date}-${task.title}`} className="task">
                    <span>{task.title}</span> - <span>{task.time}</span>
                  </div>
                ))}
            </div>
          );
        })}

        {/* Empty spaces after the last day */}
        {Array(emptySlotsAfter)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-after-${index}`} className="calendar-day empty"></div>
          ))}
      </div>

      {/* Modal for selected date tasks */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Tasks for {selectedDate}</h3>
              <button className="close-btn" onClick={closeModal}>X</button>
            </div>
            <div className="modal-body">
              {tasks
                .filter((task) => task.date === selectedDate)
                .map((task) => (
                  <div key={`task-${task.date}-${task.title}`} className="task-details">
                    <p><strong>Title:</strong> {task.title}</p>
                    <p><strong>Description:</strong> {task.description}</p>
                    <p><strong>Time:</strong> {task.time}</p>
                    <p><strong>Priority:</strong> {task.priority}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;