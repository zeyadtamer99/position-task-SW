import React from "react";
import { Box, Typography } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

interface SavedJobsPlotProps {
  data: { percentage: number } | null;
}

const SavedJobsPlot: React.FC<SavedJobsPlotProps> = ({ data }) => {
  if (!data) return <Typography>Loading...</Typography>;

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
        height: "100%", // Consistent height
      }}
    >
      {/* Title and subtitle container with left alignment */}
      <Box sx={{ width: "100%", textAlign: "left", marginBottom: "16px" }}>
        <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: "4px" }}>
          Saved Jobs
        </Typography>
        <Typography variant="body2" sx={{ color: "#888" }}>
          Saved in total
        </Typography>
      </Box>

      <Box sx={{ width: "70%" }}>
        {/* Adjust width for better visual appeal */}
        <CircularProgressbar
          value={data.percentage}
          text={`${data.percentage}%`}
          styles={buildStyles({
            textColor: "#4a4a4a", // Darker color for text
            pathColor: "#7b61ff", // Gradient-like color to match the design
            trailColor: "#ececec", // Lighter trail color for better contrast
            textSize: "1rem", // Larger text for better readability
          })}
          strokeWidth={15} // Slightly thicker stroke width
        />
      </Box>
    </Box>
  );
};

export default SavedJobsPlot;
