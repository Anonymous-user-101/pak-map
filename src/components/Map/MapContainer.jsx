import React, { useEffect } from 'react';
import { MapContainer as LeafletMap, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useMapContext } from '../../context/MapContext';
import { PAKISTAN_BOUNDS } from '../../config/pakistanBounds';
import LayerSwitcher from './LayerSwitcher';
import SecurityOverlays from './SecurityOverlays';
import LandmarkLayer from './LandmarkLayer';
import RouteLayer from '../Navigation/RouteLayer';
import { enforcePakistanBounds } from '../../utils/bounds';

/**
 * Inner map event handler component
 * Uses react-leaflet hooks to access map instance
 */
const MapEvents = () => {
  const map = useMap();
  const { setCenter, setZoom, setDestination } = useMapContext();

  useMapEvents({
    moveend: () => {
      const c = map.getCenter();
      setCenter([c.lat, c.lng]);
      setZoom(map.getZoom());
    },
    click: (e) => {
      // Privacy: Only used for route destination selection
      // No click telemetry sent anywhere
      const { lat, lng } = e.latlng;
      // Right-click-like behavior (ctrl+click) sets destination
      if (e.originalEvent.ctrlKey || e.originalEvent.metaKey) {
        setDestination({ lat, lng, label: `Point (${lat.toFixed(4)}, ${lng.toFixed(4)})` });
      }
    },
  });

  return null;
};

/**
 * Main Map Container
 * Handles all layer rendering and map interactions.
 * 
 * Privacy Design:
 * - No attribution tracking
 * - Client-side only interactions
 * - No tile request telemetry
 */
const PakMapContainer = () => {
  const { center, zoom, mapRef, activeLayer } = useMapContext();

  // Layer configurations - using tile servers WITHOUT tracking
  const TILE_LAYERS = {
    osm: {
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '© OpenStreetMap contributors',
    },
    hybrid: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      labelsUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      attribution: '© Esri, Maxar, Earthstar Geographics',
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '© Esri Wayback Imagery',
    },
  };

  const activeConfig = TILE_LAYERS[activeLayer];

  return (
    <div className="pak-map-wrapper">
      <LeafletMap
        center={center}
        zoom={zoom}
        minZoom={6}
        maxZoom={19}
        maxBounds={PAKISTAN_BOUNDS}
        maxBoundsViscosity={1.0} // Hard block - users cannot pan outside Pakistan
        ref={(ref) => { mapRef.current = ref; }}
        className="pak-map-canvas"
        zoomControl={false}
        attributionControl={false} // Clean UI - attributions in panel
      >
        <MapEvents />

        {/* Base layer */}
        <TileLayer
          key={activeLayer + '-base'}
          url={activeConfig.url}
          attribution={activeConfig.attribution}
          subdomains={['a', 'b', 'c']}
          crossOrigin={false}
        />

        {/* Hybrid labels overlay */}
        {activeLayer === 'hybrid' && activeConfig.labelsUrl && (
          <TileLayer
            url={activeConfig.labelsUrl}
            opacity={0.85}
          />
        )}

        {/* Security zones rendered across ALL layers for visibility */}
        <SecurityOverlays />

        {/* Landmark markers */}
        <LandmarkLayer />

        {/* Route overlay */}
        <RouteLayer />
      </LeafletMap>

      <LayerSwitcher />
    </div>
  );
};

export default PakMapContainer;