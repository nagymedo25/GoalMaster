import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import HomePage from './components/Dashboard/HomePage';
import GoalsPage from './components/Dashboard/GoalsPage';
import AnalyticsPage from './components/Dashboard/AnalyticsPage';
import ChallengesPage from './components/Dashboard/ChallengesPage';
import SettingsPage from './components/Dashboard/SettingsPage';
import LandingPage from './LandingPage';
import OnboardingPage from './pages/Onboarding/Onboarding';
import SuccessPage from './pages/Auth/RegisterSuccess';
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setHasCompletedOnboarding(true);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setHasCompletedOnboarding(false);
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Router basename="/GoalMaster">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                hasCompletedOnboarding ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/onboarding" replace />
                )
              ) : (
                <LandingPage onLogin={handleLogin} />
              )
            }
          />

          {/* Auth Routes */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                hasCompletedOnboarding ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/onboarding" replace />
                )
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/register"
            element={
              isAuthenticated ? (
                hasCompletedOnboarding ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/onboarding" replace />
                )
              ) : (
                <RegisterPage onRegister={handleRegister} />
              )
            }
          />

          <Route
            path="/register-success"
            element={
              isAuthenticated ? (
                <SuccessPage onContinue={() => setHasCompletedOnboarding(false)} />
              ) : (
                <Navigate to="/register" replace />
              )
            }
          />

          {/* Onboarding Flow */}
          <Route
            path="/onboarding"
            element={
              isAuthenticated && !hasCompletedOnboarding ? (
                <OnboardingPage onComplete={handleOnboardingComplete} />
              ) : hasCompletedOnboarding ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard/*"
            element={
              isAuthenticated && hasCompletedOnboarding ? (
                <DashboardLayout>
                  <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="goals" element={<GoalsPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="challenges" element={<ChallengesPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </DashboardLayout>
              ) : isAuthenticated ? (
                <Navigate to="/onboarding" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
};

export default App; 