import React, { useState } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FlagIcon, FlagIconCode } from "react-flag-kit";
import logo from "../../src/assets/images/swipework_logo.jpg";
import { keyframes } from "@emotion/react";

const Sidebar: React.FC = () => {
  const { i18n } = useTranslation();
  const [isDutch, setIsDutch] = useState(i18n.language === "nl");

  const toggleLanguage = () => {
    const newLang = isDutch ? "en" : "nl";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
    setIsDutch(!isDutch);
  };

  // Animation keyframes for gradient color transition
  const gradientAnimation = keyframes`
    0% { background-position: 0% 50%; }
    100% { background-position: 50% 0%; }
  `;

  // Media query for small screens
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      sx={{
        width: { xs: "30%", md: "15%", lg: "20%" },
        height: "100vh", // Full viewport height
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: { xs: "10px", md: "20px" },
        paddingBottom: { xs: "10px", md: "20px" },
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.5)",
        position: "relative",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          width: isSmallScreen ? "60%" : "80%",
          maxWidth: "200px",
        }}
      />

      <Button
        onClick={toggleLanguage}
        sx={{
          width: "fit-content",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: "6px 12px", sm: "8px 15px", md: "12px 25px" },
          background: isDutch
            ? "linear-gradient(135deg, #98b1df, #005eff)"
            : "linear-gradient(135deg, #fac8bb, #e67b29)",
          backgroundSize: "200% 200%",
          color: "#fff",
          borderRadius: "30px",
          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1.1rem" },
          fontWeight: "bold",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          animation: `${gradientAnimation} 4s ease infinite`,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          position: "absolute", // Stick to the bottom
          bottom: { xs: "10px", md: "20px" },
          "&:hover": {
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.25)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        <Box
          sx={{
            width: { xs: "25px", md: "35px" },
            height: { xs: "25px", md: "35px" },
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          }}
        >
          <FlagIcon
            code={(isDutch ? "NL" : "US") as FlagIconCode}
            size={24}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      </Button>
    </Box>
  );
};

export default Sidebar;
