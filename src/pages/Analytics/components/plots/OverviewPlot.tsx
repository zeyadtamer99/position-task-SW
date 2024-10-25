// src/components/OverviewPlot.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { mockPlotData } from "../../mockData/mockPlotData";

// Define a type for the filter options
type FilterType = "views" | "clicks";

const OverviewPlot: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>("views");

  const handleFilterChange = (event: SelectChangeEvent<"views" | "clicks">) => {
    setFilter(event.target.value as FilterType);
  };

  // Prepare data for the selected filter
  const chartData = mockPlotData.Overview[filter].map((value, index) => ({
    name: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][index],
    value,
  }));

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "24px",
        paddingTop: "16px", // Smaller padding on top
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%", // Ensure it takes full width as defined in the parent container
        height: "100%", // Set a consistent height for all plots
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header Row with title and select */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Overview
        </Typography>
        <Select
          value={filter}
          onChange={handleFilterChange}
          size="small"
          style={{ marginRight: "32px" }}
        >
          <MenuItem value="views">Views</MenuItem>
          <MenuItem value="clicks">Clicks</MenuItem>
        </Select>
      </Box>
      {/* Chart Container */}
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="value" fill="#5d47ff" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default OverviewPlot;
