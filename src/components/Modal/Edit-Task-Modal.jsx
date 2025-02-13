import React, { useState, useEffect } from "react";
import "./Modal.css"; // Modal styles

function Modal({ isOpen, closeModal, taskToEdit, setTasks, tasks }) {
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    task: "",
    date: "",
    time: "",
    status: "Pending",
  });

  useEffect(() => {
    if (taskToEdit) {
      setTaskDetails({
        title: taskToEdit.title,
        task: taskToEdit.task,
        date: taskToEdit.date,
        time: taskToEdit.time,
        status: taskToEdit.status,
      });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
  
    // Ensure there's a task being edited
    if (!taskToEdit) return;
  
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.date === taskToEdit.date && task.title === taskToEdit.title
          ? { ...task, ...taskDetails }
          : task
      )
    );
  
    // Ensure modal closes only after state updates
    setTimeout(() => {
      closeModal();
    }, 100);
  };  

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Task</h2>
          <button className="close-btn" onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M12 10.585L17.95 4.635c.39-.39.39-1.025 0-1.415-.39-.39-1.025-.39-1.415 0L12 9.585 6.465 4.635a1 1 0 0 0-1.415 1.415L10.585 12l-5.535 5.95a1 1 0 0 0 1.415 1.415L12 14.415l5.535 5.95a1 1 0 0 0 1.415-1.415L13.415 12z"
                fill="#333"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSave}>
          <div className="form-field">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={taskDetails.title} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="task">Task:</label>
            <textarea id="task" name="task" value={taskDetails.task} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" value={taskDetails.date} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="time">Time:</label>
            <input type="time" id="time" name="time" value={taskDetails.time} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="status">Status:</label>
            <div className="select-wrapper">
                <select id="status" name="status" value={taskDetails.status} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Late">Late</option>
                </select>
            </div>
          </div>
          <div className="form-actions">
            <button id="add-task-btn1" type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;