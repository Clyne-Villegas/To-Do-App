import React, { useState, useEffect } from "react";
import Calendar from "../Calendar/Calendar";
import Sidebar from "./SideBar";
import Modal from "../Modal/Modal";
import "./Body.css";

function Body() {
  const [isMinimized, setMinimized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [filter, setFilter] = useState(localStorage.getItem("taskFilter") || "all"); // Load filter from localStorage

  // Update localStorage whenever filter changes
  useEffect(() => {
    localStorage.setItem("taskFilter", filter);
    console.log("🛠 Filter state updated:", filter);
  }, [filter]);

  const toggleSidebar = () => {
    setMinimized(!isMinimized);
  };

  const openModal = (date = null) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addTask = (taskDetails) => {
    setTasks((prevTasks) => [...prevTasks, taskDetails]);
  };

  const openTaskModal = (date) => {
    openModal(date);
  };

  return (
    <div className={`body-container ${isMinimized ? "sidebar-minimized" : ""}`}>
      <Sidebar 
        isMinimized={isMinimized} 
        toggleSidebar={toggleSidebar} 
        setFilter={(newFilter) => {
          console.log("✅ Sidebar setFilter called with:", newFilter);
          setFilter(newFilter);
        }}  
        activeFilter={filter} 
      />

      <div className="content">
        <div className="header">
          <h1>To-Do Tasks</h1>
          <button id="add-task-btn" onClick={openModal}>
            Add Task
          </button>
        </div>

        {/* Filtered tasks passed to Calendar */}
        <Calendar 
          tasks={tasks.filter((task) => filter === "all" || task.status.toLowerCase() === filter)} 
          setTasks={setTasks} 
          filter={filter} 
          onDateClick={openTaskModal} 
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        addTask={addTask}
        tasks={tasks.filter((task) => task.date === selectedDate)}
        setTasks={setTasks}
      />
    </div>
  );
}

export default Body;