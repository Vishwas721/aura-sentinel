import React, { useState } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreatVolumeChart = ({ className = '' }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('volume');

  const chartData = [
    {
      date: '2025-09-14',
      volume: 245,
      critical: 12,
      high: 45,
      medium: 98,
      low: 90,
      severity_trend: 3.2
    },
    {
      date: '2025-09-15',
      volume: 312,
      critical: 18,
      high: 67,
      medium: 127,
      low: 100,
      severity_trend: 4.1
    },
    {
      date: '2025-09-16',
      volume: 289,
      critical: 15,
      high: 58,
      medium: 116,
      low: 100,
      severity_trend: 3.8
    },
    {
      date: '2025-09-17',
      volume: 367,
      critical: 22,
      high: 78,
      medium: 145,
      low: 122,
      severity_trend: 4.5
    },
    {
      date: '2025-09-18',
      volume: 423,
      critical: 28,
      high: 89,
      medium: 167,
      low: 139,
      severity_trend: 5.2
    },
    {
      date: '2025-09-19',
      volume: 398,
      critical: 25,
      high: 82,
      medium: 156,
      low: 135,
      severity_trend: 4.8
    },
    {
      date: '2025-09-20',
      volume: 445,
      critical: 31,
      high: 95,
      medium: 178,
      low: 141,
      severity_trend: 5.6
    }
  ];

  const timeframeOptions = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const metricOptions = [
    { value: 'volume', label: 'Total Volume', icon: 'BarChart3' },
    { value: 'severity', label: 'Severity Breakdown', icon: 'AlertTriangle' },
    { value: 'trend', label: 'Trend Analysis', icon: 'TrendingUp' }
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 cyber-shadow-md">
          <p className="text-sm font-medium text-foreground mb-2">
            {formatDate(label)}
          </p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4 text-xs">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-muted-foreground capitalize">
                  {entry?.dataKey?.replace('_', ' ')}
                </span>
              </div>
              <span className="font-medium text-foreground">
                {entry?.value}
                {entry?.dataKey === 'severity_trend' && '/10'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleDrillDown = (data, index) => {
    console.log('Drill down clicked:', data, index);
    // Implement drill-down functionality
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Threat Volume Analysis
          </h2>
          <p className="text-sm text-muted-foreground">
            Interactive threat volume trends with severity breakdown and drill-down capabilities
          </p>
        </div>

        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          {/* Timeframe Selector */}
          <div className="flex items-center space-x-1 bg-muted/30 rounded-lg p-1">
            {timeframeOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => setSelectedTimeframe(option?.value)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-150 ${
                  selectedTimeframe === option?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {option?.label}
              </button>
            ))}
          </div>

          {/* Metric Selector */}
          <div className="flex items-center space-x-1">
            {metricOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={selectedMetric === option?.value ? "default" : "ghost"}
                size="sm"
                iconName={option?.icon}
                iconPosition="left"
                onClick={() => setSelectedMetric(option?.value)}
                className="text-xs"
              >
                {option?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            onClick={handleDrillDown}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="#94a3b8"
              fontSize={12}
            />
            <YAxis 
              yAxisId="left"
              stroke="#94a3b8"
              fontSize={12}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              stroke="#94a3b8"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {selectedMetric === 'volume' && (
              <Bar 
                yAxisId="left"
                dataKey="volume" 
                fill="#00f0ff" 
                name="Total Threats"
                radius={[2, 2, 0, 0]}
                opacity={0.8}
              />
            )}
            
            {selectedMetric === 'severity' && (
              <>
                <Bar 
                  yAxisId="left"
                  dataKey="critical" 
                  stackId="severity"
                  fill="#ff4d4d" 
                  name="Critical"
                  radius={[0, 0, 0, 0]}
                />
                <Bar 
                  yAxisId="left"
                  dataKey="high" 
                  stackId="severity"
                  fill="#facc15" 
                  name="High"
                  radius={[0, 0, 0, 0]}
                />
                <Bar 
                  yAxisId="left"
                  dataKey="medium" 
                  stackId="severity"
                  fill="#00f0ff" 
                  name="Medium"
                  radius={[0, 0, 0, 0]}
                />
                <Bar 
                  yAxisId="left"
                  dataKey="low" 
                  stackId="severity"
                  fill="#22c55e" 
                  name="Low"
                  radius={[2, 2, 0, 0]}
                />
              </>
            )}
            
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="severity_trend" 
              stroke="#facc15" 
              strokeWidth={2}
              name="Severity Trend"
              dot={{ fill: '#facc15', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#facc15', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      {/* Chart Controls */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="MousePointer" size={12} />
            <span>Click bars to drill down</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Download" size={12} />
            <span>Export available</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Maximize2"
            iconPosition="left"
            className="text-xs"
          >
            Full Screen
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            className="text-xs"
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThreatVolumeChart;