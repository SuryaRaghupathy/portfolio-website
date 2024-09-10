// Layout.js
import React from "react";
import ParticleBackground from "./ParticleBackground";

const Layout = ({ children }) => {
  return (
    <div
      className="layout"
      style={{ position: "relative", minHeight: "100vh" }}
    >
      <ParticleBackground theme="Dark Theme" />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default Layout;
