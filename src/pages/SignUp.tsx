import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import { Input } from "antd";
import {
  formContainerStyle,
  cardStyle,
  formStyle,
  pageTitleStyle,
} from "../assets/global-styles";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", width: "100vw", minHeight: "100vh" }}>
      {/* Left half for the form */}
      <Box
        sx={{ ...formContainerStyle("red"), width: { xs: "100%", md: "50%" } }}
      >
        <Box sx={cardStyle}>
          <Typography variant="h4" component="h1" sx={pageTitleStyle}>
            Sign Up
          </Typography>
          <Typography variant="body2">
            Already have an account?{" "}
            <a href="#" onClick={() => navigate("/login")}>
              Login
            </a>
          </Typography>

          <Box component="form" sx={formStyle}>
            <Input
              placeholder="Full Name"
              type="text"
              style={{ marginBottom: 16 }}
            />
            <Input
              placeholder="Email Address"
              type="email"
              style={{ marginBottom: 16 }}
            />
            <Input.Password
              placeholder="Password"
              style={{ marginBottom: 16 }}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{
                marginTop: 2,
                backgroundColor: "#ff5858",
                color: "#fff",
              }}
            >
              Sign Up
            </Button>
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
            src="/src/assets/gifs/signUp.gif"
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

export default SignUp;
