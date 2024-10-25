// src/components/AddPlotButton.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

interface AddPlotButtonProps {
  onClick: () => void;
}

const AddPlotButton: React.FC<AddPlotButtonProps> = ({ onClick }) => {
  return (
    <Box
      sx={{
        width: { xs: "180px", sm: "200px", md: "240px" }, // Responsive width
        height: { xs: "180px", sm: "200px", md: "240px" }, // Responsive height
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease", // Smooth transition for the box shadow
        "&:hover": {
          boxShadow: "0 8px 18px rgba(0, 0, 0, 0.2)",
        },
        "&:hover .inner-box": {
          transform: "scale(1.1)", // Scale up the inner box on hover
        },
      }}
      onClick={onClick}
    >
      <Box
        className="inner-box"
        sx={{
          width: { xs: "120px", sm: "140px", md: "150px" }, // Responsive circle size
          height: { xs: "120px", sm: "140px", md: "150px" },
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease", // Smooth transition for the scale effect
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: "0.9rem", sm: "1rem" }, // Responsive font size
            color: "black",
            textAlign: "center",
          }}
        >
          + Add new Plot
        </Typography>
      </Box>
    </Box>
  );
};

export default AddPlotButton;
