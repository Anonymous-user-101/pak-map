import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MapProvider } from './context/MapContext';
import { PrivacyProvider } from './context/PrivacyContext';
import './index.css';
import './styles/material3.css';
import './styles/glass.css';
import './styles/animations.css';
import './styles/responsive.css';
import 'leaflet/dist/leaflet.css';

// Privacy: Inject session-only identifier (no persistence, no server sync)
const sessionToken = crypto.randomUUID();
window.__PAKMAP_SESSION__ = sessionToken;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrivacyProvider>
      <MapProvider>
        <App />
      </MapProvider>
    </PrivacyProvider>
  </React.StrictMode>
);