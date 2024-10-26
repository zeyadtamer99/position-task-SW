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
}

const SocialButtons: React.FC<SocialButtonsProps> = ({ onSocialSignUp }) => {
  const { t } = useTranslation();

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
          backgroundColor: "#1877f2", // Facebook color
          color: "#fff",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#145db2", // Darker shade on hover
          },
        }}
        fullWidth
        onClick={() => onSocialSignUp("Facebook")}
      >
        <FacebookOutlined style={{ fontSize: "1.5rem", marginRight: "8px" }} />
        {t("social.signUpWithFacebook")}
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
        onClick={() => onSocialSignUp("Google")}
      >
        <GoogleOutlined style={{ fontSize: "1.5rem", marginRight: "8px" }} />
        {t("social.signUpWithGoogle")}
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
        onClick={() => onSocialSignUp("GitHub")}
      >
        <GithubOutlined style={{ fontSize: "1.5rem", marginRight: "8px" }} />
        {t("social.signUpWithGitHub")}
      </Button>
    </Box>
  );
};

export default SocialButtons;
