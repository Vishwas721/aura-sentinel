import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AnalyticsHeader = ({ 
  onFiltersChange = () => {},
  onExport = () => {},
  className = ''
}) => {
  const [dateRange, setDateRange] = useState('7d');
  const [threatCategories, setThreatCategories] = useState([]);
  const [regions, setRegions] = useState([]);
  const [comparisonMode, setComparisonMode] = useState(false);

  const dateRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const threatCategoryOptions = [
    { value: 'malware', label: 'Malware' },
    { value: 'phishing', label: 'Phishing' },
    { value: 'ddos', label: 'DDoS Attacks' },
    { value: 'intrusion', label: 'Intrusion Attempts' },
    { value: 'data_breach', label: 'Data Breaches' },
    { value: 'insider_threat', label: 'Insider Threats' },
    { value: 'ransomware', label: 'Ransomware' },
    { value: 'apt', label: 'Advanced Persistent Threats' }
  ];

  const regionOptions = [
    { value: 'north_america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia_pacific', label: 'Asia Pacific' },
    { value: 'middle_east', label: 'Middle East' },
    { value: 'africa', label: 'Africa' },
    { value: 'south_america', label: 'South America' }
  ];

  const handleFilterChange = (filterType, value) => {
    const filters = {
      dateRange: filterType === 'dateRange' ? value : dateRange,
      threatCategories: filterType === 'threatCategories' ? value : threatCategories,
      regions: filterType === 'regions' ? value : regions,
      comparisonMode: filterType === 'comparisonMode' ? value : comparisonMode
    };

    switch (filterType) {
      case 'dateRange':
        setDateRange(value);
        break;
      case 'threatCategories':
        setThreatCategories(value);
        break;
      case 'regions':
        setRegions(value);
        break;
      case 'comparisonMode':
        setComparisonMode(value);
        break;
    }

    onFiltersChange(filters);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 mb-6 ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Title and Description */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Security Operations Analytics
          </h1>
          <p className="text-muted-foreground">
            Deep-dive analysis and trend investigation for comprehensive threat intelligence
          </p>
        </div>

        {/* Export Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={() => onExport('pdf')}
          >
            Export PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="FileText"
            iconPosition="left"
            onClick={() => onExport('report')}
          >
            Generate Report
          </Button>
        </div>
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Date Range Filter */}
        <Select
          label="Time Period"
          options={dateRangeOptions}
          value={dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
          className="w-full"
        />

        {/* Threat Categories Filter */}
        <Select
          label="Threat Categories"
          options={threatCategoryOptions}
          value={threatCategories}
          onChange={(value) => handleFilterChange('threatCategories', value)}
          multiple
          searchable
          placeholder="Select categories..."
          className="w-full"
        />

        {/* Geographic Regions Filter */}
        <Select
          label="Geographic Regions"
          options={regionOptions}
          value={regions}
          onChange={(value) => handleFilterChange('regions', value)}
          multiple
          searchable
          placeholder="Select regions..."
          className="w-full"
        />

        {/* Comparison Mode Toggle */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-foreground mb-2">
            Analysis Mode
          </label>
          <Button
            variant={comparisonMode ? "default" : "outline"}
            size="default"
            iconName={comparisonMode ? "BarChart3" : "TrendingUp"}
            iconPosition="left"
            onClick={() => handleFilterChange('comparisonMode', !comparisonMode)}
            className="w-full justify-start"
          >
            {comparisonMode ? 'Comparison View' : 'Standard View'}
          </Button>
        </div>
      </div>
      {/* Active Filters Display */}
      {(threatCategories?.length > 0 || regions?.length > 0 || comparisonMode) && (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {threatCategories?.map((category) => (
            <span
              key={category}
              className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/20"
            >
              {threatCategoryOptions?.find(opt => opt?.value === category)?.label}
              <button
                onClick={() => handleFilterChange('threatCategories', threatCategories?.filter(c => c !== category))}
                className="ml-1 hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          ))}

          {regions?.map((region) => (
            <span
              key={region}
              className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent text-xs rounded-md border border-accent/20"
            >
              {regionOptions?.find(opt => opt?.value === region)?.label}
              <button
                onClick={() => handleFilterChange('regions', regions?.filter(r => r !== region))}
                className="ml-1 hover:text-accent/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          ))}

          {comparisonMode && (
            <span className="inline-flex items-center px-2 py-1 bg-success/10 text-success text-xs rounded-md border border-success/20">
              Comparison Mode
              <button
                onClick={() => handleFilterChange('comparisonMode', false)}
                className="ml-1 hover:text-success/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}

          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={() => {
              setThreatCategories([]);
              setRegions([]);
              setComparisonMode(false);
              onFiltersChange({ dateRange, threatCategories: [], regions: [], comparisonMode: false });
            }}
            className="text-xs"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default AnalyticsHeader;