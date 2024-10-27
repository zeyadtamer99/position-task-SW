// src/App.tsx
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./assets/mui-theme";
import { Suspense, lazy } from "react";
import ErrorPage from "./global/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import "./utils/i18n";
import LoadingSpinner from "./components/LoadingSpinner"; // Import the loading spinner

// Lazy-loaded components
const SplashScreen = lazy(() => import("./pages/SplashScreen"));
const Login = lazy(() => import("./pages/Registeration/Login"));
const SignUp = lazy(() => import("./pages/Registeration/SignUp"));
const AnalyticsPage = lazy(() => import("./pages/Analytics/AnalyticsPage"));

function App() {
  const isAuthenticated = useAuth();

  // Component to handle redirection for authenticated users
  const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated ? <Navigate to="/analytics" replace /> : children;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          {" "}
          {/* Use LoadingSpinner */}
          <Routes>
            {/* Routes with redirection for authenticated users */}
            <Route
              path="/"
              element={
                <RedirectIfAuthenticated>
                  <SplashScreen />
                </RedirectIfAuthenticated>
              }
            />
            <Route
              path="/login"
              element={
                <RedirectIfAuthenticated>
                  <Login />
                </RedirectIfAuthenticated>
              }
            />
            <Route
              path="/signup"
              element={
                <RedirectIfAuthenticated>
                  <SignUp />
                </RedirectIfAuthenticated>
              }
            />

            {/* Protected Route for Analytics Page */}
            <Route
              path="/analytics"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<AnalyticsPage />}
                />
              }
            />

            {/* Fallback for undefined routes */}
            <Route
              path="*"
              element={<ErrorPage errorMessage="Page not found." />}
            />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
