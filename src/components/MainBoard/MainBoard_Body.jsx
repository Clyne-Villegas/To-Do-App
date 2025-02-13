import React, { useState } from "react";
import Calendar from "../Calendar/Calendar";
import Sidebar from "./SideBar";
import Modal from "../Modal/Modal";
import "./Body.css";

function Body() {
  const [isMinimized, setMinimized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]); // Array to store tasks
  const [selectedDate, setSelectedDate] = useState(null); // Track selected date for modal

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setMinimized(!isMinimized);
  };

  // Open the modal for adding a task
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to add a task to the task list
  const addTask = (taskDetails) => {
    setTasks((prevTasks) => [...prevTasks, taskDetails]);
  };

  // Function to open task modal when a date is clicked
  const openTaskModal = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  return (
    <div className={`body-container ${isMinimized ? "sidebar-minimized" : ""}`}>
      {/* Sidebar component */}
      <Sidebar isMinimized={isMinimized} toggleSidebar={toggleSidebar} />

      <div className="content">
        <div className="header">
          <h1>To-Do Tasks</h1>
          {/* Button to open the modal */}
          <button id="add-task-btn" onClick={openModal}>
            Add Task
          </button>
        </div>

        {/* Pass tasks to the Calendar component */}
        <Calendar tasks={tasks} onDateClick={openTaskModal} />
      </div>

      {/* Modal component to show tasks for a selected date */}
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        addTask={addTask}
        tasks={tasks.filter((task) => task.date === selectedDate)}
      />
    </div>
  );
}

export default Body;
