import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Snackbar } from "@mui/material";
import { Input, Button, Modal, Typography } from "antd";
import {
  auth,
  facebookProvider,
  githubProvider,
  googleProvider,
} from "../../../config/firebase";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { formContainerStyle } from "../../assets/global-styles";
import SocialButtons from "./components/SocialButtons"; // Reusing SocialButtons
import LoginForm from "./components/LoginForm";
import AuthHeader from "./components/AuthHeader";
import loginIllustration from "../../assets/images/12.png";
import { useTranslation } from "react-i18next";
import { isEmailValid, isFirebaseError } from "./utils";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailForReset, setEmailForReset] = useState("");
  const [isSending, setIsSending] = useState(false); // Loading state for send reset link
  const getFirebaseErrorMessage = (errorCode: string): string => {
    const errorMessages: Record<string, string> = {
      "auth/user-not-found": t("login.errors.userNotFound"),
      "auth/wrong-password": t("login.errors.wrongPassword"),
      "auth/email-already-in-use": t("login.errors.emailInUse"),
      "auth/invalid-email": t("login.errors.invalidEmail"),
      "auth/weak-password": t("login.errors.weakPassword"),
      "auth/network-request-failed": t("login.errors.networkError"),
      // Add more error mappings as needed
    };
    return errorMessages[errorCode] || t("login.errors.default");
  };
  const handleSnackbarClose = () => setSnackbarOpen(false);

  // Social login logic
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
    if (!email || !password) {
      setSnackbarMessage(t("login.errors.fillAllFields"));
      setSnackbarOpen(true);
      return;
    }

    if (!isEmailValid(email)) {
      setSnackbarMessage(t("login.errors.invalidEmail"));
      setSnackbarOpen(true);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/analytics");
    } catch (error: unknown) {
      const errorMessage = isFirebaseError(error)
        ? getFirebaseErrorMessage(error.code)
        : t("login.errors.default"); // Fallback message for unknown errors
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
    }
  };

  // Forgot Password handlers
  const openForgotPasswordModal = () => setIsModalOpen(true);
  const closeForgotPasswordModal = () => {
    setIsModalOpen(false);
    setEmailForReset(""); // Clear email input when closing
  };

  const handleSendResetLink = async () => {
    if (!emailForReset) {
      setSnackbarMessage(t("login.errors.enterEmailForReset"));
      setSnackbarOpen(true);
      return;
    }

    if (!isEmailValid(emailForReset)) {
      setSnackbarMessage(t("login.errors.invalidEmail"));
      setSnackbarOpen(true);
      return;
    }

    setIsSending(true);
    try {
      await sendPasswordResetEmail(auth, emailForReset);
      setSnackbarMessage(t("login.success.passwordResetSent"));
      setSnackbarOpen(true);
      closeForgotPasswordModal();
    } catch (error: unknown) {
      const errorMessage = isFirebaseError(error)
        ? getFirebaseErrorMessage(error.code)
        : t("login.errors.default"); // Fallback message for unknown errors
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
    } finally {
      setIsSending(false);
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
      <AuthHeader subtitle={t("login.subtitle")} />
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
          <LoginForm onSubmit={handleFormLogin} />
          <SocialButtons onSocialSignUp={handleSocialLogin} mode="login" />
          <Typography
            style={{ marginTop: "16px", fontSize: "1.1rem", color: "white" }}
          >
            {t("login.newUser.text")}{" "}
            <strong
              style={{
                color: "#ff9c8a",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/signup")}
            >
              {t("login.newUser.link")}
            </strong>
          </Typography>

          <Button
            variant="solid"
            color="primary"
            onClick={openForgotPasswordModal}
            style={{
              marginTop: "12px",
              color: "#ffffff",
              padding: "8px 16px",
              borderRadius: "12px",
              transition: "background-color 0.3s, box-shadow 0.3s",
              boxShadow: "0px 2px 8px rgba(93, 71, 255, 0.2)",
            }}
          >
            {t("login.forgotPassword")}
          </Button>
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
            src={loginIllustration}
            alt="Login Illustration"
            style={{ maxHeight: "80%", maxWidth: "90%" }}
          />
        </Box>
      </Box>

      {/* Forgot Password Modal */}
      <Modal
        title={t("login.forgotPasswordTitle")}
        open={isModalOpen}
        onCancel={closeForgotPasswordModal}
        footer={[
          <Button key="cancel" onClick={closeForgotPasswordModal}>
            {t("actions.cancel")}
          </Button>,
          <Button
            key="send"
            type="primary"
            onClick={handleSendResetLink}
            loading={isSending} // Show loading effect on button
          >
            {t("actions.sendResetLink")}
          </Button>,
        ]}
      >
        <Typography>{t("login.enterEmailForReset")}</Typography>
        <Input
          type="email"
          placeholder={t("login.emailPlaceholder")}
          value={emailForReset}
          onChange={(e) => setEmailForReset(e.target.value)}
          style={{ marginTop: "12px", padding: "8px" }}
        />
      </Modal>

      {/* Snackbar for error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        ContentProps={{
          style: {
            backgroundColor: snackbarMessage.includes("successfully")
              ? "#4caf50" // Green for success messages
              : "#f44336", // Red for error messages
            color: "#fff",
            borderRadius: "12px",
          },
        }}
      />
    </Box>
  );
};

export default Login;
