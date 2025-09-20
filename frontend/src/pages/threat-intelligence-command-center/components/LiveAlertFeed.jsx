import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveAlertFeed = ({ className = '' }) => {
  const [alerts, setAlerts] = useState([]);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [filter, setFilter] = useState('all');
  const feedRef = useRef(null);

  const mockAlerts = [
    {
      id: 1,
      severity: 'critical',
      type: 'DDoS Attack',
      source: '203.45.67.89',
      target: 'web-server-01.company.com',
      description: 'High volume traffic detected from multiple sources targeting web infrastructure',
      timestamp: new Date(Date.now() - 30000),
      status: 'active',
      location: 'Beijing, China'
    },
    {
      id: 2,
      severity: 'high',
      type: 'Malware Detection',
      source: '192.168.1.45',
      target: 'workstation-23',
      description: 'Trojan.Win32.Agent detected in system memory, attempting data exfiltration',
      timestamp: new Date(Date.now() - 120000),
      status: 'investigating',
      location: 'Internal Network'
    },
    {
      id: 3,
      severity: 'medium',
      type: 'Suspicious Login',
      source: '45.123.78.90',
      target: 'admin-portal',
      description: 'Multiple failed login attempts from unusual geographic location',
      timestamp: new Date(Date.now() - 180000),
      status: 'active',
      location: 'Moscow, Russia'
    },
    {
      id: 4,
      severity: 'high',
      type: 'Data Exfiltration',
      source: '10.0.2.15',
      target: 'database-server-02',
      description: 'Unusual outbound data transfer patterns detected, potential data breach',
      timestamp: new Date(Date.now() - 240000),
      status: 'investigating',
      location: 'Internal Network'
    },
    {
      id: 5,
      severity: 'low',
      type: 'Port Scan',
      source: '156.78.90.12',
      target: '10.0.1.0/24',
      description: 'Systematic port scanning detected across network range',
      timestamp: new Date(Date.now() - 300000),
      status: 'resolved',
      location: 'Tokyo, Japan'
    }
  ];

  const severityConfig = {
    critical: {
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/30',
      icon: 'AlertTriangle'
    },
    high: {
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/30',
      icon: 'AlertCircle'
    },
    medium: {
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/30',
      icon: 'Info'
    },
    low: {
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/30',
      icon: 'CheckCircle'
    }
  };

  const statusConfig = {
    active: { color: 'text-destructive', label: 'Active' },
    investigating: { color: 'text-warning', label: 'Investigating' },
    resolved: { color: 'text-success', label: 'Resolved' }
  };

  useEffect(() => {
    // Initialize with mock data
    setAlerts(mockAlerts);

    // Simulate real-time alerts
    const interval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        severity: ['critical', 'high', 'medium', 'low']?.[Math.floor(Math.random() * 4)],
        type: ['DDoS Attack', 'Malware Detection', 'Suspicious Login', 'Port Scan', 'Data Breach']?.[Math.floor(Math.random() * 5)],
        source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        target: ['web-server-01', 'database-server-02', 'admin-portal', 'workstation-' + Math.floor(Math.random() * 100)]?.[Math.floor(Math.random() * 4)],
        description: `Real-time threat detected requiring immediate attention from security operations team`,
        timestamp: new Date(),
        status: 'active',
        location: ['Beijing, China', 'Moscow, Russia', 'London, UK', 'New York, US']?.[Math.floor(Math.random() * 4)]
      };

      setAlerts(prev => [newAlert, ...prev?.slice(0, 49)]); // Keep last 50 alerts
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isAutoScroll && feedRef?.current) {
      feedRef.current.scrollTop = 0;
    }
  }, [alerts, isAutoScroll]);

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date?.toLocaleDateString();
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts?.filter(alert => alert?.severity === filter);

  return (
    <div className={`bg-card rounded-lg border border-border cyber-shadow-md ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Live Alert Feed</h2>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-data"></div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Severity Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e?.target?.value)}
            className="bg-input border border-border rounded-md px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          {/* Auto-scroll Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAutoScroll(!isAutoScroll)}
            iconName={isAutoScroll ? "Pause" : "Play"}
            iconPosition="left"
            className={`text-xs ${isAutoScroll ? 'text-success' : 'text-muted-foreground'}`}
          >
            Auto
          </Button>
        </div>
      </div>
      {/* Alert Feed */}
      <div 
        ref={feedRef}
        className="h-96 overflow-y-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-border"
      >
        {filteredAlerts?.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <Icon name="Shield" size={48} className="mx-auto mb-2 opacity-50" />
              <p>No alerts matching current filter</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2 p-4">
            {filteredAlerts?.map((alert) => {
              const config = severityConfig?.[alert?.severity];
              const statusInfo = statusConfig?.[alert?.status];
              
              return (
                <div
                  key={alert?.id}
                  className={`p-3 rounded-lg border ${config?.borderColor} ${config?.bgColor} hover:bg-opacity-80 transition-all duration-150 cursor-pointer`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name={config?.icon} size={16} className={config?.color} />
                      <span className={`text-sm font-medium ${config?.color} uppercase tracking-wide`}>
                        {alert?.severity}
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {alert?.type}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-md ${statusInfo?.color} bg-current bg-opacity-10`}>
                        {statusInfo?.label}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {formatTimestamp(alert?.timestamp)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {alert?.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Source: </span>
                      <span className="font-mono text-foreground">{alert?.source}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Target: </span>
                      <span className="font-mono text-foreground">{alert?.target}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Location: </span>
                      <span className="text-foreground">{alert?.location}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between p-3 border-t border-border bg-muted/20">
        <div className="text-xs text-muted-foreground">
          Showing {filteredAlerts?.length} of {alerts?.length} alerts
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse-data"></div>
          <span className="text-xs text-success font-medium">Live Feed Active</span>
        </div>
      </div>
    </div>
  );
};

export default LiveAlertFeed;