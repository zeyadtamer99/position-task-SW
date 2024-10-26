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
import { OverviewData } from "../../../../utils/dataProcessor";
import { useTranslation } from "react-i18next";

type FilterType = "views" | "clicks";
interface OverviewPlotProps {
  data: OverviewData | null;
}

const OverviewPlot: React.FC<OverviewPlotProps> = ({ data }) => {
  const [filter, setFilter] = useState<FilterType>("views");
  const { t } = useTranslation();

  // Return null if no data is passed in
  if (!data) return null;

  // Handle filter change (views or clicks)
  const handleFilterChange = (event: SelectChangeEvent<"views" | "clicks">) => {
    setFilter(event.target.value as FilterType);
  };

  // Prepare chart data to include both views and clicks for each month
  const chartData = data.views.map((viewValue, index) => ({
    name: t(
      `months.${
        [
          "jan",
          "feb",
          "mar",
          "apr",
          "may",
          "jun",
          "jul",
          "aug",
          "sep",
          "oct",
          "nov",
          "dec",
        ][index]
      }`
    ),
    views: viewValue,
    clicks: data.clicks[index],
  }));

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "24px",
        paddingTop: "16px", // Smaller padding on top
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%", // Full width of the parent
        height: "100%", // Consistent height for all plots
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
          {t("titles.overview")}
        </Typography>
        <Select
          value={filter}
          onChange={handleFilterChange}
          size="small"
          style={{ marginRight: "32px" }}
        >
          <MenuItem value="views">{t("filter.views")}</MenuItem>
          <MenuItem value="clicks">{t("filter.clicks")}</MenuItem>
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
          <Bar dataKey={filter} fill="#5d47ff" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default OverviewPlot;
