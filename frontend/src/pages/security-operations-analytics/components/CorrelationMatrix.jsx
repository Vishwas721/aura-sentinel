import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const CorrelationMatrix = ({ className = '' }) => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [viewMode, setViewMode] = useState('correlation');

  const attackPatterns = [
    'Malware',
    'Phishing',
    'DDoS',
    'Intrusion',
    'Data Breach',
    'Ransomware',
    'Insider Threat',
    'APT'
  ];

  // Correlation matrix data (values between -1 and 1)
  const correlationData = {
    'Malware': { 'Malware': 1.0, 'Phishing': 0.65, 'DDoS': 0.23, 'Intrusion': 0.78, 'Data Breach': 0.45, 'Ransomware': 0.82, 'Insider Threat': 0.12, 'APT': 0.67 },
    'Phishing': { 'Malware': 0.65, 'Phishing': 1.0, 'DDoS': 0.18, 'Intrusion': 0.56, 'Data Breach': 0.73, 'Ransomware': 0.34, 'Insider Threat': 0.29, 'APT': 0.58 },
    'DDoS': { 'Malware': 0.23, 'Phishing': 0.18, 'DDoS': 1.0, 'Intrusion': 0.41, 'Data Breach': 0.15, 'Ransomware': 0.08, 'Insider Threat': -0.12, 'APT': 0.22 },
    'Intrusion': { 'Malware': 0.78, 'Phishing': 0.56, 'DDoS': 0.41, 'Intrusion': 1.0, 'Data Breach': 0.69, 'Ransomware': 0.52, 'Insider Threat': 0.38, 'APT': 0.84 },
    'Data Breach': { 'Malware': 0.45, 'Phishing': 0.73, 'DDoS': 0.15, 'Intrusion': 0.69, 'Data Breach': 1.0, 'Ransomware': 0.41, 'Insider Threat': 0.67, 'APT': 0.76 },
    'Ransomware': { 'Malware': 0.82, 'Phishing': 0.34, 'DDoS': 0.08, 'Intrusion': 0.52, 'Data Breach': 0.41, 'Ransomware': 1.0, 'Insider Threat': 0.19, 'APT': 0.63 },
    'Insider Threat': { 'Malware': 0.12, 'Phishing': 0.29, 'DDoS': -0.12, 'Intrusion': 0.38, 'Data Breach': 0.67, 'Ransomware': 0.19, 'Insider Threat': 1.0, 'APT': 0.45 },
    'APT': { 'Malware': 0.67, 'Phishing': 0.58, 'DDoS': 0.22, 'Intrusion': 0.84, 'Data Breach': 0.76, 'Ransomware': 0.63, 'Insider Threat': 0.45, 'APT': 1.0 }
  };

  // Timing sequence data (hours between attacks)
  const timingData = {
    'Malware': { 'Malware': 0, 'Phishing': 2.3, 'DDoS': 8.7, 'Intrusion': 1.2, 'Data Breach': 4.8, 'Ransomware': 0.8, 'Insider Threat': 12.4, 'APT': 1.8 },
    'Phishing': { 'Malware': 3.1, 'Phishing': 0, 'DDoS': 6.2, 'Intrusion': 2.7, 'Data Breach': 1.4, 'Ransomware': 5.9, 'Insider Threat': 8.3, 'APT': 3.2 },
    'DDoS': { 'Malware': 7.8, 'Phishing': 9.1, 'DDoS': 0, 'Intrusion': 4.5, 'Data Breach': 11.2, 'Ransomware': 15.6, 'Insider Threat': 18.7, 'APT': 9.8 },
    'Intrusion': { 'Malware': 1.8, 'Phishing': 3.4, 'DDoS': 5.1, 'Intrusion': 0, 'Data Breach': 2.1, 'Ransomware': 3.7, 'Insider Threat': 6.8, 'APT': 0.9 },
    'Data Breach': { 'Malware': 6.2, 'Phishing': 2.1, 'DDoS': 14.3, 'Intrusion': 3.8, 'Data Breach': 0, 'Ransomware': 7.4, 'Insider Threat': 1.2, 'APT': 2.6 },
    'Ransomware': { 'Malware': 1.1, 'Phishing': 8.9, 'DDoS': 19.2, 'Intrusion': 4.3, 'Data Breach': 9.1, 'Ransomware': 0, 'Insider Threat': 13.7, 'APT': 5.2 },
    'Insider Threat': { 'Malware': 16.4, 'Phishing': 11.2, 'DDoS': 22.1, 'Intrusion': 8.7, 'Data Breach': 2.3, 'Ransomware': 18.9, 'Insider Threat': 0, 'APT': 7.8 },
    'APT': { 'Malware': 2.4, 'Phishing': 4.1, 'DDoS': 12.6, 'Intrusion': 1.3, 'Data Breach': 3.2, 'Ransomware': 6.8, 'Insider Threat': 9.4, 'APT': 0 }
  };

  const getCorrelationColor = (value) => {
    if (value >= 0.8) return 'bg-destructive text-destructive-foreground';
    if (value >= 0.6) return 'bg-warning text-warning-foreground';
    if (value >= 0.4) return 'bg-accent text-accent-foreground';
    if (value >= 0.2) return 'bg-primary/30 text-primary';
    if (value >= 0) return 'bg-muted text-muted-foreground';
    return 'bg-success/30 text-success';
  };

  const getTimingColor = (hours) => {
    if (hours === 0) return 'bg-muted text-muted-foreground';
    if (hours <= 2) return 'bg-destructive text-destructive-foreground';
    if (hours <= 6) return 'bg-warning text-warning-foreground';
    if (hours <= 12) return 'bg-accent text-accent-foreground';
    return 'bg-success/30 text-success';
  };

  const formatValue = (row, col) => {
    if (viewMode === 'correlation') {
      const value = correlationData?.[row]?.[col];
      return value?.toFixed(2);
    } else {
      const hours = timingData?.[row]?.[col];
      return hours === 0 ? '-' : `${hours}h`;
    }
  };

  const getCellColor = (row, col) => {
    if (viewMode === 'correlation') {
      return getCorrelationColor(correlationData?.[row]?.[col]);
    } else {
      return getTimingColor(timingData?.[row]?.[col]);
    }
  };

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };

  const getSelectedCellInfo = () => {
    if (!selectedCell) return null;
    
    const { row, col } = selectedCell;
    const correlation = correlationData?.[row]?.[col];
    const timing = timingData?.[row]?.[col];
    
    return {
      pattern1: row,
      pattern2: col,
      correlation: correlation,
      timing: timing,
      strength: correlation >= 0.8 ? 'Very Strong' : 
               correlation >= 0.6 ? 'Strong' : 
               correlation >= 0.4 ? 'Moderate' : 
               correlation >= 0.2 ? 'Weak' : 'Very Weak'
    };
  };

  const selectedInfo = getSelectedCellInfo();

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Attack Pattern Correlation Matrix
          </h2>
          <p className="text-sm text-muted-foreground">
            Visualize relationships and timing sequences between different attack patterns
          </p>
        </div>

        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          <Button
            variant={viewMode === 'correlation' ? "default" : "ghost"}
            size="sm"
            iconName="GitBranch"
            iconPosition="left"
            onClick={() => setViewMode('correlation')}
            className="text-xs"
          >
            Correlation
          </Button>
          <Button
            variant={viewMode === 'timing' ? "default" : "ghost"}
            size="sm"
            iconName="Clock"
            iconPosition="left"
            onClick={() => setViewMode('timing')}
            className="text-xs"
          >
            Timing
          </Button>
        </div>
      </div>
      {/* Matrix */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header Row */}
          <div className="flex">
            <div className="w-32 h-8 flex items-center justify-center text-xs font-medium text-muted-foreground">
              {viewMode === 'correlation' ? 'Correlation' : 'Timing (hrs)'}
            </div>
            {attackPatterns?.map((pattern) => (
              <div
                key={pattern}
                className="w-20 h-8 flex items-center justify-center text-xs font-medium text-muted-foreground border-l border-border"
              >
                {pattern?.slice(0, 8)}
              </div>
            ))}
          </div>

          {/* Matrix Rows */}
          {attackPatterns?.map((rowPattern) => (
            <div key={rowPattern} className="flex border-t border-border">
              <div className="w-32 h-12 flex items-center justify-start px-2 text-xs font-medium text-foreground bg-muted/30">
                {rowPattern}
              </div>
              {attackPatterns?.map((colPattern) => (
                <button
                  key={`${rowPattern}-${colPattern}`}
                  onClick={() => handleCellClick(rowPattern, colPattern)}
                  className={`w-20 h-12 flex items-center justify-center text-xs font-medium border-l border-border transition-all duration-150 hover:scale-105 ${
                    getCellColor(rowPattern, colPattern)
                  } ${
                    selectedCell?.row === rowPattern && selectedCell?.col === colPattern
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' :''
                  }`}
                >
                  {formatValue(rowPattern, colPattern)}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-foreground">
            {viewMode === 'correlation' ? 'Correlation Strength:' : 'Time Intervals:'}
          </span>
          
          {viewMode === 'correlation' ? (
            <>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-destructive rounded"></div>
                <span className="text-xs text-muted-foreground">Very Strong (0.8+)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-warning rounded"></div>
                <span className="text-xs text-muted-foreground">Strong (0.6-0.8)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-accent rounded"></div>
                <span className="text-xs text-muted-foreground">Moderate (0.4-0.6)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-primary/30 rounded"></div>
                <span className="text-xs text-muted-foreground">Weak (0.2-0.4)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-success/30 rounded"></div>
                <span className="text-xs text-muted-foreground">Negative (&lt;0)</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-destructive rounded"></div>
                <span className="text-xs text-muted-foreground">0-2 hours</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-warning rounded"></div>
                <span className="text-xs text-muted-foreground">2-6 hours</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-accent rounded"></div>
                <span className="text-xs text-muted-foreground">6-12 hours</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-success/30 rounded"></div>
                <span className="text-xs text-muted-foreground">12+ hours</span>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Selected Cell Details */}
      {selectedInfo && (
        <div className="mt-4 p-4 bg-muted/30 border border-border rounded-lg">
          <h3 className="text-sm font-semibold text-foreground mb-2">
            Pattern Relationship Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground">Pattern 1:</span>
              <span className="ml-2 font-medium text-foreground">{selectedInfo?.pattern1}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Pattern 2:</span>
              <span className="ml-2 font-medium text-foreground">{selectedInfo?.pattern2}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Correlation:</span>
              <span className="ml-2 font-medium text-foreground">{selectedInfo?.correlation?.toFixed(3)}</span>
              <span className="ml-1 text-muted-foreground">({selectedInfo?.strength})</span>
            </div>
            <div>
              <span className="text-muted-foreground">Avg. Time Gap:</span>
              <span className="ml-2 font-medium text-foreground">
                {selectedInfo?.timing === 0 ? 'Simultaneous' : `${selectedInfo?.timing} hours`}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CorrelationMatrix;