// src/pages/AnalyticsPage.tsx
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import AddPlotButton from "./components/AddPlotButton";
import AddPlotModal from "./components/AddPlotModal";

const AnalyticsPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddPlot = (plotType: string) => {
    console.log(`Plot added: ${plotType}`);
    setModalOpen(false);
  };

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#dae5ff",
          padding: "20px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          style={{ fontWeight: 600, marginBottom: "16px", fontSize: "1.5rem" }}
        >
          Let’s see the data
        </Typography>

        {/* Add New Plot Button */}
        <AddPlotButton onClick={() => setModalOpen(true)} />

        {/* Add Plot Modal */}
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
