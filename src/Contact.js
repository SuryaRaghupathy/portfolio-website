import React from "react";
import "./styles/App.css";
import { ContactUs } from "./ContactForm";

const Contact = ({ theme }) => {
  return (
    <div className="home-container">
      {/* <ParticleBackground theme={theme} /> */}
      <div
        className={`common-container ${
          theme === "Dark Theme" ? "dark-theme" : "light-theme"
        }`}
      >
        {/* Pass the theme as a prop to the ContactForm */}
        <ContactUs theme={theme} />
      </div>
    </div>
  );
};

export default Contact;
