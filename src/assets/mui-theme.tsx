import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Theme {
    gradients: {
      primary: string;
      secondary: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    gradients: {
      primary: string;
      secondary: string;
    };
  }
}

// A custom theme for this app
const theme = createTheme({
  spacing: 8,

  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },

  gradients: {
    primary:
      "linear-gradient(0deg, #41DED1 10%, #40E0D0 10%, #41DED1 10%, #539BF5 40%, #6F5BFF 100%)",
    secondary: "linear-gradient(0deg,  #84A6FF 5%, #7980FF 40%, #5D47FF 100%)",
  },
  palette: {
    primary: {
      main: "#5D47FF",
      light: "#84A6FF",
    },
    secondary: {
      main: "#42DAD3",
      light: "#EEF3FF",
    },
    info: {
      main: "#202020",
      light: "#595959",
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "#202020",
      secondary: "#595959",
    },
  },
});

theme.typography.h6 = {
  fontSize: "0.9rem",
  fontWeight: "400",
  "@media (min-width:600px)": {
    fontSize: "1rem",
  },
};

theme.typography.h4 = {
  fontSize: "1.2rem",
  fontWeight: "600",
  "@media (min-width:600px)": {
    fontSize: "1.4rem",
  },
};

export default theme;
