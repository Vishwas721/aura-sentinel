import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimePeriodSelector = ({ onPeriodChange, onExport, className = '' }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const timePeriods = [
    { value: 'weekly', label: 'Weekly', icon: 'Calendar' },
    { value: 'monthly', label: 'Monthly', icon: 'Calendar' },
    { value: 'quarterly', label: 'Quarterly', icon: 'Calendar' },
    { value: 'yearly', label: 'Yearly', icon: 'Calendar' }
  ];

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    onPeriodChange(period);
  };

  const handleExport = (format) => {
    onExport(format, selectedPeriod);
  };

  return (
    <div className={`flex items-center justify-between bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Time Period:</span>
        </div>
        
        <div className="flex items-center space-x-1">
          {timePeriods?.map((period) => (
            <button
              key={period?.value}
              onClick={() => handlePeriodChange(period?.value)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-150 ${
                selectedPeriod === period?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {period?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <Icon name="Download" size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Export:</span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="FileText"
          iconPosition="left"
          onClick={() => handleExport('pdf')}
          className="text-xs"
        >
          PDF
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          iconName="FileSpreadsheet"
          iconPosition="left"
          onClick={() => handleExport('excel')}
          className="text-xs"
        >
          Excel
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Printer"
          iconPosition="left"
          onClick={() => window.print()}
          className="text-xs"
        >
          Print
        </Button>
      </div>
    </div>
  );
};

export default TimePeriodSelector;