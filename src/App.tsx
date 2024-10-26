// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./assets/mui-theme";
import Login from "./pages/Registeration/Login";
import SignUp from "./pages/Registeration/SignUp";
import SplashScreen from "./pages/SplashScreen";
import AnalyticsPage from "./pages/Analytics/AnalyticsPage";
import "./utils/i18n";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";

function App() {
  const isAuthenticated = useAuth(); // Check authentication status

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                element={<AnalyticsPage />}
              />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
