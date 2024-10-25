// src/components/AddPlotModal.tsx
import React from "react";
import { Box, Modal, Typography, Button } from "@mui/material";

interface AddPlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlot: (plotType: string) => void;
  existingPlots: string[]; // Pass the existing plots as a prop
}

const plotOptions = [
  { name: "Overview", emoji: "📊" },
  { name: "New Visits", emoji: "👀" },
  { name: "Saved Jobs", emoji: "💼" },
  { name: "Best Performing Jobs", emoji: "🏆" },
  { name: "Followers", emoji: "👤" },
  { name: "Applies", emoji: "✉️" },
  { name: "Hires", emoji: "✅" },
];

const AddPlotModal: React.FC<AddPlotModalProps> = ({
  isOpen,
  onClose,
  onAddPlot,
  existingPlots,
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: "#fff",
          width: { xs: "80%", sm: "60%", md: "40%" }, // Responsive width adjustments
          margin: "auto",
          marginTop: "10%",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: "16px" }}>
          Choose a plot type to add
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: "12px",
          }}
        >
          {plotOptions.map((option) => {
            const isAlreadyAdded = existingPlots.includes(option.name);

            return (
              <Box
                key={option.name}
                sx={{
                  position: "relative",
                  opacity: isAlreadyAdded ? 0.5 : 1, // Dim background if already added
                  pointerEvents: isAlreadyAdded ? "none" : "auto", // Disable pointer events if already added
                }}
              >
                <Button
                  variant="outlined"
                  disabled={isAlreadyAdded} // Disable the button if already added
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textTransform: "none",
                    borderRadius: "8px",
                    padding: "12px",
                    fontSize: "0.9rem",
                    width: "100%",
                    height: "100%",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                  onClick={() => onAddPlot(option.name)}
                >
                  <Typography
                    sx={{ fontSize: "1.8rem", marginBottom: "8px" }}
                    component="span"
                  >
                    {option.emoji}
                  </Typography>
                  <Typography component="span">{option.name}</Typography>
                </Button>
                {isAlreadyAdded && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim overlay
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                    }}
                  >
                    Already Added
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPlotModal;
