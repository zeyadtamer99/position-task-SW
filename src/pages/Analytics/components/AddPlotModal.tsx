// src/components/AddPlotModal.tsx
import React from "react";
import { Box, Modal, Typography, Button } from "@mui/material";

interface AddPlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlot: (plotType: string) => void;
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
          padding: "32px", // Reduced padding to make it smaller
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
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, // Two columns on small screens and up
            gap: "12px",
          }}
        >
          {plotOptions.map((option) => (
            <Button
              key={option.name}
              variant="outlined"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "none",
                borderRadius: "8px",
                padding: "12px", // Smaller padding to reduce size
                fontSize: "0.9rem", // Slightly smaller font for better responsiveness
                minHeight: "90px",
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
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPlotModal;
