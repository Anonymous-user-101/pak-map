import { PAKISTAN_BOUNDS } from '../config/pakistanBounds';

/**
 * Enforce Pakistan bounds on map interactions
 * Rejects coordinates outside national territory
 */
export const enforcePakistanBounds = (lat, lng) => {
  const [swLat, swLng] = PAKISTAN_BOUNDS.southWest;
  const [neLat, neLng] = PAKISTAN_BOUNDS.northEast;

  return {
    lat: Math.max(swLat, Math.min(neLat, lat)),
    lng: Math.max(swLng, Math.min(neLng, lng)),
    inBounds: lat >= swLat && lat <= neLat && lng >= swLng && lng <= neLng,
  };
};

export const formatCoordinates = (lat, lng, precision = 4) => {
  return `${lat.toFixed(precision)}°N, ${lng.toFixed(precision)}°E`;
};