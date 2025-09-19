// File: frontend/src/components/GeoMap.jsx

import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";
import { Tooltip, Box } from "@mantine/core";

// URL to a world map data file
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// The GeoMap component accepts an array of alerts as a prop
const GeoMap = ({ alerts }) => {
  // Define a set of 'normal' locations for demonstration
  const normalLocations = {
    user_alex: { lat: 19.0760, lon: 72.8777 }, // Mumbai
    user_maria: { lat: 28.7041, lon: 77.1025 }, // Delhi
  };

  return (
    <Box sx={{ border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
      <ComposableMap
        projectionConfig={{
          scale: 120,
        }}
        style={{
          width: "100%",
          height: "auto",
          backgroundColor: "#1A1B1E",
          stroke: "#2C2E33",
          strokeWidth: 0.5,
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "#3A3B3E",
                    outline: "none",
                  },
                  hover: {
                    fill: "#4A4B4E",
                    outline: "none",
                  },
                  pressed: {
                    fill: "#4A4B4E",
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>

        {alerts.map((alert) => {
          // Get the normal location for this user
          const normalGeo = normalLocations[alert.user];
          if (!normalGeo) return null;

          return (
            <React.Fragment key={alert.id}>
              {/* Draw an animated line from the normal location to the anomaly */}
              <Line
                from={[normalGeo.lon, normalGeo.lat]}
                to={[alert.geo.lon, alert.geo.lat]}
                stroke="#FF2800"
                strokeWidth={2}
                strokeLinecap="round"
              />

              {/* Marker for the anomalous location */}
              <Tooltip
                label={`Anomaly: ${alert.location}`}
                withArrow
                position="top"
                color="red"
              >
                <Marker coordinates={[alert.geo.lon, alert.geo.lat]}>
                  <circle r={7} fill="#FF2800" stroke="#FF5050" strokeWidth={2} />
                </Marker>
              </Tooltip>

              {/* Marker for the user's normal location */}
              <Tooltip
                label={`Normal: ${alert.user}'s home`}
                withArrow
                position="top"
                color="blue"
              >
                <Marker coordinates={[normalGeo.lon, normalGeo.lat]}>
                  <circle r={5} fill="#40C057" stroke="#69DB7C" strokeWidth={1} />
                </Marker>
              </Tooltip>
            </React.Fragment>
          );
        })}
      </ComposableMap>
    </Box>
  );
};

export default GeoMap;