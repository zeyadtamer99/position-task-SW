import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";
import { OverviewData } from "../../../../models/Interfaces";

type FilterType = "views" | "clicks";
interface OverviewPlotProps {
  data: OverviewData | null;
}

const OverviewPlot: React.FC<OverviewPlotProps> = ({ data }) => {
  const [filter, setFilter] = useState<FilterType>("views");
  const { t } = useTranslation();

  // Handle filter change (views or clicks)
  const handleFilterChange = (event: SelectChangeEvent<"views" | "clicks">) => {
    setFilter(event.target.value as FilterType);
  };

  // Prepare chart data to include both views and clicks for each month
  const chartData = data?.views.map((viewValue, index) => ({
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
        paddingTop: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data ? (
        <>
          {/* Header Row with title and select */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
              width: "100%",
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
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "4px solid #5d47ff",
              borderTopColor: "transparent",
              animation: "spin 1s linear infinite",
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          />
          <Typography sx={{ mt: 2, color: "#5d47ff" }}>
            Loading data...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default OverviewPlot;
