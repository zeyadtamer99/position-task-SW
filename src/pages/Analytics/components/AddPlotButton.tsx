// src/components/AddPlotButton.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

interface AddPlotButtonProps {
  onClick: () => void;
  height?: string; // Optional height prop
}

const AddPlotButton: React.FC<AddPlotButtonProps> = ({
  onClick,
  height = "500px",
}) => {
  return (
    <Box
      sx={{
        width: "70%",
        height: height,
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 18px rgba(0, 0, 0, 0.2)",
        },
        "&:hover .inner-box": {
          transform: "scale(1.1)",
        },
      }}
      onClick={onClick}
    >
      <Box
        className="inner-box"
        sx={{
          width: { xs: "130px", sm: "160px", md: "180px" },
          height: { xs: "130px", sm: "160px", md: "180px" },
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: "1rem", sm: "1.1rem" },
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
