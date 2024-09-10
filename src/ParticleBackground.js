import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import React, { memo } from "react";
const ParticleBackground = ({ theme }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    console.log("Selected Theme:", theme);
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, [theme]);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: theme === "Dark Theme" ? "#000000" : "#21E3F6",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "repulse",
          },
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          push: {
            distance: 200,
            duration: 15,
          },
          grab: {
            distance: 150,
          },
        },
      },
      particles: {
        color: {
          value: theme === "Dark Theme" ? "#21E3F6" : "#000000",
        },
        links: {
          color: theme === "Dark Theme" ? "#21E3F6" : "#000000",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 150,
        },
        opacity: {
          value: 1.0,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [theme]
  );

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          color: "#FFFFFF",
        }}
      ></div>
      {init && (
        <Particles
          id="tsparticles"
          init={particlesLoaded}
          options={options}
          style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
        />
      )}
    </div>
  );
};

export default memo(ParticleBackground);
