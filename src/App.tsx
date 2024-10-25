// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./assets/mui-theme";
import Login from "./pages/Registeration/Login";
import SignUp from "./pages/Registeration/SignUp";
import SplashScreen from "./pages/SplashScreen";
import AnalyticsPage from "./pages/Analytics/AnalyticsPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
