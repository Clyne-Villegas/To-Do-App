import React, { useState } from "react";
import "./Modal.css";

function Modal({ isOpen, closeModal, addTask }) {
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    task: "",
    date: "",
    time: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleClose = () => {
    setTaskDetails({
      title: "",
      task: "",
      date: "",
      time: ""
    });
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modal-title">Add New Task</h2>
          <button className="close-btn" onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                d="M12 10.585L17.95 4.635c.39-.39.39-1.025 0-1.415-.39-.39-1.025-.39-1.415 0L12 9.585 6.465 4.635a1 1 0 0 0-1.415 1.415L10.585 12l-5.535 5.95a1 1 0 0 0 1.415 1.415L12 14.415l5.535 5.95a1 1 0 0 0 1.415-1.415L13.415 12z"
                fill="#333"
              />
            </svg>
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const taskDateTime = new Date(`${taskDetails.date}T${taskDetails.time}`);

            // Get current date and time and normalize (remove milliseconds)
            const currentDateTime = new Date();
            currentDateTime.setSeconds(0, 0);
            taskDateTime.setSeconds(0, 0);

            // Determine status
            const status = taskDateTime >= currentDateTime ? "Pending" : "Missing";

            addTask({ ...taskDetails, status });
            handleClose();
          }}
        >
          <div className="form-field">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={taskDetails.title}
              onChange={handleChange}
              placeholder="Task Title"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="task">Task:</label>
            <textarea
              id="task"
              name="task"
              value={taskDetails.task}
              onChange={handleChange}
              placeholder="Task Description"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={taskDetails.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={taskDetails.time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button id="add-task-btn1" type="submit">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;