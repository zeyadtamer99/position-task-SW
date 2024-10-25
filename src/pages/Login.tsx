// src/pages/Login.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import { Input } from "antd";
import {
  formContainerStyle,
  cardStyle,
  formStyle,
  pageTitleStyle,
} from "../assets/global-styles";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../../config/firebase";

const Login: React.FC = () => {
  const navigate = useNavigate();

  // Function to handle login with provider
  const handleLogin = async (providerName: string) => {
    let provider;

    if (providerName === "googleProvider") {
      provider = googleProvider;
    } else if (providerName === "facebookProvider") {
      provider = facebookProvider;
    } else {
      alert("Invalid provider");
      return;
    }

    try {
      await signInWithPopup(auth, provider);
      alert("Login successful");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed");
    }
  };

  return (
    <Box sx={{ display: "flex", width: "100vw", minHeight: "100vh" }}>
      {/* Left half for the form */}
      <Box
        sx={{ ...formContainerStyle("blue"), width: { xs: "100%", md: "50%" } }}
      >
        <Box sx={cardStyle}>
          <Typography variant="h4" component="h1" sx={pageTitleStyle}>
            Login
          </Typography>
          <Typography variant="body2">
            Don't have an account yet?{" "}
            <a href="#" onClick={() => navigate("/signup")}>
              Sign Up
            </a>
          </Typography>

          <Box component="form" sx={formStyle}>
            <Input
              placeholder="Email Address"
              type="email"
              style={{ marginBottom: 16 }}
            />
            <Input.Password
              placeholder="Password"
              style={{ marginBottom: 16 }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel control={<Checkbox />} label="Remember me" />
              <a href="#" style={{ color: "#6a11cb" }}>
                Forgot Password?
              </a>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{
                marginTop: 2,
                backgroundColor: "#6a11cb",
                color: "#fff",
              }}
            >
              Login
            </Button>
            <Typography
              sx={{
                margin: "15px 0",
                textAlign: "center",
                fontSize: "0.8rem",
                color: "#888",
              }}
            >
              or login with
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleLogin("googleProvider")}
                sx={{
                  marginBottom: 2,
                  backgroundColor: "#db4437",
                  color: "#fff",
                }}
              >
                Sign in with Google
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleLogin("facebookProvider")}
                sx={{
                  marginBottom: 2,
                  backgroundColor: "#3b5998",
                  color: "#fff",
                }}
              >
                Sign in with Facebook
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleLogin("githubProvider")}
                sx={{ backgroundColor: "#333", color: "#fff" }}
              >
                Sign in with GitHub
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Right half for the GIF */}
      <Box
        sx={{
          width: { xs: "0%", md: "50%" }, // Hide on smaller screens
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "0%", md: "70%" }, // Hide on smaller screens
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/src/assets/gifs/signIn.gif"
            alt="Animation"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 10,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
