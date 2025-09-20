import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SecurityLogStream from './components/SecurityLogStream';
import NetworkTrafficChart from './components/NetworkTrafficChart';
import AlertSeverityDistribution from './components/AlertSeverityDistribution';
import SystemControlPanel from './components/SystemControlPanel';
import Icon from '../../components/AppIcon';

const LiveSecurityMonitoring = () => {
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

  const [liveStats, setLiveStats] = useState({
    activeThreats: 0,
    blockedAttacks: 0,
    networkTraffic: 0,
    systemUptime: 0
  });

  useEffect(() => {
    // Simulate live stats updates
    const interval = setInterval(() => {
      setLiveStats({
        activeThreats: Math.floor(Math.random() * 25) + 5,
        blockedAttacks: Math.floor(Math.random() * 150) + 50,
        networkTraffic: Math.floor(Math.random() * 100) + 200,
        systemUptime: 99.8 + Math.random() * 0.2
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <>
      <Helmet>
        <title>Live Security Monitoring - Aegis Command</title>
        <meta name="description" content="Real-time security event tracking and network monitoring dashboard for SOC analysts" />
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
          <div className="w-full px-6">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Live Security Monitoring
                  </h1>
                  <p className="text-muted-foreground">
                    Real-time security event tracking and network analysis
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-card rounded-lg border border-border">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse-data"></div>
                    <span className="text-sm text-primary font-medium">MONITORING ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <Icon name="AlertTriangle" size={20} className="text-destructive" />
                  </div>
                  <div>
                    <div className="text-2xl font-mono font-bold text-foreground">
                      {liveStats?.activeThreats}
                    </div>
                    <div className="text-xs text-muted-foreground">Active Threats</div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <Icon name="Shield" size={20} className="text-success" />
                  </div>
                  <div>
                    <div className="text-2xl font-mono font-bold text-foreground">
                      {liveStats?.blockedAttacks}
                    </div>
                    <div className="text-xs text-muted-foreground">Blocked Today</div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name="Activity" size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-mono font-bold text-foreground">
                      {liveStats?.networkTraffic}
                    </div>
                    <div className="text-xs text-muted-foreground">Mbps Traffic</div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Icon name="Clock" size={20} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-mono font-bold text-foreground">
                      {liveStats?.systemUptime?.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">System Uptime</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-16 gap-6">
              {/* Left Section - Security Log Stream */}
              <div className="lg:col-span-6">
                <SecurityLogStream className="h-full" />
              </div>

              {/* Center Section - Network Traffic & Alerts */}
              <div className="lg:col-span-10 space-y-6">
                {/* Network Traffic Chart */}
                <NetworkTrafficChart />

                {/* Alert Severity Distribution */}
                <AlertSeverityDistribution />
              </div>
            </div>

            {/* Bottom Section - System Controls */}
            <div className="mt-6">
              <SystemControlPanel />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LiveSecurityMonitoring;