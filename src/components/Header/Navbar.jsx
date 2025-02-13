import React, { useState, useRef, useEffect } from "react";
import { FiInfo } from "react-icons/fi";
import "./Navbar.css";
import logo from "../../assets/LexMeet.png"; // Import your logo

const Navbar = () => {
  const [tooltipPosition, setTooltipPosition] = useState("center");
  const infoRef = useRef(null);

  useEffect(() => {
    const checkPosition = () => {
      if (infoRef.current) {
        const rect = infoRef.current.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        if (rect.right + 150 > windowWidth) {
          setTooltipPosition("left");
        } else if (rect.left - 150 < 0) {
          setTooltipPosition("right");
        } else {
          setTooltipPosition("center");
        }
      }
    };

    checkPosition();
    window.addEventListener("resize", checkPosition);
    return () => window.removeEventListener("resize", checkPosition);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="LexMeet Logo" className="logo-img" />
        <h1 className="logo-text">LexMeet</h1>
      </div>
      <div className="info-container" ref={infoRef}>
        <FiInfo className="info-icon" />
        <div className={`tooltip ${tooltipPosition}`}>
        Boost your productivity with LexMeet’s To-Do App. Stay on top of your tasks!
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
