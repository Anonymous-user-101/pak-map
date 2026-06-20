import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useMapContext } from '../../context/MapContext';
import { LANDMARK_CATEGORIES, DEFAULT_LANDMARKS } from '../../config/landmarks';

/**
 * Creates a crisp SVG-based marker icon for retina displays
 */
const createLandmarkIcon = (emoji, color) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="22" fill="${color}" fill-opacity="0.95" stroke="white" stroke-width="3"/>
      <circle cx="24" cy="24" r="22" fill="none" stroke="${color}" stroke-opacity="0.3" stroke-width="6"/>
      <text x="24" y="32" text-anchor="middle" font-size="24" font-family="system-ui">${emoji}</text>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: 'landmark-icon',
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });
};

/**
 * Landmark Layer
 * Renders category-filtered markers with custom SVG icons.
 * Markers are generated client-side - no external APIs called.
 */
const LandmarkLayer = () => {
  const { activeLandmarks } = useMapContext();

  const visibleLandmarks = DEFAULT_LANDMARKS.filter(lm =>
    activeLandmarks.includes(lm.category)
  );

  return (
    <>
      {visibleLandmarks.map((lm) => {
        const cat = LANDMARK_CATEGORIES[lm.category];
        return (
          <Marker
            key={lm.id}
            position={lm.coords}
            icon={createLandmarkIcon(cat.icon, cat.color)}
          >
            <Popup>
              <div className="landmark-popup">
                <h4>{cat.icon} {lm.name}</h4>
                <span>{cat.label}</span>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default LandmarkLayer;