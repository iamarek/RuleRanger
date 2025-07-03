import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import type { FC } from "react";
import Home from "./Home/Home";
import Dashboard from "./Dashboard/Dashboard";
import Onboarding from "./Onboarding/Onboarding";
import Loading from "../components/Loading/Loading";
import { useUserPreferences } from "./useUserPreferences";

const About: FC = () => <div>About Page</div>;

const ProtectedRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { preferences, loading } = useUserPreferences();

  if (loading) {
    return <></>;
  }

  const isOnboardingComplete = preferences.onboardingCompletedAt !== null;
  console.log(isOnboardingComplete);
  return isOnboardingComplete ? (
    <>{children}</>
  ) : (
    <Navigate to="/onboarding" replace />
  );
};

const OnboardingRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { preferences, loading } = useUserPreferences();

  if (loading) {
    return <Loading />;
  }

  const isOnboardingComplete = preferences.onboardingCompletedAt !== null;

  return !isOnboardingComplete ? <>{children}</> : <Navigate to="/" replace />;
};

const App: FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/onboarding"
        element={
          <OnboardingRoute>
            <Onboarding />
          </OnboardingRoute>
        }
      />
      <Route path="/about" element={<About />} />
      <Route path="/projects/:projectName" element={<div>Project Page</div>} />
      <Route path="/global-rules" element={<div>Global Rules Page</div>} />
      <Route
        path="/templates/:templateName"
        element={<div>Template Page</div>}
      />
    </Routes>
  );
};

export default App;
