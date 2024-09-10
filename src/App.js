import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Skills from "./Skills";
import AboutUs from "./aboutus";
import Resume from "./Resume";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import "./styles/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Menu from "./Menu";
import ConfirmationDialog from "./PopUp";
import ParticleBackground from "./ParticleBackground";
import Typewriter from "typewriter-effect";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function App() {
  const [showContent, setShowContent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("Light Theme");

  const handleThemeChange = (newTheme) => {
    console.log("Selected Theme:", newTheme);
    setTheme(newTheme);
  };

  const handleNextClick = () => {
    setShowContent(true);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className="App">
        {!showContent ? (
          <motion.div
            className="blank-page"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>Here is the main content.</div>
            <button onClick={handleNextClick}>Next</button>
          </motion.div>
        ) : menuOpen ? (
          <Menu onClose={toggleMenu} />
        ) : (
          <>
            <ParticleBackground theme={theme} />
            <header
              className={`App-header ${
                theme === "Dark Theme" ? "dark-theme" : ""
              }`}
            >
              <div className="Header-flex">
                <p className="Logo-style">SR</p>
                <div className="Options-flex">
                  <div className="Links-container">
                    <Link
                      className={`App-link ${
                        theme === "Dark Theme" ? "dark-theme" : ""
                      }`}
                      to="/"
                    >
                      Home
                    </Link>
                    <Link
                      className={`App-link ${
                        theme === "Dark Theme" ? "dark-theme" : ""
                      }`}
                      to="/about-us"
                    >
                      About Me
                    </Link>
                    <Link
                      className={`App-link ${
                        theme === "Dark Theme" ? "dark-theme" : ""
                      }`}
                      to="/skills"
                    >
                      Skills and Certifications
                    </Link>
                    <Link
                      className={`App-link ${
                        theme === "Dark Theme" ? "dark-theme" : ""
                      }`}
                      to="/resume"
                    >
                      Resume
                    </Link>
                    <Link
                      className={`App-link ${
                        theme === "Dark Theme" ? "dark-theme" : ""
                      }`}
                      to="/portfolio"
                    >
                      Portfolio
                    </Link>
                    <Link
                      className={`App-link ${
                        theme === "Dark Theme" ? "dark-theme" : ""
                      }`}
                      to="/contact"
                    >
                      Contact
                    </Link>
                    <div>
                      <ConfirmationDialog onThemeChange={handleThemeChange} />
                    </div>
                  </div>
                </div>
                <FontAwesomeIcon
                  className="Menu-icon"
                  icon={faBars}
                  onClick={toggleMenu}
                />
              </div>
            </header>

            <main>
              <Routes>
                <Route path="/" element={<Home theme={theme} />} />
                <Route path="/about-us" element={<AboutUs theme={theme} />} />
                <Route path="/skills" element={<Skills theme={theme} />} />
                <Route path="/resume" element={<Resume theme={theme} />} />
                <Route
                  path="/portfolio"
                  element={<Portfolio theme={theme} />}
                />
                <Route path="/contact" element={<Contact theme={theme} />} />
              </Routes>
            </main>
            <footer
              className={`App-footer ${
                theme === "Dark Theme" ? "dark-theme" : ""
              }`}
            >
              <p>Designed by Surya</p>
              <p>Built with REACT</p>
            </footer>
          </>
        )}
      </div>
    </Router>
  );
}

function Home({ theme }) {
  const navigate = useNavigate();
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDiv(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="main-container">
      {/* <ParticleBackground theme={theme} /> */}
      <div className="home-container">
        <div
          className={`common-container ${
            theme === "Dark Theme" ? "dark-theme" : ""
          }`}
        >
          <h1>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("<h1>Hello Team, I'm Surya</h1> <br>")
                  .start()
                  .pauseFor(500);
                typewriter.typeString("Web Architect with SEO Expertise");
              }}
              options={{
                autoStart: true,
                delay: 80,
              }}
            />
          </h1>
        </div>
      </div>

      <div>
        {showDiv && (
          <motion.div
            className={`right-container ${showDiv ? "visible" : ""}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              sx={{
                color: theme === "Light Theme" ? "black" : undefined,
                borderColor: theme === "Light Theme" ? "black" : undefined,
                paddingLeft: "70px",
                paddingRight: "70px",
                margin: "40px",
              }}
              variant="outlined"
              onClick={() => navigate("/contact")}
            >
              Get in Touch
            </Button>
            <Button
              className="button"
              sx={{
                color: theme === "Light Theme" ? "black" : undefined,
                borderColor: theme === "Light Theme" ? "black" : undefined,
                paddingLeft: "48px",
                paddingRight: "48px",
                margin: "40px",
              }}
              variant="outlined"
              href="/Surya Resume.pdf"
              download="Surya Resume.pdf"
            >
              Download Resume
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;
