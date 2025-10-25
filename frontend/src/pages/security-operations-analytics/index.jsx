import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import AnalyticsHeader from './components/AnalyticsHeader';
import KPIMetricsSection from './components/KPIMetricsSection';
import ThreatVolumeChart from './components/ThreatVolumeChart';
import ThreatCategoryBreakdown from './components/ThreatCategoryBreakdown';
import CorrelationMatrix from './components/CorrelationMatrix';

const SecurityOperationsAnalytics = () => {
  const [filters, setFilters] = useState({
    dateRange: '7d',
    threatCategories: [],
    regions: [],
    comparisonMode: false
  });

  const [currentUser] = useState({
    name: 'Sarah Mitchell',
    role: 'Security Manager',
    avatar: null,
    status: 'active',
    lastActivity: new Date(),
    permissions: ['monitor', 'analyze', 'respond', 'manage']
  });

  const [connectionStatus] = useState({
    dataFeed: 'connected',
    threatIntel: 'connected',
    monitoring: 'connected',
    lastRefresh: new Date(),
    refreshInterval: 30,
    systemHealth: 'optimal'
  });

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
    // Implement filter logic to update all components
  };

  const handleExport = (type) => {
    console.log(`Exporting ${type}...`);
    // Implement export functionality
    if (type === 'pdf') {
      // Generate PDF report
      alert('PDF report generation started. You will be notified when ready.');
    } else if (type === 'report') {
      // Generate detailed threat intelligence briefing
      alert('Threat intelligence briefing generation started.');
    }
  };

  const handleLogout = () => {
    console.log('User logging out...');
    // Implement logout logic
  };

  useEffect(() => {
    // Simulate data refresh every 5 minutes
    const refreshInterval = setInterval(() => {
      console.log('Refreshing analytics data...');
      // Implement data refresh logic
    }, 300000); // 5 minutes

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        currentUser={currentUser}
        connectionStatus={connectionStatus}
        onLogout={handleLogout}
      />
      {/* Main Content */}
      <main className="pt-28 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Analytics Header with Filters */}
          <AnalyticsHeader
            onFiltersChange={handleFiltersChange}
            onExport={handleExport}
          />

          {/* KPI Metrics Section */}
          <KPIMetricsSection />

          {/* Main Analytics Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6">
            {/* Threat Volume Chart - 9 columns */}
            <div className="xl:col-span-9">
              <ThreatVolumeChart />
            </div>

            {/* Threat Category Breakdown - 3 columns */}
            <div className="xl:col-span-3">
              <ThreatCategoryBreakdown />
            </div>
          </div>

          {/* Full-width Correlation Matrix */}
          <CorrelationMatrix />

          {/* Additional Analytics Info */}
          <div className="mt-6 p-4 bg-card/50 border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse-data"></div>
                  <span className="text-sm text-muted-foreground">
                    Data refreshes every 5 minutes
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-muted-foreground">
                    Historical comparison available
                  </span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Last updated: {new Date()?.toLocaleTimeString('en-US', { 
                  hour12: false, 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit' 
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SecurityOperationsAnalytics;