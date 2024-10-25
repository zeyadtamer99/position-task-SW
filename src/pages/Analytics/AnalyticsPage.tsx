import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import NewVisitsPlot from "./components/plots/NewVisitsPlot";
import OverviewPlot from "./components/plots/OverviewPlot";
import SavedJobsPlot from "./components/plots/SavedJobsPlot";
import SmallStatPlot from "./components/plots/SmallStatPlot";
import AddPlotButton from "./components/AddPlotButton";
import AddPlotModal from "./components/AddPlotModal";
import BestPerformingJobsPlot from "./components/plots/BestPerformingJobsPlot";
import Sidebar from "../../components/Sidebar";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { getPlotWidth, getResponsiveHeight } from "./utils";

const plotTypes = [
  "Overview",
  "New Visits",
  "Saved Jobs",
  "Best Performing Jobs",
  "Followers",
  "Applies",
  "Hires",
];

const AnalyticsPage: React.FC = () => {
  const [plots, setPlots] = useState<string[]>(["Overview"]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [hoveredPlotIndex, setHoveredPlotIndex] = useState<number | null>(null);

  const handleAddPlot = (plotType: string) => {
    setPlots([...plots, plotType]);
    setModalOpen(false);
  };

  const handleRemovePlot = (plotType: string) => {
    setPlots(plots.filter((plot) => plot !== plotType));
  };

  const renderPlotComponent = (plotType: string) => {
    switch (plotType) {
      case "Overview":
        return <OverviewPlot />;
      case "New Visits":
        return <NewVisitsPlot />;
      case "Saved Jobs":
        return <SavedJobsPlot />;
      case "Best Performing Jobs":
        return <BestPerformingJobsPlot />;
      case "Followers":
        return (
          <SmallStatPlot
            emoji="👤"
            title="Followers"
            number={2500}
            description="New followers this month"
          />
        );
      case "Applies":
        return (
          <SmallStatPlot
            emoji="✉️"
            title="Applies"
            number={123}
            description="Job applications sent"
          />
        );
      case "Hires":
        return (
          <SmallStatPlot
            emoji="✅"
            title="Hires"
            number={30}
            description="Positions filled"
          />
        );
      default:
        console.warn(`Unknown plot type: ${plotType}`);
        return null;
    }
  };

  const renderPlot = (plotType: string, index: number) => {
    const previousPlotType = index > 0 ? plots[index - 1] : null;
    const nextPlotType = index < plots.length - 1 ? plots[index + 1] : null;

    const plotHeight = getResponsiveHeight(
      plotType,
      previousPlotType,
      nextPlotType
    );
    const plotWidth = getPlotWidth(plotType, previousPlotType, nextPlotType);

    return (
      <Box
        key={index}
        sx={{ width: plotWidth, height: plotHeight }}
        onMouseEnter={() => setHoveredPlotIndex(index)} // Set hovered index on mouse enter
        onMouseLeave={() => setHoveredPlotIndex(null)} // Clear hovered index on mouse leave
      >
        <Box sx={{ position: "relative" }}>
          {hoveredPlotIndex === index && ( // Show the button only if this plot is hovered
            <Button
              type="text"
              onClick={() => handleRemovePlot(plotType)}
              icon={<CloseOutlined style={{ fontSize: "1.5em" }} />}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                zIndex: 1,
                color: "red",
              }}
            />
          )}
        </Box>
        {renderPlotComponent(plotType)}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        minHeight: "100vh",
        height: "fit-content",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          width: "100%",
          backgroundColor: "#dae5ff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: "16px" }}>
          Let’s see the data
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "flex-start",
          }}
        >
          {plots.map((plotType, index) => renderPlot(plotType, index))}
          {plots.length < plotTypes.length && (
            <Box sx={{ width: "30%" }}>
              <AddPlotButton
                onClick={() => setModalOpen(true)}
                height={
                  plots.length > 0
                    ? getResponsiveHeight(plots[plots.length - 1], null, null)
                    : { xs: "300px", sm: "400px", md: "500px" }
                } // Use responsive height of the last plot, or default values if no plots exist
              />
            </Box>
          )}
        </Box>

        <AddPlotModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onAddPlot={handleAddPlot}
          existingPlots={plots}
        />
      </Box>
    </Box>
  );
};

export default AnalyticsPage;
