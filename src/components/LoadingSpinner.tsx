// src/components/LoadingSpinner.tsx
import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingSpinner: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#dae5ff",
      }}
    >
      <CircularProgress size={60} sx={{ color: "#3f51b5", mb: 2 }} />
      <Typography variant="h6" color="textSecondary">
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
