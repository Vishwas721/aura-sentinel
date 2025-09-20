import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import SecurityOperationsAnalytics from './pages/security-operations-analytics';
import ThreatIntelligenceCommandCenter from './pages/threat-intelligence-command-center';
import LiveSecurityMonitoring from './pages/live-security-monitoring';
import ExecutiveSecurityDashboard from './pages/executive-security-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ExecutiveSecurityDashboard />} />
        <Route path="/security-operations-analytics" element={<SecurityOperationsAnalytics />} />
        <Route path="/threat-intelligence-command-center" element={<ThreatIntelligenceCommandCenter />} />
        <Route path="/live-security-monitoring" element={<LiveSecurityMonitoring />} />
        <Route path="/executive-security-dashboard" element={<ExecutiveSecurityDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
