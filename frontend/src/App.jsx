// File: frontend/src/App.jsx

import { MantineProvider, Text, Title, Code, Card } from '@mantine/core';
import { useState, useEffect } from 'react';

function App() {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the Python backend
    fetch('http://localhost:8000/api/alerts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched data:", data); // Log to see the raw data
        setAlerts(data);
      })
      .catch(error => {
        console.error("Fetch Error:", error);
        setError("Failed to connect to the backend. Is it running?");
      });
  }, []); // The empty array means this runs once when the component loads

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <div style={{ padding: '2rem' }}>
        <Title order={1}>🛡️ Aura Sentinel Dashboard</Title>
        <Text c="dimmed" mb="xl">Connection Status Test</Text>

        {error && <Code color="red">{error}</Code>}

        {alerts.length > 0 ? (
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Title order={3}>Successfully Fetched Data:</Title>
            <pre>{JSON.stringify(alerts, null, 2)}</pre>
          </Card>
        ) : (
          !error && <Text>Fetching data from backend...</Text>
        )}
      </div>
    </MantineProvider>
  );
}

export default App;
