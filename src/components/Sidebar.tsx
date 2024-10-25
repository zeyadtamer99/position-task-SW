// src/components/Sidebar.tsx
import React from "react";
import { Box } from "@mui/material";

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
        src="/src/assets/images/Logo-white.png"
        alt="Logo"
        style={{
          width: "80%",
          maxWidth: "150px",
        }}
      />
    </Box>
  );
};

export default Sidebar;
