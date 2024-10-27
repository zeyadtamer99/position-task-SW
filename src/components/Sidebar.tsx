//E:\ReactCV\position-task\src\components\Sidebar.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { FlagIcon, FlagIconCode } from "react-flag-kit";
import logo from "../../src/assets/images/swipework_logo.jpg";
import { keyframes } from "@emotion/react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { auth } from "../firebase/firebase";

const Sidebar: React.FC = () => {
  const { i18n } = useTranslation();
  const [isDutch, setIsDutch] = useState(i18n.language === "nl");
  const [isSpanish, setIsSpanish] = useState(i18n.language === "es");
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility
  const navigate = useNavigate();
  const toggleLanguage = () => {
    const newLang = isDutch ? "es" : isSpanish ? "en" : "nl"; // Adjust for three languages
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
    setIsDutch(newLang === "nl");
    setIsSpanish(newLang === "es");
  };
  const { t } = useTranslation();

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign the user out from Firebase
      console.log("User signed out successfully");
      localStorage.removeItem("userToken"); // Clear any additional tokens or user data if needed
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to sign out. Please try again."); // Display an error message if sign-out fails
    }
  };

  // Function to open/close the confirmation dialog
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  // Animation keyframes for gradient color transition
  const gradientAnimation = keyframes`
    0% { background-position: 0% 50%; }
    100% { background-position: 50% 0%; }
  `;

  // Media query for small screens
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      sx={{
        width: { xs: "30%", md: "15%", lg: "20%" },
        height: "100vh", // Full viewport height
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: { xs: "10px", md: "20px" },
        paddingBottom: { xs: "10px", md: "20px" },
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.5)",
        position: "relative",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          width: isSmallScreen ? "60%" : "80%",
          maxWidth: "200px",
        }}
      />

      {/* Container for language toggle and signout buttons */}
      <Box
        sx={{
          display: "flex",
          gap: "10px", // Space between buttons
          position: "absolute",
          bottom: { xs: "10px", md: "20px" },
        }}
      >
        {/* Sign Out Button */}
        <Button
          onClick={handleOpenDialog}
          sx={{
            width: "fit-content",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: { xs: "6px 12px", sm: "8px 15px", md: "12px 25px" },
            background: "linear-gradient(135deg, #ff9696, #ff1515)", // Same gradient as language button
            backgroundSize: "200% 200%",
            color: "#fff",
            borderRadius: "30px",
            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1.1rem" },
            fontWeight: "bold",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            animation: `${gradientAnimation} 4s ease infinite`,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.25)",
            },
            "&:active": {
              transform: "scale(0.95)",
            },
          }}
        >
          <LogoutOutlined style={{ fontSize: "1.5rem", color: "#fff" }} />
        </Button>

        {/* Language Toggle Button */}
        <Button
          onClick={toggleLanguage}
          sx={{
            width: "fit-content",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: { xs: "6px 12px", sm: "8px 15px", md: "12px 25px" },
            background: isDutch
              ? "linear-gradient(135deg, #98b1df, #005eff)" // Dutch flag gradient
              : isSpanish
              ? "linear-gradient(135deg, #ffdd76, #ff6f43)" // Spanish flag gradient
              : "linear-gradient(135deg, #ffadad, #ec1919)", // US flag gradient
            backgroundSize: "200% 200%",
            color: "#fff",
            borderRadius: "30px",
            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1.1rem" },
            fontWeight: "bold",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            animation: `${gradientAnimation} 4s ease infinite`,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.25)",
            },
            "&:active": {
              transform: "scale(0.95)",
            },
          }}
        >
          <Box
            sx={{
              width: { xs: "25px", md: "35px" },
              height: { xs: "25px", md: "35px" },
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            }}
          >
            <FlagIcon
              code={(isDutch ? "NL" : isSpanish ? "ES" : "US") as FlagIconCode}
              size={24}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        </Button>
      </Box>

      {/* Sign-Out Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          style: {
            borderRadius: "20px",
            padding: "20px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
          {t("signOutDialog.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center", mb: 2 }}>
            {t("signOutDialog.message")}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: "20px" }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              color: "#ff5c5c",
              borderColor: "#ff5c5c",
              "&:hover": {
                borderColor: "#ff1515",
                color: "#ff1515",
              },
            }}
          >
            {t("signOutDialog.cancel")}
          </Button>
          <Button
            onClick={() => {
              handleSignOut();
              handleCloseDialog();
            }}
            variant="contained"
            sx={{
              backgroundColor: "#ff5c5c",
              "&:hover": {
                backgroundColor: "#ff1515",
              },
            }}
          >
            {t("signOutDialog.confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sidebar;
