import React, { useState, useEffect } from 'react';

// --- Helper Functions & Mock Data ---
const generateMockAlert = (id) => {
  const severities = ['Critical', 'High', 'Medium', 'Low'];
  const types = ['Malware Detected', 'Phishing Attempt', 'DDoS Attack', 'Unusual Login', 'Data Exfiltration'];
  const locations = [
    { name: 'Frankfurt', lat: 50.1109, lng: 8.6821 },
    { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
    { name: 'Sao Paulo', lat: -23.5505, lng: -46.6333 },
    { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
    { name: 'Ashburn', lat: 39.0438, lng: -77.4874 },
  ];
  const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
  const randomType = types[Math.floor(Math.random() * types.length)];
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];

  return {
    id,
    timestamp: new Date().toISOString(),
    severity: randomSeverity,
    type: randomType,
    sourceIp: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    destinationIp: `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    location: randomLocation,
    status: 'New',
    description: `A ${randomSeverity.toLowerCase()} threat of type '${randomType}' was detected originating from ${randomLocation.name}. Immediate investigation is required.`,
    mitigation: 'No action taken yet. Pending analyst review.',
  };
};

const generateMockLog = () => {
  const levels = ['INFO', 'WARN', 'ERROR', 'DEBUG'];
  const messages = [
    'User authenticated successfully',
    'API endpoint /api/v1/data accessed',
    'Failed login attempt for user: admin',
    'Database connection established',
    'System health check OK',
    'High CPU usage detected on server-03',
  ];
  return `${new Date().toLocaleTimeString()} [${levels[Math.floor(Math.random() * levels.length)]}] ${messages[Math.floor(Math.random() * messages.length)]}`;
};

// --- SVG Icons ---
const AlertTriangleIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const ShieldCheckIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

const GlobeIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const XIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- UI Components ---
const GlobeVisualizer = ({ alerts }) => {
  return (
    <div className="relative w-full h-full bg-slate-900/50 rounded-lg overflow-hidden flex items-center justify-center border border-slate-800">
      <GlobeIcon className="text-cyan-400/20 w-3/4 h-3/4 animate-pulse" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-cyan-500/30"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 md:w-96 md:h-96 rounded-full border border-dashed border-cyan-500/20 animate-spin-slow"></div>
      </div>
      {alerts.slice(0, 5).map((alert, index) => (
        <div
          key={alert.id}
          className="absolute w-3 h-3 bg-red-500 rounded-full animate-ping"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            animationDelay: `${index * 0.2}s`
          }}
        ></div>
      ))}
      <p className="absolute bottom-4 text-center text-slate-400 text-sm">Live Threat Origination Points</p>
    </div>
  );
};

const AlertCard = ({ alert, onInvestigate }) => {
  const severityStyles = {
    Critical: 'border-red-500/80 bg-red-500/10 text-red-300',
    High: 'border-orange-500/80 bg-orange-500/10 text-orange-300',
    Medium: 'border-yellow-500/80 bg-yellow-500/10 text-yellow-300',
    Low: 'border-blue-500/80 bg-blue-500/10 text-blue-300',
  };
  const severityIconColor = {
    Critical: 'text-red-500',
    High: 'text-orange-500',
    Medium: 'text-yellow-500',
    Low: 'text-blue-500',
  };

  return (
    <div className={`flex flex-col p-4 rounded-lg border ${severityStyles[alert.severity]} transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangleIcon className={`w-6 h-6 ${severityIconColor[alert.severity]}`} />
          <div>
            <h3 className="font-bold text-slate-100">{alert.type}</h3>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${severityStyles[alert.severity]}`}>{alert.severity}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">{new Date(alert.timestamp).toLocaleTimeString()}</p>
          <p className="text-xs text-slate-500">{new Date(alert.timestamp).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="text-sm text-slate-300 mt-3 space-y-1">
        <p><span className="font-semibold text-slate-400">Source:</span> {alert.sourceIp} ({alert.location.name})</p>
        <p><span className="font-semibold text-slate-400">Status:</span> <span className="text-green-400">{alert.status}</span></p>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onInvestigate(alert)}
          className="w-full text-sm bg-cyan-600/80 text-white py-2 px-4 rounded-md hover:bg-cyan-500 transition-colors"
        >
          Investigate
        </button>
        <button className="w-full text-sm bg-slate-700/80 text-slate-200 py-2 px-4 rounded-md hover:bg-slate-600 transition-colors">
          Mark as Resolved
        </button>
      </div>
    </div>
  );
};

// --- Toast Component ---
const Toast = ({ message }) => (
  <div className="fixed top-5 right-5 bg-cyan-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-up z-50">
    {message}
  </div>
);

// --- Main App Component ---
export default function App() {
  const [alerts, setAlerts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isLogDrawerOpen, setIsLogDrawerOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setAlerts(Array.from({ length: 6 }, (_, i) => generateMockAlert(i + 1)));
    setLogs(Array.from({ length: 50 }, generateMockLog));

    const alertInterval = setInterval(() => {
      const newAlert = generateMockAlert(Date.now());
      setAlerts(prev => [newAlert, ...prev.slice(0, 19)]);
      setToastMessage(`New ${newAlert.severity} alert: ${newAlert.type}`);
      setTimeout(() => setToastMessage(''), 3000);
    }, 5000);

    const logInterval = setInterval(() => {
      setLogs(prev => [...prev.slice(1), generateMockLog()]);
    }, 1000);

    return () => {
      clearInterval(alertInterval);
      clearInterval(logInterval);
    };
  }, []);

  const handleInvestigate = (alert) => setSelectedAlert(alert);
  const handleCloseModal = () => setSelectedAlert(null);
  const filteredAlerts = filterSeverity === 'All' ? alerts : alerts.filter(a => a.severity === filterSeverity);

  return (
    <div className={`${theme === 'dark' ? 'bg-slate-900 text-slate-200' : 'bg-gray-100 text-gray-900'} min-h-screen font-sans transition-colors`}>
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <ShieldCheckIcon className="w-8 h-8 text-cyan-400"/>
          <h1 className="text-2xl font-bold text-slate-100">SOC Dashboard</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsLogDrawerOpen(true)} className="bg-slate-800 text-sm text-slate-300 py-2 px-4 rounded-lg border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors">
            View Live Logs
          </button>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="bg-cyan-600 text-white px-3 py-2 rounded-md hover:bg-cyan-500 transition-colors">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[60vh] lg:h-auto">
          <GlobeVisualizer alerts={alerts} />
        </div>

        <div className="lg:col-span-1 flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-2">High-Priority Alerts</h2>
          <div className="flex gap-2 mb-2">
            {['All', 'Critical', 'High', 'Medium', 'Low'].map(sev => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-3 py-1 rounded-full text-sm font-semibold border transition ${filterSeverity === sev ? 'bg-cyan-500 text-white' : 'border-slate-600 text-slate-200'}`}
              >
                {sev}
              </button>
            ))}
          </div>
          <div className="space-y-4 max-h-[75vh] overflow-y-auto p-1">
            {filteredAlerts.map(alert => (
              <AlertCard key={alert.id} alert={alert} onInvestigate={handleInvestigate} />
            ))}
          </div>
        </div>
      </main>

      {/* Alert Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl shadow-cyan-900/50">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <h2 className="text-xl font-bold text-slate-100">Investigate Alert: #{selectedAlert.id}</h2>
              <button onClick={handleCloseModal} className="p-1 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white">
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-slate-200">
              <p><span className="font-semibold text-slate-400">Type:</span> {selectedAlert.type}</p>
              <p><span className="font-semibold text-slate-400">Severity:</span> {selectedAlert.severity}</p>
              <p><span className="font-semibold text-slate-400">Source IP:</span> {selectedAlert.sourceIp}</p>
              <p><span className="font-semibold text-slate-400">Destination IP:</span> {selectedAlert.destinationIp}</p>
              <p><span className="font-semibold text-slate-400">Location:</span> {selectedAlert.location.name}</p>
              <p><span className="font-semibold text-slate-400">Timestamp:</span> {new Date(selectedAlert.timestamp).toLocaleString()}</p>
              <p><span className="font-semibold text-slate-400">Description:</span> {selectedAlert.description}</p>
              <p><span className="font-semibold text-slate-400">Mitigation:</span> {selectedAlert.mitigation}</p>
            </div>
            <div className="p-4 border-t border-slate-800 flex justify-end gap-3">
              <button onClick={handleCloseModal} className="bg-slate-700 text-slate-200 py-2 px-5 rounded-md hover:bg-slate-600 transition-colors">
                Close
              </button>
              <button className="bg-green-600 text-white py-2 px-5 rounded-md hover:bg-green-500 transition-colors">
                Mark Resolved
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && <Toast message={toastMessage} />}

      {/* Log Drawer */}
      <div className={`fixed top-0 right-0 h-full bg-slate-900/80 backdrop-blur-md border-l border-slate-700 z-40 transition-transform duration-300 ease-in-out ${isLogDrawerOpen ? 'translate-x-0' : 'translate-x-full'} w-full md:w-1/3 lg:w-1/4`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-slate-800">
            <h3 className="text-lg font-bold text-slate-100">Live Log Feed</h3>
            <button onClick={() => setIsLogDrawerOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white">
              <XIcon className="w-6 h-6"/>
            </button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono">
              {logs.map((log, index) => <div key={index} className="animate-fade-in-up">{log}</div>)}
            </pre>
          </div>
          <div className="p-4 border-t border-slate-800">
            <p className="text-xs text-center text-slate-500">Streaming logs in real-time...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
