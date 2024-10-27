// src/components/SavedJobsPlot.tsx
import React, { useState } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { useTranslation } from "react-i18next";
import { SavedJobsData } from "../../../../models/Interfaces";

interface SavedJobsPlotProps {
  data: SavedJobsData | null;
}

const SavedJobsPlot: React.FC<SavedJobsPlotProps> = ({ data }) => {
  const [timeRange, setTimeRange] = useState<"current" | "previous" | "last3">(
    "current"
  );
  const { t } = useTranslation();

  if (!data) return <Typography>{t("general.loading")}</Typography>;

  console.log("📊 Selected Time Range:", timeRange);

  // Calculate the percentage based on selected time range
  let percentage = 0;

  switch (timeRange) {
    case "current":
      percentage =
        data.totalSaves > 0
          ? Math.round((data.savesCurrentMonth / data.totalSaves) * 100)
          : 0;
      console.log("📅 Current Month Saves:", data.savesCurrentMonth);
      break;
    case "previous":
      percentage =
        data.totalSaves > 0
          ? Math.round((data.savesPreviousMonth / data.totalSaves) * 100)
          : 0;
      console.log("⬅️ Previous Month Saves:", data.savesPreviousMonth);
      break;
    case "last3":
      percentage =
        data.totalSaves > 0
          ? Math.round((data.savesLast3Months / data.totalSaves) * 100)
          : 0;
      console.log("📅 Last 3 Months Saves:", data.savesLast3Months);
      break;
    default:
      break;
  }

  console.log("📈 Calculated Percentage:", percentage);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: { xs: "12px", md: "16px" },
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%", // Full width of the parent
        height: "100%", // Consistent height
      }}
    >
      <Box
        sx={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          flexDirection: "row",
          marginTop: { xs: "24px", md: "20px", xl: "0px" },
        }}
      >
        {/* Title and subtitle container with left alignment */}
        <Box sx={{ width: "50%", textAlign: "left" }}>
          <Typography
            sx={{
              fontWeight: 600,
              marginBottom: "4px",
              fontSize: { xs: "0.75rem", md: "0.875rem", lg: "1rem" },
            }}
          >
            {t("titles.savedJobs")}
          </Typography>
          <Typography
            sx={{
              color: "#888",
              fontSize: { xs: "0.65rem", md: "0.775rem", lg: "0.8rem" },
            }}
          >
            {t("subtitles.savedJobs")}
          </Typography>
        </Box>
        {/* Dropdown for selecting the time range */}
        <Select
          value={timeRange}
          onChange={(e) =>
            setTimeRange(e.target.value as "current" | "previous" | "last3")
          }
          size="small"
          sx={{
            marginBottom: "16px",
            fontSize: { xs: "0.65rem", md: "0.775rem", lg: "0.8rem" },
            width: { xs: "40%", md: "50%", lg: "50%", xl: "40%" },
            marginLeft: { md: "0.1%", lg: "0%", xl: "4%" },
            height: "fit-content",
          }}
        >
          <MenuItem value="current">{t("timeRanges.currentMonth")}</MenuItem>
          <MenuItem value="previous">{t("timeRanges.previousMonth")}</MenuItem>
          <MenuItem value="last3">{t("timeRanges.last3Months")}</MenuItem>
        </Select>
      </Box>

      <Box
        sx={{
          width: { xs: "80%", sm: "60%" },
          height: "100%",
          alignContent: "center",
        }}
      >
        {/* Circular Progress Bar with rounded edges */}
        <CircularProgressbarWithChildren
          value={isNaN(percentage) ? 0 : percentage}
          styles={buildStyles({
            textColor: "#4a4a4a",
            pathColor: "#7b61ff",
            trailColor: "#ececec",
            strokeLinecap: "round",
          })}
          strokeWidth={10}
        >
          <Typography
            sx={{
              fontWeight: 600,
              color: "#4a4a4a",
              fontSize: {
                xs: "1.5rem",
                md: "2rem",
                lg: "3rem",
                xl: "4.5rem",
              },
              marginBottom: {
                xs: "24px",
                md: "24px",
                xl: "30px",
              },
            }}
          >
            {`${isNaN(percentage) ? 0 : percentage}%`}
          </Typography>
        </CircularProgressbarWithChildren>
      </Box>
    </Box>
  );
};

export default SavedJobsPlot;
