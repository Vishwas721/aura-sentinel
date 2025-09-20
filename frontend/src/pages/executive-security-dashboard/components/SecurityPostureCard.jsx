import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityPostureCard = ({ 
  title, 
  value, 
  trend, 
  trendValue, 
  icon, 
  description,
  status = 'good',
  className = '' 
}) => {
  const statusConfig = {
    excellent: { color: 'text-success', bgColor: 'bg-success/10', borderColor: 'border-success/20' },
    good: { color: 'text-primary', bgColor: 'bg-primary/10', borderColor: 'border-primary/20' },
    warning: { color: 'text-accent', bgColor: 'bg-accent/10', borderColor: 'border-accent/20' },
    critical: { color: 'text-warning', bgColor: 'bg-warning/10', borderColor: 'border-warning/20' }
  };

  const trendConfig = {
    up: { icon: 'TrendingUp', color: 'text-success' },
    down: { icon: 'TrendingDown', color: 'text-warning' },
    stable: { icon: 'Minus', color: 'text-muted-foreground' }
  };

  const config = statusConfig?.[status];
  const trendInfo = trendConfig?.[trend];

  return (
    <div className={`bg-card border ${config?.borderColor} rounded-lg p-6 hover:shadow-lg transition-all duration-200 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${config?.bgColor}`}>
          <Icon name={icon} size={24} className={config?.color} />
        </div>
        <div className="flex items-center space-x-1">
          <Icon name={trendInfo?.icon} size={16} className={trendInfo?.color} />
          <span className={`text-sm font-medium ${trendInfo?.color}`}>
            {trendValue}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default SecurityPostureCard;