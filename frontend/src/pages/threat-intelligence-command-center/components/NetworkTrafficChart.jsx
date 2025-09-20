import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NetworkTrafficChart = ({ className = '' }) => {
  const [trafficData, setTrafficData] = useState([]);
  const [chartType, setChartType] = useState('area');
  const [timeRange, setTimeRange] = useState('1h');

  // Generate mock traffic data
  const generateTrafficData = () => {
    const now = new Date();
    const data = [];
    const points = timeRange === '1h' ? 60 : timeRange === '6h' ? 72 : 144;
    const interval = timeRange === '1h' ? 60000 : timeRange === '6h' ? 300000 : 600000;

    for (let i = points; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - (i * interval));
      const baseTraffic = 45 + Math.sin(i * 0.1) * 15;
      const anomalySpike = Math.random() > 0.95 ? Math.random() * 40 : 0;
      
      data?.push({
        time: timestamp?.toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        timestamp: timestamp,
        inbound: Math.max(0, baseTraffic + Math.random() * 20 + anomalySpike),
        outbound: Math.max(0, baseTraffic * 0.7 + Math.random() * 15),
        anomalies: anomalySpike > 0 ? 1 : 0,
        bandwidth: Math.max(0, baseTraffic + Math.random() * 25 + anomalySpike * 0.8)
      });
    }
    
    return data;
  };

  useEffect(() => {
    // Initial data load
    setTrafficData(generateTrafficData());

    // Real-time updates every 3 seconds
    const interval = setInterval(() => {
      setTrafficData(prev => {
        const newData = [...prev];
        const now = new Date();
        const baseTraffic = 45 + Math.sin(Date.now() * 0.0001) * 15;
        const anomalySpike = Math.random() > 0.95 ? Math.random() * 40 : 0;
        
        // Add new data point
        newData?.push({
          time: now?.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          timestamp: now,
          inbound: Math.max(0, baseTraffic + Math.random() * 20 + anomalySpike),
          outbound: Math.max(0, baseTraffic * 0.7 + Math.random() * 15),
          anomalies: anomalySpike > 0 ? 1 : 0,
          bandwidth: Math.max(0, baseTraffic + Math.random() * 25 + anomalySpike * 0.8)
        });
        
        // Keep only recent data points
        const maxPoints = timeRange === '1h' ? 60 : timeRange === '6h' ? 72 : 144;
        return newData?.slice(-maxPoints);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [timeRange]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 cyber-shadow-md">
          <p className="text-sm font-medium text-foreground mb-2">{`Time: ${label}`}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-sm text-muted-foreground capitalize">
                  {entry?.dataKey}:
                </span>
              </div>
              <span className="text-sm font-mono text-foreground">
                {entry?.value?.toFixed(1)} Mbps
              </span>
            </div>
          ))}
          {payload?.some(p => p?.payload?.anomalies > 0) && (
            <div className="mt-2 pt-2 border-t border-border">
              <div className="flex items-center space-x-1">
                <Icon name="AlertTriangle" size={12} className="text-warning" />
                <span className="text-xs text-warning">Anomaly Detected</span>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const getAverageTraffic = () => {
    if (trafficData?.length === 0) return { inbound: 0, outbound: 0 };
    const total = trafficData?.reduce((acc, curr) => ({
      inbound: acc?.inbound + curr?.inbound,
      outbound: acc?.outbound + curr?.outbound
    }), { inbound: 0, outbound: 0 });
    
    return {
      inbound: (total?.inbound / trafficData?.length)?.toFixed(1),
      outbound: (total?.outbound / trafficData?.length)?.toFixed(1)
    };
  };

  const getAnomalyCount = () => {
    return trafficData?.filter(d => d?.anomalies > 0)?.length;
  };

  const averages = getAverageTraffic();
  const anomalyCount = getAnomalyCount();

  return (
    <div className={`bg-card rounded-lg border border-border cyber-shadow-md ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Network Traffic Analysis</h2>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-data"></div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="bg-input border border-border rounded-md px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
          </select>
          
          {/* Chart Type Toggle */}
          <div className="flex items-center space-x-1 bg-muted/20 rounded-md p-1">
            <Button
              variant={chartType === 'area' ? 'default' : 'ghost'}
              size="xs"
              onClick={() => setChartType('area')}
              iconName="BarChart3"
            >
              Area
            </Button>
            <Button
              variant={chartType === 'line' ? 'default' : 'ghost'}
              size="xs"
              onClick={() => setChartType('line')}
              iconName="TrendingUp"
            >
              Line
            </Button>
          </div>
        </div>
      </div>
      {/* Statistics Bar */}
      <div className="grid grid-cols-4 gap-4 p-4 border-b border-border bg-muted/10">
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Avg Inbound</div>
          <div className="text-lg font-mono font-bold text-primary">{averages?.inbound} Mbps</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Avg Outbound</div>
          <div className="text-lg font-mono font-bold text-accent">{averages?.outbound} Mbps</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Anomalies</div>
          <div className={`text-lg font-mono font-bold ${anomalyCount > 0 ? 'text-warning' : 'text-success'}`}>
            {anomalyCount}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Status</div>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-data"></div>
            <span className="text-sm font-medium text-success">Live</span>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="p-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="inboundGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="outboundGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#facc15" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                  label={{ value: 'Mbps', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#94a3b8' } }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="inbound"
                  stroke="#00f0ff"
                  strokeWidth={2}
                  fill="url(#inboundGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="outbound"
                  stroke="#facc15"
                  strokeWidth={2}
                  fill="url(#outboundGradient)"
                />
              </AreaChart>
            ) : (
              <LineChart data={trafficData}>
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
                  label={{ value: 'Mbps', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#94a3b8' } }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="inbound"
                  stroke="#00f0ff"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, stroke: '#00f0ff', strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="outbound"
                  stroke="#facc15"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, stroke: '#facc15', strokeWidth: 2 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Inbound Traffic</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-sm text-muted-foreground">Outbound Traffic</span>
          </div>
          {anomalyCount > 0 && (
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={12} className="text-warning" />
              <span className="text-sm text-warning">Anomalies Detected</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkTrafficChart;