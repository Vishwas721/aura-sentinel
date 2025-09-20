import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import GlobalFilters from './components/GlobalFilters';
import MetricCard from './components/MetricCard';
import ThreatWorldMap from './components/ThreatWorldMap';
import LiveAlertFeed from './components/LiveAlertFeed';
import NetworkTrafficChart from './components/NetworkTrafficChart';

const ThreatIntelligenceCommandCenter = () => {
  const [filters, setFilters] = useState({
    severity: 'all',
    timeRange: '1h',
    alertStatus: 'all',
    region: 'global'
  });

  const [metrics, setMetrics] = useState({
    activeThreats: { value: 247, change: '+12', changeType: 'increase', status: 'warning' },
    blockedAttacks: { value: 1834, change: '+89', changeType: 'increase', status: 'normal' },
    networkAnomalies: { value: 23, change: '-5', changeType: 'decrease', status: 'success' },
    responseTime: { value: '2.3s', change: '+0.2s', changeType: 'increase', status: 'normal' }
  });

  const [currentUser] = useState({
    name: 'Alex Chen',
    role: 'SOC Analyst',
    avatar: null,
    status: 'active',
    lastActivity: new Date(),
    permissions: ['monitor', 'analyze', 'respond']
  });

  const [connectionStatus] = useState({
    dataFeed: 'connected',
    threatIntel: 'connected',
    monitoring: 'connected',
    lastRefresh: new Date(),
    refreshInterval: 30,
    systemHealth: 'optimal'
  });

  // Simulate real-time metric updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        activeThreats: {
          ...prev?.activeThreats,
          value: Math.max(0, prev?.activeThreats?.value + Math.floor(Math.random() * 10 - 5)),
          status: Math.random() > 0.7 ? 'critical' : Math.random() > 0.4 ? 'warning' : 'normal'
        },
        blockedAttacks: {
          ...prev?.blockedAttacks,
          value: prev?.blockedAttacks?.value + Math.floor(Math.random() * 20)
        },
        networkAnomalies: {
          ...prev?.networkAnomalies,
          value: Math.max(0, prev?.networkAnomalies?.value + Math.floor(Math.random() * 6 - 3))
        },
        responseTime: {
          ...prev?.responseTime,
          value: (2.0 + Math.random() * 1.5)?.toFixed(1) + 's'
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <>
      <Helmet>
        <title>Threat Intelligence Command Center - Aegis Command</title>
        <meta name="description" content="Real-time cybersecurity threat intelligence dashboard providing comprehensive monitoring and analysis" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header 
          currentUser={currentUser}
          connectionStatus={connectionStatus}
          onLogout={handleLogout}
        />

        {/* Main Content */}
        <main className="pt-28 pb-8">
          {/* Global Filters */}
          <GlobalFilters 
            onFiltersChange={handleFiltersChange}
            className="mb-6"
          />

          <div className="px-6 space-y-6">
            {/* Metrics Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <MetricCard
                title="Active Threats"
                value={metrics?.activeThreats?.value}
                change={metrics?.activeThreats?.change}
                changeType={metrics?.activeThreats?.changeType}
                icon="Shield"
                status={metrics?.activeThreats?.status}
                description="Real-time threat detection across all monitored systems"
              />
              
              <MetricCard
                title="Blocked Attacks"
                value={metrics?.blockedAttacks?.value?.toLocaleString()}
                change={metrics?.blockedAttacks?.change}
                changeType={metrics?.blockedAttacks?.changeType}
                icon="ShieldCheck"
                status="success"
                description="Successfully mitigated security incidents"
              />
              
              <MetricCard
                title="Network Anomalies"
                value={metrics?.networkAnomalies?.value}
                change={metrics?.networkAnomalies?.change}
                changeType={metrics?.networkAnomalies?.changeType}
                icon="AlertTriangle"
                status={metrics?.networkAnomalies?.value > 30 ? 'warning' : 'normal'}
                description="Unusual network traffic patterns detected"
              />
              
              <MetricCard
                title="Avg Response Time"
                value={metrics?.responseTime?.value}
                change={metrics?.responseTime?.change}
                changeType={metrics?.responseTime?.changeType}
                icon="Clock"
                status="normal"
                description="Mean time to threat response and mitigation"
              />
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* World Map - Takes 2 columns on xl screens */}
              <div className="xl:col-span-2">
                <ThreatWorldMap />
              </div>

              {/* Live Alert Feed - Takes 1 column on xl screens */}
              <div className="xl:col-span-1">
                <LiveAlertFeed />
              </div>
            </div>

            {/* Network Traffic Chart - Full Width */}
            <div className="w-full">
              <NetworkTrafficChart />
            </div>

            {/* Mobile Optimization Notice */}
            <div className="block md:hidden bg-card/50 border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 text-accent">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Mobile Optimized View</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Swipe between threat categories and use touch gestures for detailed analysis. 
                Full desktop features available on larger screens.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ThreatIntelligenceCommandCenter;