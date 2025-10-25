import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const SystemStatusBar = ({ 
  connectionStatus = {
    dataFeed: 'connected',
    threatIntel: 'connected',
    monitoring: 'connected',
    lastRefresh: new Date(),
    refreshInterval: 30,
    systemHealth: 'optimal'
  },
  className = ''
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeUntilRefresh, setTimeUntilRefresh] = useState(connectionStatus?.refreshInterval);

  const statusConfig = {
    connected: { 
      icon: 'Wifi', 
      color: 'text-success', 
      bgColor: 'bg-success/10',
      label: 'Connected'
    },
    connecting: { 
      icon: 'Loader2', 
      color: 'text-accent', 
      bgColor: 'bg-accent/10',
      label: 'Connecting',
      animate: 'animate-spin'
    },
    disconnected: { 
      icon: 'WifiOff', 
      color: 'text-destructive', 
      bgColor: 'bg-destructive/10',
      label: 'Disconnected'
    },
    error: { 
      icon: 'AlertTriangle', 
      color: 'text-warning', 
      bgColor: 'bg-warning/10',
      label: 'Error'
    }
  };

  const healthConfig = {
    optimal: { 
      icon: 'CheckCircle2', 
      color: 'text-success', 
      label: 'Optimal'
    },
    degraded: { 
      icon: 'AlertCircle', 
      color: 'text-accent', 
      label: 'Degraded'
    },
    critical: { 
      icon: 'XCircle', 
      color: 'text-destructive', 
      label: 'Critical'
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      const timeSinceRefresh = Math.floor((new Date() - connectionStatus?.lastRefresh) / 1000);
      const remaining = Math.max(0, connectionStatus?.refreshInterval - timeSinceRefresh);
      setTimeUntilRefresh(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [connectionStatus?.lastRefresh, connectionStatus?.refreshInterval]);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const formatRefreshTime = (seconds) => {
    if (seconds <= 0) return 'Refreshing...';
    return `${seconds}s`;
  };

  const getOverallStatus = () => {
    const statuses = [connectionStatus?.dataFeed, connectionStatus?.threatIntel, connectionStatus?.monitoring];
    if (statuses?.every(s => s === 'connected')) return 'connected';
    if (statuses?.some(s => s === 'error')) return 'error';
    if (statuses?.some(s => s === 'disconnected')) return 'disconnected';
    return 'connecting';
  };

  const overallStatus = getOverallStatus();
  const overallConfig = statusConfig?.[overallStatus];
  const healthInfo = healthConfig?.[connectionStatus?.systemHealth];

  return (
    <div className={`flex items-center space-x-4 px-4 py-2 bg-card/50 border-l border-border ${className}`}>
      {/* System Time */}
      <div className="hidden lg:flex items-center space-x-2">
        <Icon name="Clock" size={14} className="text-muted-foreground" />
        <span className="text-sm font-mono text-foreground">
          {formatTime(currentTime)}
        </span>
      </div>
      {/* Overall Connection Status */}
      <div className="flex items-center space-x-2">
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-md ${overallConfig?.bgColor}`}>
          <Icon 
            name={overallConfig?.icon} 
            size={14} 
            className={`${overallConfig?.color} ${overallConfig?.animate || ''}`} 
          />
          <span className={`text-xs font-medium ${overallConfig?.color}`}>
            {overallConfig?.label}
          </span>
        </div>
      </div>
      {/* Individual Service Status - Desktop Only */}
      <div className="hidden xl:flex items-center space-x-3">
        {Object.entries({
          'Data Feed': connectionStatus?.dataFeed,
          'Threat Intel': connectionStatus?.threatIntel,
          'Monitoring': connectionStatus?.monitoring
        })?.map(([service, status]) => {
          const config = statusConfig?.[status];
          return (
            <div key={service} className="flex items-center space-x-1" title={`${service}: ${config?.label}`}>
              <Icon 
                name={config?.icon} 
                size={12} 
                className={`${config?.color} ${config?.animate || ''}`} 
              />
              <span className="text-xs text-muted-foreground">{service}</span>
            </div>
          );
        })}
      </div>
      {/* System Health */}
      <div className="flex items-center space-x-1" title={`System Health: ${healthInfo?.label}`}>
        <Icon name={healthInfo?.icon} size={14} className={healthInfo?.color} />
        <span className={`text-xs font-medium ${healthInfo?.color}`}>
          {healthInfo?.label}
        </span>
      </div>
      {/* Refresh Status */}
      <div className="flex items-center space-x-1">
        <Icon name="RefreshCw" size={14} className="text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-mono">
          {formatRefreshTime(timeUntilRefresh)}
        </span>
      </div>
      {/* Live Data Indicator */}
      <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse-data"></div>
        <span className="text-xs text-primary font-medium">LIVE</span>
      </div>
    </div>
  );
};

export default SystemStatusBar;