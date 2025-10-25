import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SecurityLogStream = ({ className = '' }) => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [isPaused, setIsPaused] = useState(false);
  const [expandedLog, setExpandedLog] = useState(null);
  const logContainerRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const severityConfig = {
    critical: { color: 'text-red-400', bg: 'bg-red-500/10', icon: 'AlertTriangle', label: 'CRITICAL' },
    high: { color: 'text-orange-400', bg: 'bg-orange-500/10', icon: 'AlertCircle', label: 'HIGH' },
    medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: 'Info', label: 'MEDIUM' },
    low: { color: 'text-blue-400', bg: 'bg-blue-500/10', icon: 'CheckCircle', label: 'LOW' },
    info: { color: 'text-green-400', bg: 'bg-green-500/10', icon: 'Info', label: 'INFO' }
  };

  const mockLogEntries = [
    {
      id: 1,
      timestamp: new Date(),
      severity: 'critical',
      source: 'Firewall-01',
      event: 'Multiple failed authentication attempts detected',
      details: `Source IP: 192.168.1.100\nAttempts: 15\nTarget: admin@company.com\nAction: IP blocked for 24 hours`,
      category: 'Authentication'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 30000),
      severity: 'high',
      source: 'IDS-Core',
      event: 'Suspicious network traffic pattern identified',
      details: `Protocol: TCP\nPort: 443\nData volume: 2.3GB\nPattern: DDoS attempt\nMitigation: Rate limiting applied`,
      category: 'Network'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 60000),
      severity: 'medium',
      source: 'Endpoint-Security',
      event: 'Malware signature detected and quarantined',
      details: `File: suspicious_document.pdf\nHash: a1b2c3d4e5f6\nAction: Quarantined\nUser notified: Yes`,
      category: 'Malware'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 90000),
      severity: 'low',
      source: 'Web-Gateway',
      event: 'Blocked access to suspicious domain',
      details: `Domain: malicious-site.com\nCategory: Phishing\nUser: john.doe@company.com\nAction: Access denied`,
      category: 'Web Security'
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 120000),
      severity: 'info',
      source: 'System-Monitor',
      event: 'Security policy update applied successfully',
      details: `Policy: Password complexity requirements\nVersion: 2.1.3\nAffected users: 1,247\nStatus: Active`,
      category: 'Policy'
    }
  ];

  useEffect(() => {
    setLogs(mockLogEntries);
    setFilteredLogs(mockLogEntries);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        const newLog = {
          id: Date.now(),
          timestamp: new Date(),
          severity: ['critical', 'high', 'medium', 'low', 'info']?.[Math.floor(Math.random() * 5)],
          source: ['Firewall-01', 'IDS-Core', 'Endpoint-Security', 'Web-Gateway', 'System-Monitor']?.[Math.floor(Math.random() * 5)],
          event: [
            'Authentication attempt blocked',
            'Network anomaly detected',
            'File scan completed',
            'Policy violation detected',
            'System health check passed'
          ]?.[Math.floor(Math.random() * 5)],
          details: `Automated security event generated at ${new Date()?.toISOString()}\nStatus: Under investigation\nPriority: Normal`,
          category: ['Authentication', 'Network', 'Malware', 'Web Security', 'Policy']?.[Math.floor(Math.random() * 5)]
        };

        setLogs(prev => [newLog, ...prev?.slice(0, 99)]);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isPaused]);

  useEffect(() => {
    let filtered = logs;

    if (searchTerm) {
      filtered = filtered?.filter(log => 
        log?.event?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        log?.source?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        log?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    if (selectedSeverity !== 'all') {
      filtered = filtered?.filter(log => log?.severity === selectedSeverity);
    }

    setFilteredLogs(filtered);
  }, [logs, searchTerm, selectedSeverity]);

  useEffect(() => {
    if (autoScroll && logContainerRef?.current) {
      logContainerRef.current.scrollTop = 0;
    }
  }, [filteredLogs, autoScroll]);

  const formatTimestamp = (timestamp) => {
    return timestamp?.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const toggleLogExpansion = (logId) => {
    setExpandedLog(expandedLog === logId ? null : logId);
  };

  const handleScroll = () => {
    if (logContainerRef?.current) {
      const { scrollTop } = logContainerRef?.current;
      setAutoScroll(scrollTop < 50);
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Terminal" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Security Event Stream</h3>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-data"></div>
            <span className="text-xs text-primary font-medium">LIVE</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={isPaused ? "default" : "outline"}
            size="sm"
            iconName={isPaused ? "Play" : "Pause"}
            iconPosition="left"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search events, sources, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-md text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e?.target?.value)}
              className="px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
              <option value="info">Info</option>
            </select>
          </div>
        </div>
      </div>
      {/* Log Stream */}
      <div 
        ref={logContainerRef}
        onScroll={handleScroll}
        className="h-96 overflow-y-auto font-mono text-sm"
        style={{ scrollBehavior: 'smooth' }}
      >
        {filteredLogs?.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <Icon name="Search" size={32} className="mx-auto mb-2 opacity-50" />
              <p>No events match your filters</p>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {filteredLogs?.map((log) => {
              const config = severityConfig?.[log?.severity];
              const isExpanded = expandedLog === log?.id;
              
              return (
                <div
                  key={log?.id}
                  className={`border border-border rounded-md ${config?.bg} transition-all duration-200 hover:border-primary/30`}
                >
                  <div
                    className="p-3 cursor-pointer"
                    onClick={() => toggleLogExpansion(log?.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center space-x-2 min-w-0">
                        <Icon name={config?.icon} size={14} className={config?.color} />
                        <span className={`text-xs font-medium ${config?.color} uppercase tracking-wide`}>
                          {config?.label}
                        </span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground font-mono">
                            {formatTimestamp(log?.timestamp)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {log?.source}
                          </span>
                        </div>
                        
                        <p className="text-sm text-foreground mt-1 break-words">
                          {log?.event}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs px-2 py-1 bg-muted/50 rounded text-muted-foreground">
                            {log?.category}
                          </span>
                          <Icon 
                            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                            size={14} 
                            className="text-muted-foreground" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="px-3 pb-3 border-t border-border/50">
                      <pre className="text-xs text-muted-foreground mt-2 whitespace-pre-wrap break-words">
                        {log?.details}
                      </pre>
                      <div className="flex items-center space-x-2 mt-3">
                        <Button variant="outline" size="xs" iconName="ExternalLink" iconPosition="left">
                          Investigate
                        </Button>
                        <Button variant="outline" size="xs" iconName="AlertTriangle" iconPosition="left">
                          Escalate
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between p-3 border-t border-border text-xs text-muted-foreground">
        <span>{filteredLogs?.length} events displayed</span>
        <div className="flex items-center space-x-2">
          <span>Auto-scroll:</span>
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`w-8 h-4 rounded-full transition-colors ${
              autoScroll ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
              autoScroll ? 'translate-x-4' : 'translate-x-0.5'
            }`}></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityLogStream;