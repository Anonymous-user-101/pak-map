import React, { useEffect, useState } from 'react';
import { Polyline } from 'react-leaflet';
import { useMapContext } from '../../context/MapContext';
import { useRoute } from '../../hooks/useRoute';

/**
 * Route Layer
 * Displays the calculated route as a polyline.
 * Uses OSRM public demo server - no user tracking.
 */
const RouteLayer = () => {
  const { origin, destination, route, setRoute } = useMapContext();
  const { calculateRoute } = useRoute();

  useEffect(() => {
    if (origin && destination) {
      calculateRoute(origin, destination).then(setRoute);
    }
  }, [origin, destination]);

  if (!route?.geometry?.coordinates) return null;

  const positions = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);

  return (
    <>
      {/* Shadow line */}
      <Polyline
        positions={positions}
        pathOptions={{ color: '#000', weight: 8, opacity: 0.3 }}
      />
      {/* Main route line */}
      <Polyline
        positions={positions}
        pathOptions={{
          color: '#0A84FF',
          weight: 6,
          opacity: 0.95,
          lineCap: 'round',
          lineJoin: 'round',
        }}
      />
    </>
  );
};

export default RouteLayer;