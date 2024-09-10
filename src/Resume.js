import React from "react";
import "./styles/App.css";
// import ParticleBackground from "./ParticleBackground";

const Resume = ({ theme }) => {
  return (
    <div className="home-container">
      {/* <ParticleBackground theme={theme} /> */}
      <div
        className={`common-container ${
          theme === "Dark Theme" ? "dark-theme" : ""
        }`}
      >
        <h1>Resume Page</h1>
        <p>Welcome to the Resume page.</p>
      </div>
    </div>
  );
};

export default Resume;
