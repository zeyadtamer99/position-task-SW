import React from "react";
import { Box, Button } from "@mui/material";
import {
  FacebookOutlined,
  GoogleOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface SocialButtonsProps {
  onSocialSignUp: (provider: string) => void;
  mode?: "signup" | "login"; // Add mode prop
}

const SocialButtons: React.FC<SocialButtonsProps> = ({
  onSocialSignUp,
  mode = "signup",
}) => {
  const { t } = useTranslation();

  // Determine button text based on mode
  const buttonText =
    mode === "signup" ? t("social.signUpWith") : t("social.signInWith");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: { xs: "80%", sm: "60%", md: "70%" },
        gap: 2,
      }}
    >
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#1877f2",
          color: "#fff",
          textTransform: "none",
          "&:hover": { backgroundColor: "#145db2" },
        }}
        fullWidth
        onClick={() => onSocialSignUp("Facebook")}
      >
        <FacebookOutlined style={{ fontSize: "1.5rem", marginRight: "8px" }} />
        {buttonText} Facebook
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#db4437",
          color: "#fff",
          textTransform: "none",
          "&:hover": { backgroundColor: "#b13628" },
        }}
        fullWidth
        onClick={() => onSocialSignUp("Google")}
      >
        <GoogleOutlined style={{ fontSize: "1.5rem", marginRight: "8px" }} />
        {buttonText} Google
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#333",
          color: "#fff",
          textTransform: "none",
          "&:hover": { backgroundColor: "#1a1a1a" },
        }}
        fullWidth
        onClick={() => onSocialSignUp("GitHub")}
      >
        <GithubOutlined style={{ fontSize: "1.5rem", marginRight: "8px" }} />
        {buttonText} GitHub
      </Button>
    </Box>
  );
};

export default SocialButtons;
