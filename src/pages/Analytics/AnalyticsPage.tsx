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

const AnalyticsPage: React.FC = () => {
  const [plots, setPlots] = useState<string[]>(["Overview"]);
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
            // Determine the height of the current plot
            const previousPlotType = index > 0 ? plots[index - 1] : null;
            const isAdjacentToTallPlot =
              previousPlotType === "Overview" ||
              previousPlotType === "Best Performing Jobs";

            const plotHeight = isAdjacentToTallPlot ? "500px" : "300px";

            return (
              <Box
                key={index}
                sx={{
                  width:
                    plotType === "Overview" ||
                    plotType === "Best Performing Jobs"
                      ? "65%"
                      : "25%",
                  height:
                    plotType === "Followers" ||
                    plotType === "Applies" ||
                    plotType === "Hires"
                      ? plotHeight
                      : "500px",
                }}
              >
                {renderPlot(plotType)}
              </Box>
            );
          })}
          <Box sx={{ width: "30%" }}>
            <AddPlotButton onClick={() => setModalOpen(true)} />
          </Box>
        </Box>

        <AddPlotModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onAddPlot={handleAddPlot}
        />
      </Box>
    </Box>
  );
};

export default AnalyticsPage;
