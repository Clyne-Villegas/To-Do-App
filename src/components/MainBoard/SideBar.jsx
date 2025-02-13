import React from "react";
import "./SideBar.css";

function Sidebar({ isMinimized, toggleSidebar }) {
  return (
    <div className={`sidebar ${isMinimized ? "minimized" : ""}`}>
      {/* Toggle Button */}
      <div className="toggle-btn" onClick={toggleSidebar}>
        {!isMinimized && <span className="menu-text">Menu</span>}
        <i className="fas fa-bars"></i>
      </div>

      <ul>
        <li>
          <i className="fas fa-tasks"></i> {!isMinimized && <span>All Tasks</span>}
        </li>
        <li>
          <i className="fas fa-check-circle"></i> {!isMinimized && <span>Completed Tasks</span>}
        </li>
        <li>
          <i className="fas fa-clock"></i> {!isMinimized && <span>Pending Tasks</span>}
        </li>
        <li>
          <i className="fas fa-exclamation-triangle"></i> {!isMinimized && <span>Missing Tasks</span>}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;