import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const IndustryBenchmark = ({ className = '' }) => {
  const benchmarkData = [
    {
      metric: "Security Score",
      ourValue: 87,
      industryAvg: 72,
      topQuartile: 85,
      category: "Overall"
    },
    {
      metric: "Incident Response",
      ourValue: 92,
      industryAvg: 68,
      topQuartile: 82,
      category: "Response Time"
    },
    {
      metric: "Threat Detection",
      ourValue: 89,
      industryAvg: 75,
      topQuartile: 88,
      category: "Detection Rate"
    },
    {
      metric: "Compliance",
      ourValue: 94,
      industryAvg: 78,
      topQuartile: 90,
      category: "Adherence"
    },
    {
      metric: "Budget Efficiency",
      ourValue: 85,
      industryAvg: 70,
      topQuartile: 83,
      category: "ROI"
    }
  ];

  const chartData = benchmarkData?.map(item => ({
    name: item?.metric,
    'Our Performance': item?.ourValue,
    'Industry Average': item?.industryAvg,
    'Top Quartile': item?.topQuartile
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getPerformanceStatus = (ourValue, industryAvg, topQuartile) => {
    if (ourValue >= topQuartile) return { status: 'excellent', icon: 'TrendingUp', color: 'text-success' };
    if (ourValue >= industryAvg) return { status: 'good', icon: 'ArrowUp', color: 'text-primary' };
    return { status: 'needs-improvement', icon: 'ArrowDown', color: 'text-warning' };
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Industry Benchmark</h3>
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={16} className="text-primary" />
          <span className="text-xs text-muted-foreground">vs. Financial Services</span>
        </div>
      </div>
      <div className="mb-6" style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="Our Performance" fill="#00f0ff" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Industry Average" fill="#94a3b8" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Top Quartile" fill="#facc15" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        {benchmarkData?.map((item, index) => {
          const performance = getPerformanceStatus(item?.ourValue, item?.industryAvg, item?.topQuartile);
          const difference = item?.ourValue - item?.industryAvg;
          
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name={performance?.icon} size={16} className={performance?.color} />
                <div>
                  <h4 className="text-sm font-medium text-foreground">{item?.metric}</h4>
                  <p className="text-xs text-muted-foreground">{item?.category}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-foreground">{item?.ourValue}%</div>
                <div className={`text-xs ${difference >= 0 ? 'text-success' : 'text-warning'}`}>
                  {difference >= 0 ? '+' : ''}{difference}% vs avg
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-success">
              {benchmarkData?.filter(item => item?.ourValue >= item?.topQuartile)?.length}
            </div>
            <div className="text-xs text-muted-foreground">Top Quartile</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">
              {benchmarkData?.filter(item => item?.ourValue >= item?.industryAvg && item?.ourValue < item?.topQuartile)?.length}
            </div>
            <div className="text-xs text-muted-foreground">Above Average</div>
          </div>
          <div>
            <div className="text-lg font-bold text-warning">
              {benchmarkData?.filter(item => item?.ourValue < item?.industryAvg)?.length}
            </div>
            <div className="text-xs text-muted-foreground">Below Average</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryBenchmark;