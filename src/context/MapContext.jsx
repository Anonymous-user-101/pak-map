import React, { createContext, useContext, useState, useRef } from 'react';
import { PAKISTAN_CENTER, PAKISTAN_DEFAULT_ZOOM } from '../config/pakistanBounds';

const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
  const mapRef = useRef(null);

  const [activeLayer, setActiveLayer] = useState('osm'); // 'osm' | 'hybrid' | 'satellite'
  const [center, setCenter] = useState(PAKISTAN_CENTER);
  const [zoom, setZoom] = useState(PAKISTAN_DEFAULT_ZOOM);
  const [activeLandmarks, setActiveLandmarks] = useState(
    Object.keys(LANDMARK_DEFAULTS)
  );
  const [activeSecurityZones, setActiveSecurityZones] = useState(true);
  const [route, setRoute] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [activeSection, setActiveSection] = useState('about'); // 'about' | 'map' | 'detail'

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