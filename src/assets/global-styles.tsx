const breakpoints = {
  sm: 500,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1800,
};

// Media query utilities for responsive design
export const mq = {
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
};

// Spacing constants
export const xSmallSpacing = "16px";
export const smallSpacing = "32px";
export const mediumSpacing = "64px";
export const largeSpacing = "96px";
export const xlargeSpacing = "128px";

// Border radius constants
export const smallBorderRadius = "10px";
export const mediumBorderRadius = "24px";
export const largeBorderRadius = "36px";

// Reusable styles for the card
export const cardStyle = {
  width: 350,
  padding: 3, // Uses Material-UI spacing (3 = 24px)
  backgroundColor: "#fff",
  borderRadius: smallBorderRadius,
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

// src/assets/global-styles.tsx

// Form container style with dynamic background gradient
export const formContainerStyle = (gradient: "blue" | "red") => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  minHeight: "100vh",
  background:
    gradient === "blue"
      ? "linear-gradient(45deg, #6a11cb 30%, #659eff 90%)" // Blue gradient for Login
      : "linear-gradient(45deg, #ff5858 30%, #ff9c8a 90%)", // Red gradient for SignUp
});

// Hide elements on small screens
export const hideOnMobile = {
  display: {
    xs: "none",
    md: "block",
  },
};

// Typography style for page title
export const pageTitleStyle = {
  fontSize: { xs: "1.5rem", md: "2rem" },
  textAlign: "left",
  fontWeight: 700,
};

// Button style
export const buttonStyle = {
  width: { xs: "100%", md: "15%" },
  height: { xs: "2rem", md: "50px" },
  fontSize: { xs: "0.5rem", md: "1rem" },
  borderRadius: "12px",
};

// Style for typography div
export const typographyDivStyle = {
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  marginTop: { xs: "30px", md: "0px" },
};

// Reusable style for form div
export const formStyle = {
  marginTop: "20px",
};

// Style for table title typography
export const tableDataTitleTypography = {
  fontSize: "1rem",
  fontWeight: 700,
  lineHeight: "25px",
  letterSpacing: "0.02em",
  textAlign: "left",
  fontFamily: "Poppins",
};
