import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  CornerDownRight, CornerDownLeft, Flag
} from 'lucide-react';

/**
 * Turn-by-Turn Navigation Display
 * Google Maps-like step-by-step directions.
 */
const TurnByTurn = ({ route }) => {
  if (!route?.steps) return null;

  const getManeuverIcon = (type) => {
    const t = type?.toLowerCase() || '';
    if (t.includes('right')) return <CornerDownRight size={18} />;
    if (t.includes('left')) return <CornerDownLeft size={18} />;
    if (t.includes('straight')) return <ArrowUp size={18} />;
    if (t.includes('arrive')) return <Flag size={18} />;
    return <ArrowUp size={18} />;
  };

  const formatDistance = (m) => {
    if (m < 1000) return `${Math.round(m)} m`;
    return `${(m / 1000).toFixed(1)} km`;
  };

  const formatDuration = (s) => {
    const mins = Math.round(s / 60);
    if (mins < 60) return `${mins} min`;
    const hrs = Math.floor(mins / 60);
    const remain = mins % 60;
    return `${hrs}h ${remain}m`;
  };

  return (
    <div className="turn-by-turn">
      <div className="tbt__summary">
        <div className="tbt__summary-item">
          <span className="tbt__label">Distance</span>
          <span className="tbt__value">{formatDistance(route.distance)}</span>
        </div>
        <div className="tbt__summary-item">
          <span className="tbt__label">Duration</span>
          <span className="tbt__value">{formatDuration(route.duration)}</span>
        </div>
      </div>

      <div className="tbt__steps">
        {route.steps.map((step, idx) => (
          <motion.div
            key={idx}
            className="tbt__step"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <div className="tbt__step-icon">
              {getManeuverIcon(step.maneuver?.type)}
            </div>
            <div className="tbt__step-content">
              <div className="tbt__step-name">
                {step.name || step.maneuver?.type || 'Continue'}
              </div>
              <div className="tbt__step-meta">
                {formatDistance(step.distance)} • {formatDuration(step.duration)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TurnByTurn;