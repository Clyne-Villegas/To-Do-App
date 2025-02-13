import React from "react";
import "./Modal1.css";

const Modal = ({ isOpen, closeModal, addTask, tasks }) => {
  if (!isOpen) return null;  // Don't render anything if modal isn't open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>
          ✖
        </button>
        <h2>Tasks for {tasks.length > 0 ? tasks[0].date : ""}</h2>
        
        {/* If no tasks for the selected date */}
        {tasks.length === 0 ? (
          <p>No tasks for this date</p>
        ) : (
          tasks.map((task) => (
            <div key={task.title} className="task-card">
              <h3>{task.title}</h3>
              <p>{task.time}</p>
              <p>{task.description}</p> {/* Task description if you have it */}
            </div>
          ))
        )}

        {/* Optionally you can add a form or button to add a new task */}
        <button onClick={addTask} className="add-task-btn">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Modal;