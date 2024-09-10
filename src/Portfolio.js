import React from "react";
import "./styles/App.css";
// import ParticleBackground from "./ParticleBackground";

const Portfolio = ({ theme }) => {
  return (
    <div className="home-container">
      {/* <ParticleBackground theme={theme} /> */}
      <div
        className={`common-container ${
          theme === "Dark Theme" ? "dark-theme" : ""
        }`}
      >
        <h1>Portfolio Page</h1>
        <p>Welcome to the Portfolio page.</p>
      </div>
    </div>
  );
};

export default Portfolio;
