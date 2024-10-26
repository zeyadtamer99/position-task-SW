// src/pages/SignUp.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Snackbar } from "@mui/material";
import {
  auth,
  facebookProvider,
  githubProvider,
  googleProvider,
} from "../../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { formContainerStyle } from "../../assets/global-styles";
import SignUpForm from "./components/SignUpForm";
import SocialButtons from "./components/SocialButtons";
import { isEmailValid, validatePassword } from "./utils";
import { Typography } from "antd";
import AuthHeader from "./components/AuthHeader";
import signupIllustration from "../../assets/images/2.png";
import { useTranslation } from "react-i18next";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { t } = useTranslation();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSocialSignUp = async (provider: string) => {
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
      console.log("User signed up successfully:", result.user);
      navigate("/analytics");
    } catch (error) {
      console.error("Error during social sign-up:", error);
      setSnackbarMessage("Error during social sign-up. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const handleFormSignUp = async (
    fullName: string,
    email: string,
    password: string
  ) => {
    // Validate input fields
    if (!fullName || !email || !password) {
      setSnackbarMessage(t("signup.errors.fillAllFields"));
      setSnackbarOpen(true);
      return;
    }

    if (!isEmailValid(email)) {
      setSnackbarMessage(t("signup.errors.invalidEmail"));
      setSnackbarOpen(true);
      return;
    }

    const validationError = await validatePassword(password);
    if (validationError) {
      setSnackbarMessage(validationError);
      setSnackbarOpen(true);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up successfully:", userCredential.user);
      navigate("/analytics");
    } catch (error) {
      console.error("Error during form sign-up:", error);
      setSnackbarMessage(t("signup.errors.signUpFailed"));
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
      <AuthHeader subtitle={t("signup.subtitle")} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row", // Ensure the parent box is in row direction
          alignItems: "stretch", // Make children stretch to fill the height
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
            height: "100%", // Take full height of the parent
          }}
        >
          <SignUpForm onSubmit={handleFormSignUp} />

          {/* Vertical Separator */}
          <Box
            sx={{
              height: "100%", // Match the height of the parent
              width: "2px",
              backgroundColor: "#fff",
              mx: 2,
            }}
          />

          {/* Social Buttons */}
          <SocialButtons onSocialSignUp={handleSocialSignUp} />

          {/* Return to Login Link */}
          <Typography
            style={{
              marginTop: "16px",
              textAlign: "center",
              fontSize: "1.1rem", // Slightly larger font size
            }}
          >
            {t("signup.existingUser.text")}{" "}
            <strong
              style={{
                color: "#ff9c8a", // Color for the link
                cursor: "pointer",
                textDecoration: "underline", // Underline for better indication
              }}
              onClick={() => navigate("/login")}
            >
              {t("signup.existingUser.link")}
            </strong>
          </Typography>
        </Box>

        {/* GIF Section */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" }, // Hide on small screens
            width: "50vw", // Right side takes half of the width
            justifyContent: "center",
            alignItems: "center",
            height: "90%", // Ensure it takes the full height
          }}
        >
          <img
            src={signupIllustration}
            alt="Signup Illustration"
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

export default SignUp;
