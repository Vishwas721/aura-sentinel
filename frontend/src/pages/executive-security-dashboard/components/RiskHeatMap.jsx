import React from 'react';
import Icon from '../../../components/AppIcon';

const RiskHeatMap = ({ className = '' }) => {
  const riskData = [
    { category: "Network Security", level: "high", score: 85, trend: "up", issues: 3 },
    { category: "Data Protection", level: "medium", score: 72, trend: "stable", issues: 1 },
    { category: "Access Control", level: "low", score: 95, trend: "up", issues: 0 },
    { category: "Compliance", level: "medium", score: 78, trend: "down", issues: 2 },
    { category: "Endpoint Security", level: "high", score: 68, trend: "down", issues: 4 },
    { category: "Cloud Security", level: "low", score: 92, trend: "up", issues: 0 }
  ];

  const levelConfig = {
    high: { 
      color: 'text-warning', 
      bgColor: 'bg-warning/20', 
      borderColor: 'border-warning/40',
      label: 'High Risk'
    },
    medium: { 
      color: 'text-accent', 
      bgColor: 'bg-accent/20', 
      borderColor: 'border-accent/40',
      label: 'Medium Risk'
    },
    low: { 
      color: 'text-success', 
      bgColor: 'bg-success/20', 
      borderColor: 'border-success/40',
      label: 'Low Risk'
    }
  };

  const trendConfig = {
    up: { icon: 'ArrowUp', color: 'text-success' },
    down: { icon: 'ArrowDown', color: 'text-warning' },
    stable: { icon: 'Minus', color: 'text-muted-foreground' }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Risk Heat Map</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-data"></div>
          <span className="text-xs text-primary font-medium">LIVE</span>
        </div>
      </div>
      <div className="space-y-4">
        {riskData?.map((risk, index) => {
          const config = levelConfig?.[risk?.level];
          const trendInfo = trendConfig?.[risk?.trend];
          
          return (
            <div 
              key={index}
              className={`p-4 rounded-lg border ${config?.borderColor} ${config?.bgColor} hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-foreground">{risk?.category}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${config?.bgColor} ${config?.color} border ${config?.borderColor}`}>
                    {config?.label}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name={trendInfo?.icon} size={14} className={trendInfo?.color} />
                  <span className="text-sm font-bold text-foreground">{risk?.score}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1 bg-muted rounded-full h-2 mr-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      risk?.level === 'high' ? 'bg-warning' : 
                      risk?.level === 'medium' ? 'bg-accent' : 'bg-success'
                    }`}
                    style={{ width: `${risk?.score}%` }}
                  ></div>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="AlertTriangle" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{risk?.issues} issues</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall Risk Score</span>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-foreground">82%</span>
            <Icon name="ArrowUp" size={14} className="text-success" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskHeatMap;