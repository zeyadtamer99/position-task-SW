import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { reusableButtonStyle } from "../../../assets/global-styles";
import { Input } from "antd";

interface SignUpFormProps {
  onSubmit: (fullName: string, email: string, password: string) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(fullName, email, password);
  };

  return (
    <Box
      component="form"
      sx={{
        width: { xs: "80%", sm: "60%", md: "70%" },
        mb: 6,
      }}
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Full Name"
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        style={{
          marginBottom: 16,
          width: "100%",
          fontSize: "1.1rem",
        }}
      />
      <Input
        placeholder="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          marginBottom: 16,
          width: "100%",
          fontSize: "1.1rem",
        }}
      />
      <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          marginBottom: 16,
          width: "100%",
          fontSize: "1.1rem",
        }}
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
        type="submit"
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUpForm;
