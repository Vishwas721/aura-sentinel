import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemControlPanel = ({ className = '' }) => {
  const [refreshInterval, setRefreshInterval] = useState(2);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [alertsSilenced, setAlertsSilenced] = useState(false);
  const [systemStatus, setSystemStatus] = useState('operational');
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [connectionHealth, setConnectionHealth] = useState({
    siem: 'connected',
    firewall: 'connected',
    ids: 'connected',
    endpoints: 'connected'
  });

  const refreshIntervals = [
    { value: 2, label: '2 seconds' },
    { value: 5, label: '5 seconds' },
    { value: 10, label: '10 seconds' },
    { value: 30, label: '30 seconds' }
  ];

  const statusConfig = {
    operational: { color: 'text-success', bg: 'bg-success/10', icon: 'CheckCircle2', label: 'Operational' },
    degraded: { color: 'text-warning', bg: 'bg-warning/10', icon: 'AlertTriangle', label: 'Degraded' },
    critical: { color: 'text-destructive', bg: 'bg-destructive/10', icon: 'XCircle', label: 'Critical' },
    maintenance: { color: 'text-accent', bg: 'bg-accent/10', icon: 'Settings', label: 'Maintenance' }
  };

  const connectionConfig = {
    connected: { color: 'text-success', icon: 'Wifi', label: 'Connected' },
    connecting: { color: 'text-accent', icon: 'Loader2', label: 'Connecting', animate: 'animate-spin' },
    disconnected: { color: 'text-destructive', icon: 'WifiOff', label: 'Disconnected' },
    error: { color: 'text-warning', icon: 'AlertTriangle', label: 'Error' }
  };

  useEffect(() => {
    if (isAutoRefresh) {
      const interval = setInterval(() => {
        setLastRefresh(new Date());
        
        // Simulate occasional connection issues
        if (Math.random() > 0.95) {
          const connections = Object.keys(connectionHealth);
          const randomConnection = connections?.[Math.floor(Math.random() * connections?.length)];
          const statuses = ['connecting', 'error', 'connected'];
          const randomStatus = statuses?.[Math.floor(Math.random() * statuses?.length)];
          
          setConnectionHealth(prev => ({
            ...prev,
            [randomConnection]: randomStatus
          }));
          
          // Reset to connected after a few seconds
          setTimeout(() => {
            setConnectionHealth(prev => ({
              ...prev,
              [randomConnection]: 'connected'
            }));
          }, 3000);
        }
      }, refreshInterval * 1000);

      return () => clearInterval(interval);
    }
  }, [isAutoRefresh, refreshInterval, connectionHealth]);

  const handleManualRefresh = () => {
    setLastRefresh(new Date());
  };

  const handleEmergencyStop = () => {
    setIsAutoRefresh(false);
    setSystemStatus('maintenance');
    setTimeout(() => {
      setSystemStatus('operational');
    }, 5000);
  };

  const toggleAlertSilence = () => {
    setAlertsSilenced(!alertsSilenced);
  };

  const formatLastRefresh = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return date?.toLocaleTimeString();
  };

  const getOverallHealth = () => {
    const statuses = Object.values(connectionHealth);
    if (statuses?.every(s => s === 'connected')) return 'healthy';
    if (statuses?.some(s => s === 'error' || s === 'disconnected')) return 'degraded';
    return 'warning';
  };

  const overallHealth = getOverallHealth();
  const currentStatus = statusConfig?.[systemStatus];

  return (
    <div className={`bg-card rounded-lg border border-border ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Settings" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">System Control Panel</h3>
        </div>
        
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-md ${currentStatus?.bg}`}>
          <Icon name={currentStatus?.icon} size={16} className={currentStatus?.color} />
          <span className={`text-sm font-medium ${currentStatus?.color}`}>
            {currentStatus?.label}
          </span>
        </div>
      </div>
      {/* Auto Refresh Controls */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Auto Refresh Settings</h4>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">
              Last: {formatLastRefresh(lastRefresh)}
            </span>
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={handleManualRefresh}
              disabled={!isAutoRefresh}
            >
              Refresh
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center space-x-3">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAutoRefresh}
                onChange={(e) => setIsAutoRefresh(e?.target?.checked)}
                className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary/20 focus:ring-2"
              />
              <span className="text-sm text-foreground">Auto Refresh</span>
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Interval:</span>
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e?.target?.value))}
              disabled={!isAutoRefresh}
              className="px-3 py-1 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
            >
              {refreshIntervals?.map(interval => (
                <option key={interval?.value} value={interval?.value}>
                  {interval?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Connection Status */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Data Source Connections</h4>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries({
            'SIEM': connectionHealth?.siem,
            'Firewall': connectionHealth?.firewall,
            'IDS/IPS': connectionHealth?.ids,
            'Endpoints': connectionHealth?.endpoints
          })?.map(([source, status]) => {
            const config = connectionConfig?.[status];
            return (
              <div key={source} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                <span className="text-sm text-foreground">{source}</span>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={config?.icon} 
                    size={14} 
                    className={`${config?.color} ${config?.animate || ''}`} 
                  />
                  <span className={`text-xs ${config?.color}`}>{config?.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Alert Controls */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Alert Management</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant={alertsSilenced ? "destructive" : "outline"}
            size="sm"
            iconName={alertsSilenced ? "VolumeX" : "Volume2"}
            iconPosition="left"
            onClick={toggleAlertSilence}
          >
            {alertsSilenced ? 'Alerts Silenced' : 'Silence Alerts'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            iconName="AlertTriangle"
            iconPosition="left"
          >
            View All Alerts
          </Button>
        </div>

        {alertsSilenced && (
          <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={14} className="text-warning" />
              <span className="text-xs text-warning font-medium">
                Alert notifications are currently silenced
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Emergency Controls */}
      <div className="p-4">
        <h4 className="text-sm font-medium text-foreground mb-3">Emergency Controls</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="destructive"
            size="sm"
            iconName="Square"
            iconPosition="left"
            onClick={handleEmergencyStop}
          >
            Emergency Stop
          </Button>

          <Button
            variant="outline"
            size="sm"
            iconName="Shield"
            iconPosition="left"
          >
            Incident Response
          </Button>

          <Button
            variant="outline"
            size="sm"
            iconName="Phone"
            iconPosition="left"
          >
            Contact SOC
          </Button>
        </div>
      </div>
      {/* System Health Indicator */}
      <div className="p-3 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              overallHealth === 'healthy' ? 'bg-success animate-pulse-data' :
              overallHealth === 'warning'? 'bg-warning animate-pulse-data' : 'bg-destructive animate-pulse-data'
            }`}></div>
            <span className="text-xs text-muted-foreground">
              System Health: {overallHealth === 'healthy' ? 'Optimal' : overallHealth === 'warning' ? 'Warning' : 'Critical'}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-mono">
              {new Date()?.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemControlPanel;