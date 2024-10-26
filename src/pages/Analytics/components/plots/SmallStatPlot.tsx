// src/components/SmallStatPlot.tsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import { CalendarOutlined } from "@ant-design/icons";
import MonthRangePicker from "./MonthRangePicker";
import { Job } from "../../../../models/Job";
import {
  calculateCurrentMonthData,
  calculatePreviousMonthComparison,
} from "../../utils";

interface SmallStatPlotProps {
  emoji: string;
  title: string;
  jobs: Job[]; // Pass job data for calculation
  description: string;
  changePercentage?: number;
  onMonthRangeChange?: (range: { start: number; end?: number }) => void;
}

const SmallStatPlot: React.FC<SmallStatPlotProps> = ({
  emoji,
  title,
  jobs,
  description,
  onMonthRangeChange,
}) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [changePercentage, setChangePercentage] = useState<number | undefined>(
    undefined
  );

  // Load current and previous month data on mount
  useEffect(() => {
    const currentMonthData = calculateCurrentMonthData(jobs, "views"); // Example for views
    const previousComparison = calculatePreviousMonthComparison(jobs, "views");

    setCount(currentMonthData.count);
    setChangePercentage(previousComparison.changePercentage);
  }, [jobs]);

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Box
        sx={{ position: "absolute", top: 12, right: 32, marginRight: "12px" }}
      >
        <Tooltip title="Select month range">
          <CalendarOutlined
            style={{ fontSize: "1.25rem", color: "#555" }}
            onClick={() => setPickerOpen(true)}
          />
        </Tooltip>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{ fontSize: "2rem", fontWeight: 600, marginBottom: "8px" }}
        >
          {title}
        </Typography>
        <Typography sx={{ fontSize: "5rem" }}>{emoji}</Typography>
      </Box>

      <Box>
        <Typography
          sx={{ fontSize: "2.5rem", fontWeight: 700, textAlign: "center" }}
        >
          {count}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          {description}
        </Typography>
        {changePercentage !== undefined && (
          <Typography
            variant="body2"
            sx={{
              color: changePercentage >= 0 ? "green" : "red",
              textAlign: "center",
            }}
          >
            {changePercentage >= 0 ? "+" : ""}
            {changePercentage}% {changePercentage >= 0 ? "improved" : "dropped"}
          </Typography>
        )}
      </Box>

      {/* Month Range Picker Modal */}
      {pickerOpen && (
        <MonthRangePicker
          open={pickerOpen}
          onClose={() => setPickerOpen(false)}
          onRangeSelect={(range) => {
            setPickerOpen(false);
            onMonthRangeChange?.(range);
          }}
        />
      )}
    </Box>
  );
};

export default SmallStatPlot;
