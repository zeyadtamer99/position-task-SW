// src/pages/SignUp.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Snackbar } from "@mui/material";
import {
  auth,
  facebookProvider,
  githubProvider,
  googleProvider,
} from "../../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
  authContainerStyle,
  innerBoxStyle,
  formSectionStyle,
  separatorStyle,
  linkStyle,
} from "../../assets/global-styles";
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

  useEffect(() => {
    document.title = "Sign Up - SwipeWork";
  }, []);

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
    <Box sx={authContainerStyle}>
      <AuthHeader subtitle={t("signup.subtitle")} />
      <Box sx={innerBoxStyle}>
        <Box sx={formSectionStyle}>
          <SignUpForm onSubmit={handleFormSignUp} />
          <Box sx={separatorStyle} />
          <SocialButtons onSocialSignUp={handleSocialSignUp} />
          <Typography style={{ marginTop: 2, fontSize: "1.1rem" }}>
            {t("signup.existingUser.text")}{" "}
            <strong style={linkStyle} onClick={() => navigate("/login")}>
              {t("signup.existingUser.link")}
            </strong>
          </Typography>
        </Box>
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
            src={signupIllustration}
            alt="Signup Illustration"
            style={{ maxHeight: "80%", maxWidth: "90%" }}
          />
        </Box>
      </Box>
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
