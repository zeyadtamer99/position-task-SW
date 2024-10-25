// src/components/NewVisitsPlot.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { mockPlotData } from "../mockData/mockPlotData";

const NewVisitsPlot: React.FC = () => {
  const { percentage, totalVisits } = mockPlotData.NewVisits;

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%", // Full width of the parent
        height: "500px", // Consistent height
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: "8px" }}>
        New Visits
      </Typography>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: "#000",
          pathColor: "#5d47ff",
          trailColor: "#d6d6d6",
          textSize: "0.5rem",
        })}
        strokeWidth={6} // Reduced stroke width
      />
      <Typography variant="body2" sx={{ marginTop: "8px" }}>
        {" "}
        {/* Reduced margin */}
        Total Visits: {totalVisits}
      </Typography>
    </Box>
  );
};

export default NewVisitsPlot;
