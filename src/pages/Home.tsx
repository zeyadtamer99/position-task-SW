// src/pages/Home.tsx
import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import {
  formContainerStyle,
  reusableButtonStyle,
} from "../assets/global-styles";
import { Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";

const images = [
  "/src/assets/images/2.png",
  "/src/assets/images/11.png",
  "/src/assets/images/12.png",
];

// Styles used only within the Home component
const imageContainerStyle = {
  width: { xs: "90%", sm: "70%", md: "30%" },
  height: { xs: "50vw", sm: "40vw", md: "22vw" },
  overflow: "hidden",
  mb: 2,
  position: "relative",
};

const Home: React.FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  // Automatically change the active step every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        ...formContainerStyle("blue"),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "100vh",
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Logo */}
      <img
        src="/src/assets/images/Logo-white.png"
        alt="Logo"
        style={{
          width: "60vw",
          maxWidth: "500px",
          marginBottom: "16px",
        }}
      />
      <Typography
        style={{
          fontSize: "0.8vw",
          color: "#ffffff",
          marginBottom: "32px",
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        SWIPE yourself the job you really want
      </Typography>
      {/* Swipeable Image Viewer */}
      <Box sx={imageContainerStyle}>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          springConfig={{
            duration: "0.8s",
            easeFunction: "ease-in-out",
            delay: "0s",
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  style={{
                    width: "90%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              ) : null}
            </div>
          ))}
        </SwipeableViews>
      </Box>
      {/* Indicators */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
        {images.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 10,
              height: 10,
              margin: "0 4px",
              backgroundColor: index === activeStep ? "#5d47ff" : "#c4c4c4",
              borderRadius: "50%",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => handleStepChange(index)}
          />
        ))}
      </Box>
      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "400px",
          mt: 4,
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          sx={{
            ...reusableButtonStyle,
            "&:hover": {
              backgroundColor: "#fff",
              color: "#5d47ff",
            },
            "&:hover .anticon": {
              color: "#5d47ff",
            },
          }}
          onClick={() => (window.location.href = "/signup")}
          endIcon={<RightOutlined style={{ marginLeft: "180%" }} />} // Use the Ant Design arrow icon as the end icon
        >
          I'm new to Swipework
        </Button>
        <Button
          variant="contained"
          sx={{
            ...reusableButtonStyle,
            "&:hover": {
              backgroundColor: "#fff",
              color: "#5d47ff",
            },
            "&:hover .anticon": {
              color: "#5d47ff",
            },
          }}
          onClick={() => (window.location.href = "/login")}
          endIcon={<RightOutlined style={{ marginLeft: "100%" }} />} // Use the Ant Design arrow icon as the end icon
        >
          Already have an account
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
