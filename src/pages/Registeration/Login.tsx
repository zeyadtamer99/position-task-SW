import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Snackbar } from "@mui/material";
import {
  auth,
  facebookProvider,
  githubProvider,
  googleProvider,
} from "../../../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { formContainerStyle } from "../../assets/global-styles";
import SocialButtons from "./components/SocialButtons"; // Reusing SocialButtons
import LoginForm from "./components/LoginForm";
import { Typography } from "antd";
import AuthHeader from "./components/AuthHeader";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSocialLogin = async (provider: string) => {
    let selectedProvider;

    switch (provider) {
      case "Google":
        selectedProvider = googleProvider;
        break;
      case "Facebook":
        selectedProvider = facebookProvider;
        break;
      case "GitHub":
        selectedProvider = githubProvider;
        break;
      default:
        return;
    }

    try {
      const result = await signInWithPopup(auth, selectedProvider);
      console.log("User logged in successfully:", result.user);
      navigate("/analytics");
    } catch (error) {
      console.error("Error during social login:", error);
      setSnackbarMessage("Error during social login. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const handleFormLogin = async (email: string, password: string) => {
    // Implement your login logic here (similar to sign-up)
    try {
      // Call a function to sign in the user
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      navigate("/analytics");
    } catch (error) {
      console.error("Error during form login:", error);
      setSnackbarMessage("Login failed. Please try again.");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      sx={{
        ...formContainerStyle("blue"),
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <AuthHeader subtitle="Welcome back! Please login to your account." />{" "}
      {/* Pass subtitle */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        {/* Form Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: { xs: "100%", md: "50%" },
            height: "100%",
          }}
        >
          <LoginForm onSubmit={handleFormLogin} /> {/* Vertical Separator */}
          <Box
            sx={{
              height: "100%",
              width: "2px",
              backgroundColor: "#fff",
              mx: 2,
            }}
          />
          {/* Social Buttons */}
          <SocialButtons onSocialSignUp={handleSocialLogin} />
          {/* Return to Sign Up Link */}
          <Typography
            style={{
              marginTop: "16px",
              textAlign: "center",
              fontSize: "1.1rem",
            }}
          >
            Don't have an account?{" "}
            <strong
              style={{
                color: "#ff9c8a",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </strong>
          </Typography>
        </Box>

        {/* GIF Section */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            width: "50vw",
            justifyContent: "center",
            alignItems: "center",
            height: "90%",
          }}
        >
          <img
            src="/src/assets/images/12.png"
            alt="Login Illustration"
            style={{
              maxHeight: "80%",
              maxWidth: "90%",
            }}
          />
        </Box>
      </Box>
      {/* Snackbar for error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        ContentProps={{
          style: {
            backgroundColor: "#f44336",
            color: "#fff",
            borderRadius: "12px",
          },
        }}
      />
    </Box>
  );
};

export default Login;
