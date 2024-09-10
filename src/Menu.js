import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./styles/Menu.css";
import ConfirmationDialog from "./PopUp";
const Menu = ({ onClose }) => {
  const handleLinkClick = () => {
    onClose(); // Close the menu when a link is clicked
  };
  return (
    <div className="Menu">
      <div className="Header-flex">
        <p className="Logo-style">SR</p>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={onClose}
          className="Menu-icons"
        />
      </div>

      {/* Uncomment and use the below code if needed for navigation */}

      <div className="Menu-content">
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
          to="/resume"
          onClick={handleLinkClick}
        >
          Resume
        </Link>

        <Link
          className="App-link-adjust"
          to="/portfolio"
          onClick={handleLinkClick}
        >
          Portfolio
        </Link>

        <Link
          className="App-link-adjust"
          to="/contact"
          onClick={handleLinkClick}
        >
          Contact
        </Link>
        <ConfirmationDialog onClick={handleLinkClick} />
      </div>
    </div>
  );
};

export default Menu;
