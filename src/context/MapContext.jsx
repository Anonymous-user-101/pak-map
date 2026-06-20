import React, { createContext, useContext, useState, useRef } from 'react';
import { PAKISTAN_CENTER, PAKISTAN_DEFAULT_ZOOM } from '../config/pakistanBounds';
import { DEFAULT_LANDMARKS } from '../config/landmarks';

const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
  const mapRef = useRef(null);

  const [activeLayer, setActiveLayer] = useState('osm');
  const [center, setCenter] = useState(PAKISTAN_CENTER);
  const [zoom, setZoom] = useState(PAKISTAN_DEFAULT_ZOOM);
  const [activeLandmarks, setActiveLandmarks] = useState(
    [...new Set(DEFAULT_LANDMARKS.map(lm => lm.category))]
  );
  const [activeSecurityZones, setActiveSecurityZones] = useState(true);
  const [route, setRoute] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [activeSection, setActiveSection] = useState('about');

  const value = {
    mapRef,
    activeLayer, setActiveLayer,
    center, setCenter,
    zoom, setZoom,
    activeLandmarks, setActiveLandmarks,
    activeSecurityZones, setActiveSecurityZones,
    route, setRoute,
    origin, setOrigin,
    destination, setDestination,
    selectedCity, setSelectedCity,
    activeSection, setActiveSection,
  };

  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error('useMapContext must be used within MapProvider');
  return ctx;
};