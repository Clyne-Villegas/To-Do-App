import { MoreVertical } from "lucide-react";
import { useState } from "react";
import EditTaskModal from "../Modal/Edit-Task-Modal";
import "./Calendar.css";

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const Calendar = ({ tasks, setTasks, filter}) => {
  const [currentYear, setCurrentYear] = useState(2025);
  const [currentMonth, setCurrentMonth] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskMenuOpen, setTaskMenuOpen] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

  const lastDayIndex = (firstDayIndex + daysInMonth - 1) % 7;
  const emptySlotsBefore = firstDayIndex;
  const emptySlotsAfter = lastDayIndex === 6 ? 0 : 6 - lastDayIndex;

  const totalSlots = daysInMonth + emptySlotsBefore + emptySlotsAfter;
  const rows = Math.ceil(totalSlots / 7);

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

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status.toLowerCase() === filter;
  });

  const handleDateClick = (day) => {
    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day + 1).padStart(2, "0")}`;
    setSelectedDate(dateKey);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setIsModalOpen(false);
  };
  
  const handleEditSubmit = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.title === editTask.title && task.date === editTask.date
          ? { ...task, ...updatedTask }
          : task
      )
    );
    setEditTask(null);
    setIsModalOpen(true);
  };  
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setTaskMenuOpen(null);
    setEditTask(null);
  };

  const toggleTaskMenu = (taskId) => {
    setTaskMenuOpen(taskMenuOpen === taskId ? null : taskId);
  };

  const markAsCompleted = (taskTitle, taskDate) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.title === taskTitle && task.date === taskDate ? { ...task, status: "Completed" } : task))
    );
  };

  const removeTask = (taskTitle, taskDate) => {
    setTasks((prevTasks) => prevTasks.filter((task) => !(task.title === taskTitle && task.date === taskDate)));
  };

  return (
    <div className="calendar">
      <div className="calendar-controls">
        <button onClick={() => changeMonth(-1)} className="arrow-btn">
          ◀
        </button>
        <div className="month-year-display">
          <select className="month-picker" value={currentMonth} onChange={(e) => setCurrentMonth(Number(e.target.value))}>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select className="year-picker" value={currentYear} onChange={(e) => setCurrentYear(Number(e.target.value))}>
            {Array.from({ length: 50 }, (_, i) => 2025 + i).map((year) => (
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
          <div key={index} className="day-header">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Body */}
      <div className="calendar-body" style={{ gridTemplateRows: `repeat(${rows}, 1fr)` }}>
        {/* Empty spaces before first day */}
        {Array(emptySlotsBefore)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-before-${index}`} className="calendar-day empty"></div>
          ))}

        {/* Render days */}
        {Array.from({ length: daysInMonth }, (_, day) => {
          const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day + 1).padStart(2, "0")}`;

          return (
            <div key={dateKey} className="calendar-day" onClick={() => handleDateClick(day)}>
              <span className="date-number">{day + 1}</span>
          
              {/* Show only tasks that match the selected filter */}
              {tasks
                .filter((task) => {
                  if (task.date !== dateKey) return false;
          
                  if (filter === "all") return true;
                  if (!task.status) return false;
          
                  return task.status.toLowerCase() === filter;
                })
                .sort((a, b) => new Date(`1970-01-01T${a.time}`) - new Date(`1970-01-01T${b.time}`)) // Sort by time
                .map((task) => (
                  <div 
                    key={`task-${task.date}-${task.title}`} 
                    className={`task ${task.status ? task.status.toLowerCase() : "default"}`}
                  >
                    <span>{task.title}</span> - 
                    <span>
                      {new Date(`1970-01-01T${task.time}`).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true
                      })}
                    </span>
                  </div>
                ))}
            </div>
          );                                                 
        })}

        {Array(emptySlotsAfter)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-after-${index}`} className="calendar-day empty"></div>
          ))}
      </div>

      {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal">
      <div className="modal-header">
        <h3>
          Tasks for{" "}
          {new Date(selectedDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h3>
        <button className="close-btn" onClick={closeModal}>
          X
        </button>
      </div>
      <div className="modal-body">
        {tasks.filter((task) => task.date === selectedDate && (filter === "all" || task.status.toLowerCase() === filter)).length > 0 ? (
          tasks
            .filter((task) => task.date === selectedDate && (filter === "all" || task.status.toLowerCase() === filter))
            .sort((a, b) => new Date(`1970-01-01T${a.time}`) - new Date(`1970-01-01T${b.time}`)) // Sort tasks by time
            .map((task) => (
              <div key={`task-${task.date}-${task.title}`} className="task-card">
                <div className="task-card-header">
                  <h4>{task.title}</h4>
                  <div className="task-menu-wrapper">
                    <button
                      onClick={() => toggleTaskMenu(task.title)}
                      className="task-menu-btn"
                    >
                      <MoreVertical />
                    </button>

                    {taskMenuOpen === task.title && (
                      <div className="task-dropdown">
                        <button onClick={() => setEditTask(task)}>Edit</button>
                        <button onClick={() => markAsCompleted(task.title, task.date)}>
                          Mark as Completed
                        </button>
                        <button onClick={() => removeTask(task.title, task.date)}>
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <p>
                  <strong>Description:</strong>{" "}
                  {task.task || "No description available"}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {task.time
                    ? new Date(`1970-01-01T${task.time}`).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "Not set"}
                </p>
                <p>
                  <strong>Status:</strong> {task.status}
                </p>
              </div>
            ))
              ) : (
                <p>No tasks for this date.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {editTask && (
        <EditTaskModal 
          isOpen={!!editTask} 
          closeModal={() => setEditTask(null)}
          onSubmit={handleEditSubmit}
          taskToEdit={editTask} 
          setTasks={setTasks} 
        />
      )}
    </div>
  );
};

export default Calendar;