import React from 'react';
import Icon from '../../../components/AppIcon';

const KPIMetricsSection = ({ className = '' }) => {
  const kpiMetrics = [
    {
      id: 'threat_volume',
      title: 'Threat Volume',
      value: '2,847',
      change: '+12.3%',
      changeType: 'increase',
      period: 'vs last week',
      icon: 'Shield',
      sparklineData: [45, 52, 48, 61, 58, 67, 72],
      description: 'Total security events detected'
    },
    {
      id: 'attack_vectors',
      title: 'Attack Vectors',
      value: '23',
      change: '+4',
      changeType: 'increase',
      period: 'new this week',
      icon: 'Target',
      sparklineData: [12, 15, 18, 16, 19, 21, 23],
      description: 'Unique attack methodologies identified'
    },
    {
      id: 'detection_time',
      title: 'Mean Time to Detection',
      value: '4.2m',
      change: '-18.5%',
      changeType: 'decrease',
      period: 'improvement',
      icon: 'Clock',
      sparklineData: [8.5, 7.2, 6.8, 5.9, 5.1, 4.7, 4.2],
      description: 'Average time to identify threats'
    },
    {
      id: 'resolution_rate',
      title: 'Incident Resolution Rate',
      value: '94.7%',
      change: '+2.1%',
      changeType: 'increase',
      period: 'vs last month',
      icon: 'CheckCircle2',
      sparklineData: [89, 91, 92, 93, 94, 95, 94.7],
      description: 'Successfully resolved security incidents'
    },
    {
      id: 'false_positives',
      title: 'False Positive Rate',
      value: '8.3%',
      change: '-3.2%',
      changeType: 'decrease',
      period: 'reduction',
      icon: 'AlertTriangle',
      sparklineData: [15, 13, 12, 11, 10, 9, 8.3],
      description: 'Incorrectly flagged security events'
    },
    {
      id: 'coverage_score',
      title: 'Security Coverage Score',
      value: '87.5',
      change: '+5.8',
      changeType: 'increase',
      period: 'points gained',
      icon: 'Radar',
      sparklineData: [78, 80, 82, 84, 85, 86, 87.5],
      description: 'Overall security posture rating'
    }
  ];

  const renderSparkline = (data) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    const points = data?.map((value, index) => {
      const x = (index / (data?.length - 1)) * 60;
      const y = 20 - ((value - min) / range) * 20;
      return `${x},${y}`;
    })?.join(' ');

    return (
      <svg width="60" height="20" className="opacity-70">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="animate-pulse-data"
        />
      </svg>
    );
  };

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'increase':
        return 'text-success';
      case 'decrease':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getIconColor = (id) => {
    const colors = {
      threat_volume: 'text-warning',
      attack_vectors: 'text-destructive',
      detection_time: 'text-primary',
      resolution_rate: 'text-success',
      false_positives: 'text-accent',
      coverage_score: 'text-primary'
    };
    return colors?.[id] || 'text-muted-foreground';
  };

  return (
    <div className={`mb-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiMetrics?.map((metric) => (
          <div
            key={metric?.id}
            className="bg-card border border-border rounded-lg p-6 hover:border-primary/20 transition-all duration-200 contextual-glow"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-lg bg-muted/50 ${getIconColor(metric?.id)}`}>
                  <Icon name={metric?.icon} size={16} />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  {metric?.title}
                </h3>
              </div>
              <div className="text-right">
                {renderSparkline(metric?.sparklineData)}
              </div>
            </div>

            {/* Value */}
            <div className="mb-3">
              <div className="text-2xl font-bold text-foreground mb-1">
                {metric?.value}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getChangeColor(metric?.changeType)}`}>
                  {metric?.change}
                </span>
                <span className="text-xs text-muted-foreground">
                  {metric?.period}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-muted-foreground">
              {metric?.description}
            </p>

            {/* Progress Indicator */}
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Trend</span>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={metric?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                    size={12} 
                    className={getChangeColor(metric?.changeType)}
                  />
                  <span className={getChangeColor(metric?.changeType)}>
                    {metric?.changeType === 'increase' ? 'Rising' : 'Falling'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KPIMetricsSection;