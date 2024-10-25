// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./assets/mui-theme";
import Login from "./pages/Registeration/Login";
import SignUp from "./pages/Registeration/SignUp";
import SplashScreen from "./pages/SplashScreen";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
