import React, { useState, useEffect } from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import { CalendarOutlined } from "@ant-design/icons";
import MonthRangePicker from "./MonthRangePicker";
import { Job, Metrics } from "../../../../models/Job";
import {
  calculateCurrentMonthData,
  calculatePreviousMonthComparison,
} from "../../utils";
import { useTranslation } from "react-i18next";

interface SmallStatPlotProps {
  emoji: string;
  title: string;
  jobs: Job[];
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
  const [isHovered, setIsHovered] = useState(false); // New hover state
  const [count, setCount] = useState<number>(0);
  const [changePercentage, setChangePercentage] = useState<number | undefined>(
    undefined
  );
  const [selectedRange, setSelectedRange] = useState<
    | {
        start: number;
        end?: number;
      }
    | undefined
  >(undefined);

  const metricKeyMap: Record<string, keyof Metrics> = {
    Followers: "followers",
    Applies: "applies",
    Hires: "hires",
    Views: "views", // Adjust if other titles map to "views" or other fields
  };
  const { t } = useTranslation();

  useEffect(() => {
    const metricKey = metricKeyMap[title];
    if (!metricKey) {
      console.warn(`Unknown metric type for title: ${title}`);
      return;
    }

    const currentMonthData = calculateCurrentMonthData(
      jobs,
      metricKey,
      selectedRange
    );
    const previousComparison = calculatePreviousMonthComparison(
      jobs,
      metricKey,
      selectedRange
    );

    setCount(currentMonthData.count);
    setChangePercentage(previousComparison.changePercentage);
  }, [jobs, title, selectedRange]);

  const handleRangeChange = (range: { start: number; end?: number }) => {
    setSelectedRange(range);
    onMonthRangeChange?.(range); // Optional callback to notify parent, if needed
  };

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
      onMouseEnter={() => setIsHovered(true)} // Toggle hover state
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && ( // Show calendar icon only when hovered
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
      )}

      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: "2rem", fontWeight: 600 }}>
          {t(`titles.${title}`)} {/* Translate title */}
        </Typography>

        <Box
          sx={{
            textAlign: "center",
            position: "relative",
            width: "100%",
            height: "100%",
            alignContent: "center",
            justifyItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100px", sm: "120px", md: "150px", lg: "180px" },
              height: { xs: "100px", sm: "120px", md: "150px", lg: "180px" },
              borderRadius: "50%",
              backgroundColor:
                title === "Followers"
                  ? "rgba(255, 215, 0, 0.2)" // Gold with opacity
                  : title === "Applies"
                  ? "rgba(0, 191, 255, 0.2)" // DeepSkyBlue with opacity
                  : title === "Hires"
                  ? "rgba(50, 205, 50, 0.2)" // LimeGreen with opacity
                  : "rgba(255, 105, 180, 0.2)", // HotPink with opacity for others
            }}
          >
            <Typography
              sx={{
                fontSize: "5rem",
              }}
            >
              {emoji}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography
          sx={{ fontSize: "2.5rem", fontWeight: 700, textAlign: "center" }}
        >
          {count}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          {t(`subtitles.${description}`)} {/* Translate description */}
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

      {pickerOpen && (
        <MonthRangePicker
          open={pickerOpen}
          onClose={() => setPickerOpen(false)}
          onRangeSelect={handleRangeChange}
        />
      )}
    </Box>
  );
};

export default SmallStatPlot;
