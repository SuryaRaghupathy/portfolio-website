import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./styles/Menu.css";
import ConfirmationDialog from "./PopUp";
import ParticleBackground from "./ParticleBackground";
import { motion } from "framer-motion";
const Menu = ({ onClose, onThemeChange }) => {
  const [themes, setThemes] = useState(
    localStorage.getItem("theme") || "Light Theme"
  );

  useEffect(() => {
    localStorage.setItem("theme", themes); // Store the selected theme in localStorage
    onThemeChange(themes);
  }, [themes, onThemeChange]); // Include onThemeChange in the dependency array

  const handleLinkClick = () => {
    onClose(); // Close the menu when a link is clicked
  };

  const handleThemeChange = (newTheme) => {
    setThemes(newTheme); // Update the theme state when a new theme is selected
  };

  return (
    <div className="Menu-container">
      <ParticleBackground theme={themes} />
      <div className="Menu">
        <div className="Header-flex">
          <p className="Logo-style">SR</p>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={onClose}
            className="Menu-icons"
          />
        </div>
        <motion.div
          className="blank-page"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`Menu-content ${
              themes === "Dark Theme" ? "dark-theme" : ""
            }`}
          >
            <Link className="App-link-adjust" to="/" onClick={handleLinkClick}>
              Home
            </Link>

            <Link
              className="App-link-adjust"
              to="/about-us"
              onClick={handleLinkClick}
            >
              About Me
            </Link>

            <Link
              className="App-link-adjust"
              to="/skills"
              onClick={handleLinkClick}
            >
              Skills and Certifications
            </Link>

            <Link
              className="App-link-adjust"
              to="/contact"
              onClick={handleLinkClick}
            >
              Contact
            </Link>

            <ConfirmationDialog
              onThemeChange={handleThemeChange}
              onClose={onClose}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;
