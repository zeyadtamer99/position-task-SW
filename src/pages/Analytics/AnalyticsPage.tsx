// src/pages/AnalyticsPage.tsx
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import NewVisitsPlot from "./components/NewVisitsPlot";
import OverviewPlot from "./components/OverviewPlot";
import AddPlotButton from "./components/AddPlotButton";
import AddPlotModal from "./components/AddPlotModal";

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
      default:
        console.warn(`Unknown plot type: ${plotType}`);
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      <Box sx={{ width: "20%", backgroundColor: "#fff", padding: "20px" }}>
        <Typography variant="h6">Swipework</Typography>
      </Box>
      <Box
        sx={{
          width: "80%",
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
          {plots.map((plotType, index) => (
            <Box key={index} sx={{ width: { xs: "100%", md: "45%" } }}>
              {renderPlot(plotType)}
            </Box>
          ))}
          <Box sx={{ width: { xs: "100%", md: "45%" } }}>
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
