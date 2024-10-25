// src/pages/SignUp.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Snackbar } from "@mui/material";
import { Typography, Input } from "antd";
import {
  formContainerStyle,
  reusableButtonStyle,
} from "../assets/global-styles";
import {
  FacebookOutlined,
  GoogleOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import {
  auth,
  facebookProvider,
  githubProvider,
  googleProvider,
} from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasNumber) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character (e.g., !@#$%^&*).";
    }
    return ""; // No errors
  };

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
      navigate("/");
    } catch (error) {
      console.error("Error during social sign-up:", error);
      setSnackbarMessage("Error during social sign-up. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const handleFormSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate input
    if (!fullName || !email || !password) {
      setSnackbarMessage("Please fill in all fields.");
      setSnackbarOpen(true);
      return;
    }

    // Validate password
    const validationError = validatePassword(password);
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
      navigate("/home");
    } catch (error) {
      console.error("Error during form sign-up:", error);
      setSnackbarMessage("Sign-up failed. Please try again.");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      sx={{
        ...formContainerStyle("blue"),
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: { xs: "100%", md: "50%" }, // Header takes half of the width
          px: { xs: 2, md: 4 },
          mb: 4, // Margin below the header
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
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
            width: { xs: "100%", md: "50%" }, // Form takes half of the width
            px: { xs: 2, md: 4 },
          }}
        >
          <Box
            component="form"
            sx={{
              width: { xs: "80%", sm: "60%", md: "70%" },
              mb: 4,
            }}
            onSubmit={handleFormSignUp} // Attach form submit handler
          >
            <Input
              placeholder="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)} // Update state on change
              style={{ marginBottom: 16, width: "100%", fontSize: "1.1rem" }}
            />
            <Input
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state on change
              style={{ marginBottom: 16, width: "100%", fontSize: "1.1rem" }}
            />
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on change
              style={{ marginBottom: 16, width: "100%", fontSize: "1.1rem" }}
            />
            <Button
              variant="contained"
              sx={{
                ...reusableButtonStyle,
                backgroundColor: "#5d47ff",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#5d47ff",
                },
              }}
              fullWidth
              type="submit" // Make this button submit the form
            >
              Sign Up
            </Button>
          </Box>
          {/* Social Sign-Up Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "80%", sm: "60%", md: "70%" },
              gap: 2,
              mb: 4,
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1877f2", // Facebook color
                color: "#fff",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#145db2", // Darker shade on hover
                },
              }}
              fullWidth
              onClick={() => handleSocialSignUp("Facebook")}
            >
              <FacebookOutlined
                style={{ fontSize: "1.5rem", marginRight: "8px" }}
              />
              Sign Up with Facebook
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#db4437", // Google color
                color: "#fff",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#b13628", // Darker shade on hover
                },
              }}
              fullWidth
              onClick={() => handleSocialSignUp("Google")}
            >
              <GoogleOutlined
                style={{ fontSize: "1.5rem", marginRight: "8px" }}
              />
              Sign Up with Google
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#333", // GitHub color
                color: "#fff",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#1a1a1a", // Darker shade on hover
                },
              }}
              fullWidth
              onClick={() => handleSocialSignUp("GitHub")}
            >
              <GithubOutlined
                style={{ fontSize: "1.5rem", marginRight: "8px" }}
              />
              Sign Up with GitHub
            </Button>
          </Box>
          <Typography style={{ color: "#ffffff", marginTop: "16px" }}>
            Already have an account?{" "}
            <span
              style={{ color: "#ff9c8a", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </Typography>
        </Box>
        {/* GIF Section */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" }, // Hide on small screens
            width: "50%", // Right side takes half of the width
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="src/assets/images/2.png" // Replace with your GIF source
            alt="Signup Illustration"
            style={{
              maxWidth: "100%", // Responsive width
              height: "auto",
            }}
          />
        </Box>
      </Box>

      {/* Snackbar for error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Automatically close after 6 seconds
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Position of the Snackbar
        ContentProps={{
          style: {
            backgroundColor: "#f44336", // Red background color for errors
            color: "#fff", // White text color
            borderRadius: "12px",
          },
        }}
      />
    </Box>
  );
};

export default SignUp;
