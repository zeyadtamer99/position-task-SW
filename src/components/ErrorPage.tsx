// src/global/ErrorPage.tsx
import { Box, Typography, Button } from "@mui/material";
import errorImage from "../assets/images/error.gif";
import { useNavigate } from "react-router-dom";

interface ErrorPageProps {
  errorMessage?: string;
}

export default function ErrorPage({
  errorMessage = "An unexpected error has occurred.",
}: ErrorPageProps) {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
      textAlign="center"
    >
      <Box
        component="img"
        src={errorImage}
        alt="Error"
        sx={{ maxWidth: "30%", width: "100%", mb: 4 }}
      />
      <Typography variant="h4" sx={{ fontWeight: 500, mb: 2 }}>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
        {errorMessage}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{
          textTransform: "none",
          px: 3,
          py: 1.5,
          backgroundColor: "#5d47ff",
          "&:hover": { backgroundColor: "#3e32b2" },
        }}
      >
        Return to Home
      </Button>
    </Box>
  );
}
