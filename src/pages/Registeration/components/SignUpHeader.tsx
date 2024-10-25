import React from "react";
import { Box, Typography } from "@mui/material";

const SignUpHeader: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: { xs: "100%", md: "50%" },
        px: { xs: 2, md: 4 },
        mb: 4,
      }}
    >
      <img
        src="/src/assets/images/Logo-white.png"
        alt="Logo"
        style={{
          width: "60vw",
          maxWidth: "500px",
          marginBottom: "16px",
        }}
      />
      <Typography
        style={{
          fontSize: "0.8vw",
          color: "#ffffff",
          marginBottom: "32px",
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        Create an account to get started
      </Typography>
    </Box>
  );
};

export default SignUpHeader;
