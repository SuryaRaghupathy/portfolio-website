import React, { useState, useEffect } from "react";
import "./styles/App.css";
import "./styles/AboutPageStyle.css";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AboutUs = ({ theme }) => {
  const [visibleSection, setVisibleSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleVisibility = (section) => {
    setVisibleSection(visibleSection === section ? null : section);
  };

  const aspirations = [
    {
      id: "aspirations1",
      title: "Digital Marketing Expertise",
      content:
        "With hands-on experience in creating and implementing comprehensive digital marketing strategies, I specialize in driving online visibility, enhancing brand awareness, and optimizing ROI. My proficiency spans across SEO, SEM, social media marketing, email campaigns, and analytics. I thrive in dynamic environments where creativity meets data-driven decision-making.",
    },
    {
      id: "aspirations2",
      title: "Web Development Skills",
      content:
        "In the realm of web development, I bring a wealth of expertise in crafting responsive and user-centric websites. From front-end design to back-end development, I excel in leveraging cutting-edge technologies to create seamless, intuitive, and aesthetically pleasing online experiences. My commitment to staying abreast of industry trends ensures I deliver solutions that align with the latest advancements.",
    },
    {
      id: "aspirations3",
      title: "Current Aspirations",
      content:
        "I am actively seeking new challenges and opportunities in a dynamic professional environment that values creativity, innovation, and measurable results. My goal is to contribute my skills and expertise to a high-impact role that not only aligns with my career aspirations but also allows me to make a significant impact.",
    },
    {
      id: "aspirations4",
      title: "Why Me?",
      content:
        "I am driven by a relentless pursuit of excellence and a genuine passion for leveraging technology to elevate digital presence. My ability to seamlessly integrate digital marketing strategies with robust web development solutions sets me apart. I thrive on challenges and am constantly seeking opportunities to innovate and optimize.",
    },
  ];

  return (
    <motion.div
      className="blank-page"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`home-container ${
          theme === "Dark Theme" ? "dark-theme" : ""
        }`}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "50px",
          overflow: "hidden",
        }}
      >
        <div>
          <h1>About Me</h1>
          <p>
            I am open to networking with like-minded professionals, exploring
            collaboration opportunities, and discussing how my skills can
            contribute to the success of your team or project.{" "}
            <Link to="/contact">Feel free to reach out</Link>—I am excited to
            engage in meaningful conversations!
          </p>
        </div>
        <div
          style={{
            zIndex: 1,
            width: "100%",
            margin: "0 auto",
            transition: "all 0.5s ease-in-out",
          }}
        >
          {aspirations.map((aspiration, index) => (
            <div
              key={aspiration.id}
              onMouseEnter={() => !isMobile && toggleVisibility(aspiration.id)}
              onMouseLeave={() => !isMobile && toggleVisibility(null)}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                height: !isMobile ? "60px" : "auto",
                marginBottom: index < aspirations.length - 1 ? "10px" : "0",
                padding: "20px 0",
              }}
            >
              <motion.div
                initial={{ x: isMobile ? 0 : "-50%", opacity: 1 }}
                animate={{
                  x:
                    visibleSection === aspiration.id && !isMobile
                      ? "-30vw"
                      : isMobile
                      ? 0
                      : "-50%",
                  opacity:
                    visibleSection === aspiration.id && !isMobile ? 0 : 1,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                  position: isMobile ? "static" : "absolute",
                  left: isMobile ? "0" : "50%",
                  top: isMobile ? "0" : "50%",
                  transform: isMobile ? "none" : "translate(-50%, -50%)",
                  width: isMobile ? "100%" : "auto",
                  textAlign: isMobile ? "left" : "center",
                  padding: isMobile ? "0" : "10px",
                }}
              >
                <h2 style={{ cursor: isMobile ? "default" : "pointer" }}>
                  {aspiration.title}
                </h2>
              </motion.div>

              <AnimatePresence>
                {(visibleSection === aspiration.id || isMobile) && (
                  <motion.div
                    initial={{ opacity: 0, x: isMobile ? 0 : 100 }}
                    animate={{ opacity: 1, x: isMobile ? 0 : 0 }}
                    exit={{ opacity: 0, x: isMobile ? 0 : 100 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      position: isMobile ? "static" : "absolute",
                      right: isMobile ? "0" : "20px",
                      top: isMobile ? "0" : "50%",
                      transform: isMobile ? "none" : "translateY(-50%)",
                      width: isMobile ? "100%" : "auto",
                      padding: "20px",
                      margin: isMobile ? "10px 0" : "15px",
                    }}
                  >
                    <p>{aspiration.content}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
