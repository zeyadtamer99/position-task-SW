// src/components/SmallStatPlot.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

interface SmallStatPlotProps {
  emoji: string;
  title: string;
  number: number;
  description: string;
}

const SmallStatPlot: React.FC<SmallStatPlotProps> = ({
  emoji,
  title,
  number,
  description,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#e0e0e0",
          borderRadius: "50%",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "16px",
        }}
      >
        <Typography sx={{ fontSize: "2rem" }}>{emoji}</Typography>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {number}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Box>
  );
};

export default SmallStatPlot;
