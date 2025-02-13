import React, { useEffect } from "react";
import "./SideBar.css";

function Sidebar({ isMinimized, toggleSidebar, setFilter, activeFilter }) {
  useEffect(() => {
    const storedFilter = localStorage.getItem("taskFilter");
    if (storedFilter) {
      setFilter(storedFilter); // Restore the filter
    }
  }, [setFilter]);

  const handleFilterChange = (filter) => {
    if (typeof setFilter === "function") {
      setFilter(filter);
      localStorage.setItem("taskFilter", filter); // Persist filter selection
    }
  };

  return (
    <div className={`sidebar ${isMinimized ? "minimized" : ""}`}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        {!isMinimized && <span className="menu-text">Menu</span>}
        <i className="fas fa-bars"></i>
      </div>

      <ul>
        {["all", "completed", "pending", "late", "missing"].map((filter) => (
          <li
            key={filter}
            className={activeFilter === filter ? "active" : ""}
            onClick={() => handleFilterChange(filter)}
          >
            <i className={`fas ${
              filter === "all" ? "fa-tasks" :
              filter === "completed" ? "fa-check-circle" :
              filter === "pending" ? "fa-clock" :
              filter === "late" ? "fa-hourglass-half" :
              "fa-exclamation-triangle"
            }`}></i>
            {!isMinimized && <span>{filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
