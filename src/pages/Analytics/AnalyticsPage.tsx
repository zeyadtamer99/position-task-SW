// src/pages/AnalyticsPage.tsx
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import NewVisitsPlot from "./components/NewVisitsPlot";
import OverviewPlot from "./components/OverviewPlot";
import SavedJobsPlot from "./components/SavedJobsPlot";
import SmallStatPlot from "./components/SmallStatPlot";
import AddPlotButton from "./components/AddPlotButton";
import AddPlotModal from "./components/AddPlotModal";
import BestPerformingJobsPlot from "./components/BestPerformingJobsPlot";
import Sidebar from "../../components/Sidebar";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

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
  const [plots, setPlots] = useState<string[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddPlot = (plotType: string) => {
    setPlots([...plots, plotType]);
    setModalOpen(false);
  };

  const renderPlot = (plotType: string) => {
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
  const handleRemovePlot = (plotType: string) => {
    setPlots(plots.filter((plot) => plot !== plotType));
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
          {plots.map((plotType, index) => {
            // Determine the height of the current plot based on surrounding plots
            const previousPlotType = index > 0 ? plots[index - 1] : null;
            const nextPlotType =
              index < plots.length - 1 ? plots[index + 1] : null;

            const isPreviousTall =
              previousPlotType === "Overview" ||
              previousPlotType === "Best Performing Jobs";
            const isNextTall =
              nextPlotType === "Overview" ||
              nextPlotType === "Best Performing Jobs";

            // Logic to determine the plot height
            let plotHeight = "300px"; // Default to 300px

            if (
              plotType === "Followers" ||
              plotType === "Applies" ||
              plotType === "Hires"
            ) {
              if (isPreviousTall && index === 0) {
                plotHeight = "300px";
              } else if (isPreviousTall && index > 0) {
                plotHeight = "500px";
              } else if (isPreviousTall && isNextTall) {
                plotHeight = "500px";
              } else if (isNextTall && index === 0) {
                plotHeight = "500px";
              } else if (isNextTall && index > 0) {
                plotHeight = "500px";
              } else if (
                !isPreviousTall &&
                !isNextTall &&
                (index === 0 || index === plots.length - 1)
              ) {
                plotHeight = "300px";
              }
            } else {
              plotHeight = "500px"; // Tall plot default height
            }

            // Determine the width of the current plot
            let plotWidth =
              plotType === "Overview" || plotType === "Best Performing Jobs"
                ? "65%"
                : "25%";

            // Check if "Best Performing Jobs" and "Overview" are next to each other
            if (
              (plotType === "Best Performing Jobs" &&
                (previousPlotType === "Overview" ||
                  nextPlotType === "Overview")) ||
              (plotType === "Overview" &&
                (previousPlotType === "Best Performing Jobs" ||
                  nextPlotType === "Best Performing Jobs"))
            ) {
              plotWidth = plotType === "Best Performing Jobs" ? "35%" : "64%";
            }

            return (
              <Box
                key={index}
                sx={{
                  width: plotWidth,
                  height: plotHeight,
                }}
              >
                <Box
                  sx={{
                    position: "relative", // Needed for positioning the delete button
                  }}
                >
                  {/* Close icon button */}
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
                </Box>

                {renderPlot(plotType)}
              </Box>
            );
          })}
          {plots.length < plotTypes.length && (
            <Box sx={{ width: "30%" }}>
              <AddPlotButton onClick={() => setModalOpen(true)} />
            </Box>
          )}
        </Box>

        <AddPlotModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onAddPlot={handleAddPlot}
          existingPlots={plots} // Pass the current list of plots
        />
      </Box>
    </Box>
  );
};

export default AnalyticsPage;
