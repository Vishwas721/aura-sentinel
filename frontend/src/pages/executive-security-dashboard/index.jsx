import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SecurityPostureCard from './components/SecurityPostureCard';
import ExecutiveChart from './components/ExecutiveChart';
import RiskHeatMap from './components/RiskHeatMap';
import ComplianceStatus from './components/ComplianceStatus';
import IndustryBenchmark from './components/IndustryBenchmark';
import TimePeriodSelector from './components/TimePeriodSelector';

const ExecutiveSecurityDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock current user data
  const currentUser = {
    name: 'Sarah Mitchell',
    role: 'CISO',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    lastActivity: new Date(),
    permissions: ['executive', 'strategic', 'oversight']
  };

  // Mock connection status
  const connectionStatus = {
    dataFeed: 'connected',
    threatIntel: 'connected',
    monitoring: 'connected',
    lastRefresh: new Date(),
    refreshInterval: 60,
    systemHealth: 'optimal'
  };

  // Mock KPI data
  const kpiData = [
    {
      title: "Security Posture Score",
      value: "87%",
      trend: "up",
      trendValue: "+3%",
      icon: "Shield",
      status: "good",
      description: "Overall security effectiveness across all domains with continuous improvement trajectory"
    },
    {
      title: "Incident Response Time",
      value: "12m",
      trend: "down",
      trendValue: "-18%",
      icon: "Clock",
      status: "excellent",
      description: "Average time from detection to containment, significantly below industry benchmark"
    },
    {
      title: "Compliance Status",
      value: "94%",
      trend: "up",
      trendValue: "+2%",
      icon: "CheckCircle2",
      status: "excellent",
      description: "Regulatory compliance across ISO 27001, SOC 2, GDPR, and NIST frameworks"
    },
    {
      title: "Risk Assessment",
      value: "Medium",
      trend: "stable",
      trendValue: "0%",
      icon: "AlertTriangle",
      status: "warning",
      description: "Current risk exposure with 3 high-priority items requiring executive attention"
    },
    {
      title: "Budget Utilization",
      value: "78%",
      trend: "up",
      trendValue: "+5%",
      icon: "DollarSign",
      status: "good",
      description: "Security budget allocation efficiency with strong ROI on threat prevention investments"
    },
    {
      title: "Team Performance",
      value: "92%",
      trend: "up",
      trendValue: "+4%",
      icon: "Users",
      status: "excellent",
      description: "SOC team effectiveness metrics including response quality and training completion"
    }
  ];

  // Mock chart data for Security Investment ROI
  const roiData = [
    { name: 'Jan', value: 85, investment: 120, savings: 340 },
    { name: 'Feb', value: 88, investment: 115, savings: 380 },
    { name: 'Mar', value: 92, investment: 130, savings: 420 },
    { name: 'Apr', value: 87, investment: 125, savings: 390 },
    { name: 'May', value: 94, investment: 140, savings: 450 },
    { name: 'Jun', value: 91, investment: 135, savings: 430 },
    { name: 'Jul', value: 96, investment: 145, savings: 480 },
    { name: 'Aug', value: 93, investment: 138, savings: 460 },
    { name: 'Sep', value: 97, investment: 150, savings: 510 }
  ];

  // Mock threat landscape evolution data
  const threatData = [
    { name: 'Q1', malware: 45, phishing: 32, ransomware: 18, insider: 12 },
    { name: 'Q2', malware: 38, phishing: 41, ransomware: 22, insider: 15 },
    { name: 'Q3', malware: 42, phishing: 38, ransomware: 28, insider: 18 },
    { name: 'Q4', malware: 35, phishing: 45, ransomware: 25, insider: 14 }
  ];

  // Mock incident response effectiveness data
  const responseData = [
    { name: 'Week 1', detection: 95, containment: 88, recovery: 92 },
    { name: 'Week 2', detection: 97, containment: 91, recovery: 89 },
    { name: 'Week 3', detection: 93, containment: 94, recovery: 95 },
    { name: 'Week 4', detection: 98, containment: 89, recovery: 91 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    console.log('Period changed to:', period);
  };

  const handleExport = (format, period) => {
    console.log(`Exporting ${format} for ${period} period`);
    // Mock export functionality
    alert(`Exporting executive dashboard as ${format?.toUpperCase()} for ${period} period`);
  };

  const handleLogout = () => {
    console.log('Executive logout');
    // Mock logout functionality
  };

  return (
    <>
      <Helmet>
        <title>Executive Security Dashboard - Aegis Command</title>
        <meta name="description" content="Executive overview of security posture, compliance status, and strategic threat intelligence for informed decision making" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header 
          currentUser={currentUser}
          connectionStatus={connectionStatus}
          onLogout={handleLogout}
        />

        <main className="pt-28 pb-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Executive Security Dashboard</h1>
                  <p className="text-muted-foreground">Strategic security posture overview for executive decision support</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Last Updated</div>
                  <div className="text-lg font-mono text-foreground">
                    {currentTime?.toLocaleTimeString('en-US', { hour12: false })}
                  </div>
                </div>
              </div>

              <TimePeriodSelector 
                onPeriodChange={handlePeriodChange}
                onExport={handleExport}
              />
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {kpiData?.map((kpi, index) => (
                <SecurityPostureCard
                  key={index}
                  title={kpi?.title}
                  value={kpi?.value}
                  trend={kpi?.trend}
                  trendValue={kpi?.trendValue}
                  icon={kpi?.icon}
                  status={kpi?.status}
                  description={kpi?.description}
                />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
              {/* Main Visualization Area */}
              <div className="lg:col-span-8 space-y-6">
                <ExecutiveChart
                  type="area"
                  data={roiData}
                  title="Security Investment ROI"
                  dataKey="value"
                  height={350}
                  color="#00f0ff"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ExecutiveChart
                    type="bar"
                    data={threatData}
                    title="Threat Landscape Evolution"
                    dataKey="malware"
                    height={250}
                    color="#facc15"
                  />
                  
                  <ExecutiveChart
                    type="line"
                    data={responseData}
                    title="Incident Response Effectiveness"
                    dataKey="detection"
                    height={250}
                    color="#22c55e"
                  />
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <RiskHeatMap />
                <ComplianceStatus />
              </div>
            </div>

            {/* Bottom Section - Industry Benchmark */}
            <div className="mb-8">
              <IndustryBenchmark />
            </div>

            {/* Executive Summary Footer */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Executive Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success mb-2">Strong</div>
                  <div className="text-sm text-muted-foreground">Overall Security Posture</div>
                  <div className="text-xs text-muted-foreground mt-1">Above industry benchmark</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">3</div>
                  <div className="text-sm text-muted-foreground">Items Requiring Attention</div>
                  <div className="text-xs text-muted-foreground mt-1">Medium priority actions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent mb-2">$2.4M</div>
                  <div className="text-sm text-muted-foreground">Estimated Annual Savings</div>
                  <div className="text-xs text-muted-foreground mt-1">From threat prevention</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ExecutiveSecurityDashboard;