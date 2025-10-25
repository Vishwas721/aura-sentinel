import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GlobalFilters = ({ 
  onFiltersChange = () => {},
  className = '' 
}) => {
  const [activeFilters, setActiveFilters] = useState({
    severity: 'all',
    timeRange: '1h',
    alertStatus: 'all',
    region: 'global'
  });

  const [isLiveConnected, setIsLiveConnected] = useState(true);

  const severityOptions = [
    { value: 'all', label: 'All Severities', color: 'text-foreground' },
    { value: 'critical', label: 'Critical', color: 'text-destructive' },
    { value: 'high', label: 'High', color: 'text-warning' },
    { value: 'medium', label: 'Medium', color: 'text-accent' },
    { value: 'low', label: 'Low', color: 'text-success' }
  ];

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const alertStatusOptions = [
    { value: 'all', label: 'All Alerts' },
    { value: 'active', label: 'Active' },
    { value: 'investigating', label: 'Investigating' },
    { value: 'resolved', label: 'Resolved' }
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleLiveConnection = () => {
    setIsLiveConnected(!isLiveConnected);
  };

  return (
    <div className={`bg-card/50 border-b border-border p-4 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left Side - Filters */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Severity Filter */}
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-muted-foreground" />
            <select
              value={activeFilters?.severity}
              onChange={(e) => handleFilterChange('severity', e?.target?.value)}
              className="bg-input border border-border rounded-md px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {severityOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Time Range Filter */}
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <select
              value={activeFilters?.timeRange}
              onChange={(e) => handleFilterChange('timeRange', e?.target?.value)}
              className="bg-input border border-border rounded-md px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {timeRangeOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Alert Status Filter */}
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <select
              value={activeFilters?.alertStatus}
              onChange={(e) => handleFilterChange('alertStatus', e?.target?.value)}
              className="bg-input border border-border rounded-md px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {alertStatusOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Side - Live Connection & Controls */}
        <div className="flex items-center space-x-4">
          {/* Live Connection Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isLiveConnected ? 'bg-success animate-pulse-data' : 'bg-destructive'}`}></div>
            <span className={`text-sm font-medium ${isLiveConnected ? 'text-success' : 'text-destructive'}`}>
              {isLiveConnected ? 'LIVE' : 'DISCONNECTED'}
            </span>
          </div>

          {/* Connection Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLiveConnection}
            iconName={isLiveConnected ? "Pause" : "Play"}
            iconPosition="left"
            className="contextual-glow"
          >
            {isLiveConnected ? 'Pause' : 'Resume'}
          </Button>

          {/* Refresh Button */}
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            className="contextual-glow"
          >
            Refresh
          </Button>

          {/* Export Button */}
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            className="contextual-glow"
          >
            Export
          </Button>
        </div>
      </div>
      {/* Active Filters Display */}
      {(activeFilters?.severity !== 'all' || activeFilters?.alertStatus !== 'all') && (
        <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {activeFilters?.severity !== 'all' && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/20">
              Severity: {severityOptions?.find(s => s?.value === activeFilters?.severity)?.label}
            </span>
          )}
          {activeFilters?.alertStatus !== 'all' && (
            <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md border border-accent/20">
              Status: {alertStatusOptions?.find(s => s?.value === activeFilters?.alertStatus)?.label}
            </span>
          )}
          <Button
            variant="ghost"
            size="xs"
            onClick={() => {
              const resetFilters = { severity: 'all', timeRange: '1h', alertStatus: 'all', region: 'global' };
              setActiveFilters(resetFilters);
              onFiltersChange(resetFilters);
            }}
            iconName="X"
            iconPosition="left"
            className="text-xs"
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};

export default GlobalFilters;