import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  status = 'normal',
  description,
  className = '' 
}) => {
  const statusStyles = {
    normal: 'border-border bg-card',
    warning: 'border-warning/30 bg-warning/5 animate-glow-cyan',
    critical: 'border-destructive/30 bg-destructive/5 animate-glow-cyan',
    success: 'border-success/30 bg-success/5'
  };

  const changeStyles = {
    increase: 'text-destructive',
    decrease: 'text-success',
    neutral: 'text-muted-foreground'
  };

  const iconColors = {
    normal: 'text-primary',
    warning: 'text-warning',
    critical: 'text-destructive',
    success: 'text-success'
  };

  return (
    <div className={`relative p-6 rounded-lg border ${statusStyles?.[status]} cyber-shadow-sm ${className}`}>
      {status === 'critical' && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse-data"></div>
      )}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={icon} size={20} className={iconColors?.[status]} />
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </h3>
          </div>
          
          <div className="space-y-1">
            <p className="text-3xl font-bold text-foreground font-mono">
              {value}
            </p>
            
            {change && (
              <div className="flex items-center space-x-1">
                <Icon 
                  name={changeType === 'increase' ? 'TrendingUp' : changeType === 'decrease' ? 'TrendingDown' : 'Minus'} 
                  size={14} 
                  className={changeStyles?.[changeType]} 
                />
                <span className={`text-sm font-medium ${changeStyles?.[changeType]}`}>
                  {change}
                </span>
                <span className="text-xs text-muted-foreground">vs last hour</span>
              </div>
            )}
            
            {description && (
              <p className="text-xs text-muted-foreground mt-2">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;