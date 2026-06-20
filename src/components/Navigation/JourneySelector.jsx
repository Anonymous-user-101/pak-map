import React from 'react';
import { motion } from 'framer-motion';
import { Car, Bus, Footprints, Timer } from 'lucide-react';

/**
 * Journey Mode Selector
 * Travel modes: Driving, Transit, Walking
 */
const JourneySelector = ({ route }) => {
  const [mode, setMode] = React.useState('driving');

  const modes = [
    { id: 'driving', icon: Car, label: 'Driving' },
    { id: 'transit', icon: Bus, label: 'Transit' },
    { id: 'walking', icon: Footprints, label: 'Walking' },
  ];

  return (
    <div className="journey-selector">
      <div className="journey-selector__modes">
        {modes.map(({ id, icon: Icon, label }) => (
          <motion.button
            key={id}
            className={`journey-mode ${mode === id ? 'active' : ''}`}
            onClick={() => setMode(id)}
            whileTap={{ scale: 0.95 }}
          >
            <Icon size={18} />
            <span>{label}</span>
          </motion.button>
        ))}
      </div>

      {route && (
        <div className="journey-selector__stats">
          <div className="journey-stat">
            <Timer size={14} />
            <span>{Math.round(route.duration / 60)} min</span>
          </div>
          <div className="journey-stat">
            <span>{(route.distance / 1000).toFixed(1)} km</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default JourneySelector;