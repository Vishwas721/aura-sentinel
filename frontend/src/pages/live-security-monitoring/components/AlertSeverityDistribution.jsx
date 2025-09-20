import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertSeverityDistribution = ({ className = '' }) => {
  const [alertData, setAlertData] = useState([]);
  const [selectedSeverity, setSelectedSeverity] = useState(null);
  const [timeFilter, setTimeFilter] = useState('24h');

  const severityConfig = {
    critical: { 
      color: '#ff4d4d', 
      icon: 'AlertTriangle', 
      label: 'Critical',
      description: 'Immediate action required'
    },
    high: { 
      color: '#ff8c00', 
      icon: 'AlertCircle', 
      label: 'High',
      description: 'Urgent attention needed'
    },
    medium: { 
      color: '#facc15', 
      icon: 'Info', 
      label: 'Medium',
      description: 'Monitor closely'
    },
    low: { 
      color: '#22c55e', 
      icon: 'CheckCircle', 
      label: 'Low',
      description: 'Routine monitoring'
    },
    info: { 
      color: '#00f0ff', 
      icon: 'Info', 
      label: 'Info',
      description: 'Informational only'
    }
  };

  const timeFilters = {
    '1h': { label: '1 Hour', multiplier: 0.1 },
    '6h': { label: '6 Hours', multiplier: 0.4 },
    '24h': { label: '24 Hours', multiplier: 1 },
    '7d': { label: '7 Days', multiplier: 7 }
  };

  const generateMockData = () => {
    const multiplier = timeFilters?.[timeFilter]?.multiplier;
    
    return [
      {
        severity: 'critical',
        count: Math.floor((Math.random() * 15 + 5) * multiplier),
        resolved: Math.floor((Math.random() * 8 + 2) * multiplier),
        pending: Math.floor((Math.random() * 10 + 3) * multiplier)
      },
      {
        severity: 'high',
        count: Math.floor((Math.random() * 25 + 15) * multiplier),
        resolved: Math.floor((Math.random() * 18 + 8) * multiplier),
        pending: Math.floor((Math.random() * 15 + 5) * multiplier)
      },
      {
        severity: 'medium',
        count: Math.floor((Math.random() * 40 + 25) * multiplier),
        resolved: Math.floor((Math.random() * 30 + 15) * multiplier),
        pending: Math.floor((Math.random() * 20 + 8) * multiplier)
      },
      {
        severity: 'low',
        count: Math.floor((Math.random() * 60 + 30) * multiplier),
        resolved: Math.floor((Math.random() * 45 + 20) * multiplier),
        pending: Math.floor((Math.random() * 25 + 10) * multiplier)
      },
      {
        severity: 'info',
        count: Math.floor((Math.random() * 80 + 40) * multiplier),
        resolved: Math.floor((Math.random() * 65 + 30) * multiplier),
        pending: Math.floor((Math.random() * 30 + 10) * multiplier)
      }
    ];
  };

  useEffect(() => {
    const updateData = () => {
      setAlertData(generateMockData());
    };

    updateData();
    const interval = setInterval(updateData, 5000);

    return () => clearInterval(interval);
  }, [timeFilter]);

  const getTotalAlerts = () => {
    return alertData?.reduce((sum, item) => sum + item?.count, 0);
  };

  const getResolvedAlerts = () => {
    return alertData?.reduce((sum, item) => sum + item?.resolved, 0);
  };

  const getPendingAlerts = () => {
    return alertData?.reduce((sum, item) => sum + item?.pending, 0);
  };

  const handleSeverityClick = (severity) => {
    setSelectedSeverity(selectedSeverity === severity ? null : severity);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      const config = severityConfig?.[data?.severity];
      
      return (
        <div className="bg-popover border border-border rounded-lg p-3 cyber-shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={config?.icon} size={16} style={{ color: config?.color }} />
            <span className="font-medium text-foreground">{config?.label} Alerts</span>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between space-x-4">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-mono text-foreground">{data?.count}</span>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="text-muted-foreground">Resolved:</span>
              <span className="font-mono text-success">{data?.resolved}</span>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="text-muted-foreground">Pending:</span>
              <span className="font-mono text-warning">{data?.pending}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">{config?.description}</p>
        </div>
      );
    }
    return null;
  };

  const CustomBar = (props) => {
    const { payload } = props;
    const isSelected = selectedSeverity === payload?.severity;
    const config = severityConfig?.[payload?.severity];
    
    return (
      <rect
        {...props}
        fill={config?.color}
        opacity={isSelected ? 1 : 0.8}
        stroke={isSelected ? config?.color : 'none'}
        strokeWidth={isSelected ? 2 : 0}
        className={`cursor-pointer transition-all duration-200 ${isSelected ? 'animate-glow-cyan' : ''}`}
        onClick={() => handleSeverityClick(payload?.severity)}
      />
    );
  };

  return (
    <div className={`bg-card rounded-lg border border-border ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Alert Severity Distribution</h3>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e?.target?.value)}
            className="px-3 py-1 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {Object.entries(timeFilters)?.map(([key, filter]) => (
              <option key={key} value={key}>{filter?.label}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Summary Stats */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-foreground">
              {getTotalAlerts()}
            </div>
            <div className="text-xs text-muted-foreground">Total Alerts</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-success">
              {getResolvedAlerts()}
            </div>
            <div className="text-xs text-muted-foreground">Resolved</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-warning">
              {getPendingAlerts()}
            </div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="p-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={alertData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis 
                dataKey="severity"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => severityConfig?.[value]?.label}
              />
              <YAxis 
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                shape={<CustomBar />}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Severity Legend */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(severityConfig)?.map(([severity, config]) => {
            const data = alertData?.find(item => item?.severity === severity);
            const isSelected = selectedSeverity === severity;
            
            return (
              <button
                key={severity}
                onClick={() => handleSeverityClick(severity)}
                className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                  isSelected 
                    ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name={config?.icon} size={16} style={{ color: config?.color }} />
                  <span className="text-sm font-medium text-foreground">{config?.label}</span>
                  {data && (
                    <span className="ml-auto text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground font-mono">
                      {data?.count}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{config?.description}</p>
              </button>
            );
          })}
        </div>
      </div>
      {/* Selected Severity Details */}
      {selectedSeverity && (
        <div className="p-4 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-foreground">
              {severityConfig?.[selectedSeverity]?.label} Alert Details
            </h4>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={() => setSelectedSeverity(null)}
            >
              Close
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {alertData?.filter(item => item?.severity === selectedSeverity)?.map((item) => (
                <React.Fragment key={item?.severity}>
                  <div>
                    <span className="text-muted-foreground">Total Count:</span>
                    <div className="font-mono font-bold text-foreground">{item?.count}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Resolved:</span>
                    <div className="font-mono font-bold text-success">{item?.resolved}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Pending:</span>
                    <div className="font-mono font-bold text-warning">{item?.pending}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Resolution Rate:</span>
                    <div className="font-mono font-bold text-primary">
                      {((item?.resolved / item?.count) * 100)?.toFixed(1)}%
                    </div>
                  </div>
                </React.Fragment>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertSeverityDistribution;