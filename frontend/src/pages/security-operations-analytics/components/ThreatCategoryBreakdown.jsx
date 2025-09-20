import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreatCategoryBreakdown = ({ className = '' }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [viewMode, setViewMode] = useState('percentage');

  const threatData = [
    {
      name: 'Malware',
      value: 342,
      percentage: 28.5,
      color: '#ff4d4d',
      icon: 'Bug',
      trend: '+12%',
      description: 'Malicious software attacks'
    },
    {
      name: 'Phishing',
      value: 289,
      percentage: 24.1,
      color: '#facc15',
      icon: 'Fish',
      trend: '+8%',
      description: 'Social engineering attacks'
    },
    {
      name: 'DDoS',
      value: 198,
      percentage: 16.5,
      color: '#00f0ff',
      icon: 'Zap',
      trend: '-3%',
      description: 'Distributed denial of service'
    },
    {
      name: 'Intrusion',
      value: 156,
      percentage: 13.0,
      color: '#22c55e',
      icon: 'UserX',
      trend: '+15%',
      description: 'Unauthorized access attempts'
    },
    {
      name: 'Data Breach',
      value: 98,
      percentage: 8.2,
      color: '#8b5cf6',
      icon: 'Database',
      trend: '+5%',
      description: 'Data exfiltration incidents'
    },
    {
      name: 'Ransomware',
      value: 67,
      percentage: 5.6,
      color: '#f97316',
      icon: 'Lock',
      trend: '+22%',
      description: 'Encryption-based extortion'
    },
    {
      name: 'Other',
      value: 50,
      percentage: 4.1,
      color: '#94a3b8',
      icon: 'MoreHorizontal',
      trend: '+2%',
      description: 'Miscellaneous threats'
    }
  ];

  const toggleCategory = (categoryName) => {
    setSelectedCategories(prev => 
      prev?.includes(categoryName)
        ? prev?.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const getFilteredData = () => {
    if (selectedCategories?.length === 0) return threatData;
    return threatData?.filter(item => selectedCategories?.includes(item?.name));
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 cyber-shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: data?.color }}
            />
            <span className="font-medium text-foreground">{data?.name}</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Count:</span>
              <span className="text-foreground font-medium">{data?.value?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Percentage:</span>
              <span className="text-foreground font-medium">{data?.percentage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Trend:</span>
              <span className={`font-medium ${data?.trend?.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                {data?.trend}
              </span>
            </div>
            <p className="text-muted-foreground mt-2">{data?.description}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="space-y-2 mt-4">
        {payload?.map((entry, index) => {
          const isSelected = selectedCategories?.length === 0 || selectedCategories?.includes(entry?.value);
          return (
            <button
              key={index}
              onClick={() => toggleCategory(entry?.value)}
              className={`flex items-center justify-between w-full p-2 rounded-lg transition-all duration-150 ${
                isSelected 
                  ? 'bg-muted/50 border border-border' :'opacity-50 hover:opacity-75'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry?.color }}
                />
                <Icon 
                  name={threatData?.find(t => t?.name === entry?.value)?.icon || 'Circle'} 
                  size={14} 
                  className="text-muted-foreground"
                />
                <span className="text-sm font-medium text-foreground">
                  {entry?.value}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  {viewMode === 'percentage' 
                    ? `${threatData?.find(t => t?.name === entry?.value)?.percentage}%`
                    : threatData?.find(t => t?.name === entry?.value)?.value?.toLocaleString()
                  }
                </div>
                <div className={`text-xs ${
                  threatData?.find(t => t?.name === entry?.value)?.trend?.startsWith('+') 
                    ? 'text-success' :'text-destructive'
                }`}>
                  {threatData?.find(t => t?.name === entry?.value)?.trend}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Threat Category Breakdown
          </h2>
          <p className="text-sm text-muted-foreground">
            Interactive analysis of threat types and distribution
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'percentage' ? "default" : "ghost"}
            size="sm"
            iconName="Percent"
            iconPosition="left"
            onClick={() => setViewMode('percentage')}
            className="text-xs"
          >
            Percentage
          </Button>
          <Button
            variant={viewMode === 'count' ? "default" : "ghost"}
            size="sm"
            iconName="Hash"
            iconPosition="left"
            onClick={() => setViewMode('count')}
            className="text-xs"
          >
            Count
          </Button>
        </div>
      </div>
      {/* Chart */}
      <div className="h-64 w-full mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={getFilteredData()}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey={viewMode === 'percentage' ? 'percentage' : 'value'}
            >
              {getFilteredData()?.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry?.color}
                  stroke={entry?.color}
                  strokeWidth={2}
                  className="hover:opacity-80 transition-opacity duration-150"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Center Label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {getFilteredData()?.reduce((sum, item) => sum + item?.value, 0)?.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Total Threats</div>
        </div>
      </div>
      {/* Interactive Legend */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">
            Categories ({selectedCategories?.length === 0 ? 'All' : selectedCategories?.length} selected)
          </span>
          {selectedCategories?.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={() => setSelectedCategories([])}
              className="text-xs"
            >
              Show All
            </Button>
          )}
        </div>
        <CustomLegend payload={threatData?.map(item => ({ value: item?.name, color: item?.color }))} />
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">
              {Math.max(...threatData?.map(t => parseFloat(t?.trend?.replace('%', '')?.replace('+', ''))))}%
            </div>
            <div className="text-xs text-muted-foreground">Highest Growth</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">
              {threatData?.length}
            </div>
            <div className="text-xs text-muted-foreground">Active Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatCategoryBreakdown;