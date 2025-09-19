// File: frontend/src/App.jsx

import { MantineProvider, Text, Title, Code } from '@mantine/core';
import { useState, useEffect } from 'react';
import GeoMap from './components/GeoMap'; // Import the new component

function App() {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This is the fetch logic you already have
    const fetchAlerts = () => {
      fetch('http://localhost:8000/api/alerts')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log("Fetched data:", data);
          setAlerts(data);
        })
        .catch(error => {
          console.error("Fetch Error:", error);
          setError("Failed to connect to the backend. Is it running?");
        });
    };

    fetchAlerts();
    const intervalId = setInterval(fetchAlerts, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <div style={{ padding: '2rem' }}>
        <Title order={1}>🛡️ Aura Sentinel Dashboard</Title>
        <Text c="dimmed" mb="xl">Connection Status Test</Text>

        {error && <Code color="red">{error}</Code>}

        {/* This is the new GeoMap component */}
        {alerts.length > 0 ? (
          <GeoMap alerts={alerts} />
        ) : (
          !error && <Text>Fetching data from backend...</Text>
        )}

      </div>
    </MantineProvider>
  );
}

export default App;