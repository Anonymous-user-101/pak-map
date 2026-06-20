import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMapContext } from '../../context/MapContext';
import { PAKISTAN_CITIES } from '../../config/pakistanBounds';
import { Navigation2, ArrowRight, MapPin, User } from 'lucide-react';
import TurnByTurn from './TurnByTurn';
import JourneySelector from './JourneySelector';

/**
 * Route Planner - Dual Input Method
 * Supports: 1) Text-based city input, 2) Click-to-select on map
 */
const RoutePlanner = () => {
  const { origin, setOrigin, destination, setDestination, route } = useMapContext();
  const [showJourney, setShowJourney] = useState(false);

  const selectAsOrigin = (city) => {
    setOrigin({ lat: city.lat, lng: city.lng, label: city.name });
  };

  const selectAsDestination = (city) => {
    setDestination({ lat: city.lat, lng: city.lng, label: city.name });
  };

  return (
    <div className="route-planner">
      <div className="route-planner__header">
        <Navigation2 size={18} />
        <span>Route Planner</span>
        <span className="route-hint">Ctrl+Click map to set destination</span>
      </div>

      {/* Origin input */}
      <div className="route-field">
        <div className="route-field__icon origin">
          <User size={14} />
        </div>
        <div className="route-field__content">
          <label>From</label>
          <select
            value={origin?.label || ''}
            onChange={(e) => {
              const city = PAKISTAN_CITIES[e.target.value];
              if (city) selectAsOrigin(city);
            }}
          >
            <option value="">Your Location</option>
            {Object.entries(PAKISTAN_CITIES).map(([key, city]) => (
              <option key={key} value={key}>{city.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Destination input */}
      <div className="route-field">
        <div className="route-field__icon destination">
          <MapPin size={14} />
        </div>
        <div className="route-field__content">
          <label>To</label>
          <select
            value={destination?.label || ''}
            onChange={(e) => {
              const city = PAKISTAN_CITIES[e.target.value];
              if (city) selectAsDestination(city);
            }}
          >
            <option value="">Choose destination</option>
            {Object.entries(PAKISTAN_CITIES).map(([key, city]) => (
              <option key={key} value={key}>{city.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Journey options */}
      {origin && destination && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <JourneySelector route={route} />
          <button
            className="btn-primary"
            onClick={() => setShowJourney(!showJourney)}
          >
            {showJourney ? 'Hide' : 'Show'} Turn-by-Turn
          </button>
          {showJourney && route && <TurnByTurn route={route} />}
        </motion.div>
      )}
    </div>
  );
};

export default RoutePlanner;