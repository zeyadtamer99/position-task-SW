// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./assets/mui-theme";
import Login from "./pages/Registeration/Login";
import SignUp from "./pages/Registeration/SignUp";
import SplashScreen from "./pages/SplashScreen";
import AnalyticsPage from "./pages/Analytics/AnalyticsPage";
import ErrorPage from "./global/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import "./utils/i18n";

function App() {
  const isAuthenticated = useAuth();

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
          <Route
            path="*"
            element={<ErrorPage errorMessage="Page not found." />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
