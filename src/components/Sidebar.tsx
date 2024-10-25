// src/components/Sidebar.tsx
import React from "react";
import { Box } from "@mui/material";
import logo from "../../src/assets/images/swipework_logo.jpg";

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: "15%",
        height: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "20px",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          width: "100%",
          maxWidth: "500px",
        }}
      />
    </Box>
  );
};

export default Sidebar;
