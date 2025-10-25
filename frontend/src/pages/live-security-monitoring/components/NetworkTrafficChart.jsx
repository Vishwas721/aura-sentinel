import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NetworkTrafficChart = ({ className = '' }) => {
  const [trafficData, setTrafficData] = useState([]);
  const [timeRange, setTimeRange] = useState('1h');
  const [selectedMetric, setSelectedMetric] = useState('bandwidth');
  const [isZoomed, setIsZoomed] = useState(false);
  const [anomalyThreshold, setAnomalyThreshold] = useState(85);

  const timeRanges = {
    '15m': { label: '15 Minutes', points: 15, interval: 60000 },
    '1h': { label: '1 Hour', points: 30, interval: 120000 },
    '6h': { label: '6 Hours', points: 36, interval: 600000 },
    '24h': { label: '24 Hours', points: 48, interval: 1800000 }
  };

  const metrics = {
    bandwidth: { 
      label: 'Bandwidth Usage', 
      color: '#00f0ff', 
      unit: 'Mbps',
      threshold: 85 
    },
    connections: { 
      label: 'Active Connections', 
      color: '#facc15', 
      unit: 'conn',
      threshold: 1000 
    },
    packets: { 
      label: 'Packet Rate', 
      color: '#22c55e', 
      unit: 'pps',
      threshold: 50000 
    },
    latency: { 
      label: 'Network Latency', 
      color: '#ff4d4d', 
      unit: 'ms',
      threshold: 100 
    }
  };

  const generateMockData = () => {
    const range = timeRanges?.[timeRange];
    const now = new Date();
    const data = [];

    for (let i = range?.points - 1; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - (i * range.interval));
      const baseValue = Math.random() * 60 + 20;
      const anomalyChance = Math.random();
      
      // Create occasional anomalies
      const isAnomaly = anomalyChance > 0.92;
      const value = isAnomaly ? baseValue + Math.random() * 40 + 30 : baseValue;

      data?.push({
        time: timestamp?.toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        timestamp: timestamp,
        bandwidth: selectedMetric === 'bandwidth' ? value : Math.random() * 100 + 10,
        connections: selectedMetric === 'connections' ? value * 15 : Math.random() * 1500 + 200,
        packets: selectedMetric === 'packets' ? value * 800 : Math.random() * 60000 + 5000,
        latency: selectedMetric === 'latency' ? Math.max(5, 120 - value) : Math.random() * 80 + 10,
        isAnomaly: isAnomaly
      });
    }

    return data;
  };

  useEffect(() => {
    const updateData = () => {
      setTrafficData(generateMockData());
    };

    updateData();
    const interval = setInterval(updateData, 2000);

    return () => clearInterval(interval);
  }, [timeRange, selectedMetric]);

  const currentMetric = metrics?.[selectedMetric];
  const latestValue = trafficData?.length > 0 ? trafficData?.[trafficData?.length - 1]?.[selectedMetric] : 0;
  const isAnomalous = latestValue > currentMetric?.threshold;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 cyber-shadow-sm">
          <p className="text-sm font-medium text-foreground mb-1">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between space-x-4">
              <span className="text-xs text-muted-foreground">{currentMetric?.label}:</span>
              <span className={`text-sm font-mono ${data?.isAnomaly ? 'text-warning' : 'text-foreground'}`}>
                {payload?.[0]?.value?.toFixed(1)} {currentMetric?.unit}
              </span>
            </div>
            {data?.isAnomaly && (
              <div className="flex items-center space-x-1 text-warning">
                <Icon name="AlertTriangle" size={12} />
                <span className="text-xs">Anomaly Detected</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  const getAnomalyCount = () => {
    return trafficData?.filter(point => point?.isAnomaly)?.length;
  };

  return (
    <div className={`bg-card rounded-lg border border-border ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Activity" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Network Traffic Analysis</h3>
          {isAnomalous && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-warning/10 rounded-md">
              <Icon name="AlertTriangle" size={14} className="text-warning" />
              <span className="text-xs text-warning font-medium">ANOMALY</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={isZoomed ? "default" : "outline"}
            size="sm"
            iconName={isZoomed ? "ZoomOut" : "ZoomIn"}
            iconPosition="left"
            onClick={handleZoomToggle}
          >
            {isZoomed ? 'Zoom Out' : 'Zoom In'}
          </Button>
        </div>
      </div>
      {/* Controls */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Metric:</span>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e?.target?.value)}
              className="px-3 py-1 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {Object.entries(metrics)?.map(([key, metric]) => (
                <option key={key} value={key}>{metric?.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Time Range:</span>
            <div className="flex space-x-1">
              {Object.entries(timeRanges)?.map(([key, range]) => (
                <button
                  key={key}
                  onClick={() => setTimeRange(key)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    timeRange === key
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {range?.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Current Stats */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-foreground">
              {latestValue?.toFixed(1)}
            </div>
            <div className="text-xs text-muted-foreground">
              Current {currentMetric?.unit}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-primary">
              {currentMetric?.threshold}
            </div>
            <div className="text-xs text-muted-foreground">
              Threshold {currentMetric?.unit}
            </div>
          </div>
          
          <div className="text-center">
            <div className={`text-2xl font-mono font-bold ${getAnomalyCount() > 0 ? 'text-warning' : 'text-success'}`}>
              {getAnomalyCount()}
            </div>
            <div className="text-xs text-muted-foreground">
              Anomalies Detected
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-accent">
              {((latestValue / currentMetric?.threshold) * 100)?.toFixed(0)}%
            </div>
            <div className="text-xs text-muted-foreground">
              Threshold Usage
            </div>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="p-4">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                domain={isZoomed ? ['dataMin', 'dataMax'] : [0, 'dataMax']}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Threshold line */}
              <ReferenceLine 
                y={currentMetric?.threshold} 
                stroke="#ff4d4d" 
                strokeDasharray="5 5"
                strokeWidth={2}
              />
              
              {/* Main data line */}
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke={currentMetric?.color}
                strokeWidth={2}
                dot={(props) => {
                  const { payload } = props;
                  if (payload && payload?.isAnomaly) {
                    return (
                      <circle
                        cx={props?.cx}
                        cy={props?.cy}
                        r={4}
                        fill="#ff4d4d"
                        stroke="#ff4d4d"
                        strokeWidth={2}
                        className="animate-pulse-data"
                      />
                    );
                  }
                  return null;
                }}
                activeDot={{ 
                  r: 4, 
                  fill: currentMetric?.color,
                  stroke: currentMetric?.color,
                  strokeWidth: 2
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between p-3 border-t border-border text-xs text-muted-foreground">
        <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Normal Traffic</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-warning rounded-full animate-pulse-data"></div>
            <span>Anomaly</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-destructive rounded-full"></div>
            <span>Threshold</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkTrafficChart;