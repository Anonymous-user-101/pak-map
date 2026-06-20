import { useState } from 'react';

/**
 * Route Calculation Hook
 * Uses OSRM (Open Source Routing Machine) demo server.
 * 
 * Privacy Note: Coordinates are sent ONLY to OSRM for routing calculation.
 * No user identifier, session, or metadata is transmitted.
 * For production, self-host OSRM for complete privacy.
 */
export const useRoute = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateRoute = async (origin, destination) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson&steps=true`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Routing service error: ${res.status}`);
      const data = await res.json();

      if (!data.routes?.[0]) {
        throw new Error('No route found between points');
      }

      return {
        geometry: data.routes[0].geometry,
        distance: data.routes[0].distance, // meters
        duration: data.routes[0].duration, // seconds
        steps: data.routes[0].legs[0].steps,
      };
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { calculateRoute, loading, error };
};