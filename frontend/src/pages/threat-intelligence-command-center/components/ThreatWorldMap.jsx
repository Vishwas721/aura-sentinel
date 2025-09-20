import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ThreatWorldMap = ({ className = '' }) => {
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [threatData, setThreatData] = useState([]);

  // Mock threat data with geographic coordinates
  const mockThreats = [
    {
      id: 1,
      lat: 39.9042,
      lng: 116.4074,
      country: 'China',
      city: 'Beijing',
      severity: 'critical',
      type: 'DDoS Attack',
      count: 1247,
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      lat: 55.7558,
      lng: 37.6176,
      country: 'Russia',
      city: 'Moscow',
      severity: 'high',
      type: 'Malware Distribution',
      count: 892,
      timestamp: new Date(Date.now() - 180000)
    },
    {
      id: 3,
      lat: 40.7128,
      lng: -74.0060,
      country: 'United States',
      city: 'New York',
      severity: 'medium',
      type: 'Phishing Campaign',
      count: 634,
      timestamp: new Date(Date.now() - 420000)
    },
    {
      id: 4,
      lat: 51.5074,
      lng: -0.1278,
      country: 'United Kingdom',
      city: 'London',
      severity: 'high',
      type: 'Ransomware',
      count: 445,
      timestamp: new Date(Date.now() - 600000)
    },
    {
      id: 5,
      lat: 35.6762,
      lng: 139.6503,
      country: 'Japan',
      city: 'Tokyo',
      severity: 'low',
      type: 'Port Scanning',
      count: 289,
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: 6,
      lat: 52.5200,
      lng: 13.4050,
      country: 'Germany',
      city: 'Berlin',
      severity: 'medium',
      type: 'SQL Injection',
      count: 367,
      timestamp: new Date(Date.now() - 480000)
    }
  ];

  const severityColors = {
    critical: '#ff4d4d',
    high: '#facc15',
    medium: '#00f0ff',
    low: '#22c55e'
  };

  const severityIcons = {
    critical: 'AlertTriangle',
    high: 'AlertCircle',
    medium: 'Info',
    low: 'CheckCircle'
  };

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setThreatData(mockThreats?.map(threat => ({
        ...threat,
        count: threat?.count + Math.floor(Math.random() * 50),
        timestamp: new Date()
      })));
    }, 3000);

    // Initial data load
    setThreatData(mockThreats);

    return () => clearInterval(interval);
  }, []);

  const formatTimestamp = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const getMarkerSize = (severity) => {
    const sizes = {
      critical: 16,
      high: 12,
      medium: 10,
      low: 8
    };
    return sizes?.[severity];
  };

  return (
    <div className={`bg-card rounded-lg border border-border cyber-shadow-md ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Globe" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Global Threat Map</h2>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-data"></div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Last updated: {formatTimestamp(new Date())}
          </div>
          <Icon name="Maximize2" size={16} className="text-muted-foreground cursor-pointer hover:text-foreground" />
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-96 bg-slate-950 rounded-b-lg overflow-hidden">
        {/* World Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Global Threat Map"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=0,0&z=2&output=embed"
            className="opacity-30 filter grayscale"
          />
        </div>

        {/* Threat Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {threatData?.map((threat) => {
            // Convert lat/lng to approximate screen positions (simplified)
            const x = ((threat?.lng + 180) / 360) * 100;
            const y = ((90 - threat?.lat) / 180) * 100;
            
            return (
              <div
                key={threat?.id}
                className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  left: `${x}%`, 
                  top: `${y}%`,
                  zIndex: threat?.severity === 'critical' ? 20 : 10
                }}
                onClick={() => setSelectedThreat(threat)}
              >
                <div 
                  className="rounded-full animate-pulse-data border-2 border-white/30"
                  style={{ 
                    backgroundColor: severityColors?.[threat?.severity],
                    width: getMarkerSize(threat?.severity),
                    height: getMarkerSize(threat?.severity),
                    boxShadow: `0 0 ${getMarkerSize(threat?.severity)}px ${severityColors?.[threat?.severity]}40`
                  }}
                />
                {/* Ripple Effect for Critical Threats */}
                {threat?.severity === 'critical' && (
                  <div 
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ 
                      backgroundColor: severityColors?.[threat?.severity],
                      opacity: 0.3
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border">
          <h4 className="text-xs font-medium text-foreground mb-2">Threat Severity</h4>
          <div className="space-y-1">
            {Object.entries(severityColors)?.map(([severity, color]) => (
              <div key={severity} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-muted-foreground capitalize">{severity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Threat Details Popup */}
        {selectedThreat && (
          <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-4 border border-border cyber-shadow-lg max-w-xs">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={severityIcons?.[selectedThreat?.severity]} 
                  size={16} 
                  style={{ color: severityColors?.[selectedThreat?.severity] }}
                />
                <span 
                  className="text-sm font-medium capitalize"
                  style={{ color: severityColors?.[selectedThreat?.severity] }}
                >
                  {selectedThreat?.severity}
                </span>
              </div>
              <button 
                onClick={() => setSelectedThreat(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">{selectedThreat?.type}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedThreat?.city}, {selectedThreat?.country}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Incidents:</span>
                <span className="font-mono text-foreground">{selectedThreat?.count?.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last seen:</span>
                <span className="font-mono text-foreground">{formatTimestamp(selectedThreat?.timestamp)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatWorldMap;