import React, { useEffect, useState } from "react";
import DenseAppBar from "./DisplayBar";
import "./styles/App.css";

const Skills = ({ theme }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    // Fetch the JSON data
    fetch("/webscrappeddata/output.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Convert the response to JSON
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error("Error fetching the data:", error));
  }, []);

  return (
    <div className="home-container">
      <div
        className={`common-container ${
          theme === "Dark Theme" ? "dark-theme" : ""
        }`}
      >
        <FlexDivider theme={theme} data={data} />
      </div>
    </div>
  );
};

const FlexDivider = ({ theme, data }) => {
  return (
    <DenseAppBar
      data={data}
      theme={theme}
      sx={{
        width: "100%", // Set the width to 100% or any specific width you prefer
        maxWidth: "1200px", // You can add a maxWidth if needed
        margin: "0 auto", // Center the component horizontally
      }}
    />
  );
};

export default Skills;
