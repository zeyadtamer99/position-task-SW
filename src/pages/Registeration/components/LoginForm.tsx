import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { Input } from "antd";
import { reusableButtonStyle } from "../../../assets/global-styles";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(email, password);
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
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
