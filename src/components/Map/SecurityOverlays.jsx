import React, { useState } from 'react';
import { Circle, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import { useMapContext } from '../../context/MapContext';
import { SECURITY_ZONES, SECURITY_CATEGORIES } from '../../config/securityZones';
import { ShieldAlert, X } from 'lucide-react';

/**
 * Security Zone Overlays
 * Renders all restricted military, nuclear, and government zones
 * across ALL map layers (OSM, hybrid, satellite).
 * 
 * Design: Uses pulsing animation for prominence,
 * dashed borders for red zones, solid for active installations.
 */
const SecurityOverlays = () => {
  const { activeSecurityZones } = useMapContext();
  const [selectedZone, setSelectedZone] = useState(null);

  if (!activeSecurityZones) return null;

  const zones = Object.values(SECURITY_ZONES);

  return (
    <>
      {zones.map((zone, idx) => (
        <React.Fragment key={zone.id}>
          <Circle
            center={zone.coordinates}
            radius={zone.radius}
            pathOptions={{
              color: zone.color,
              fillColor: zone.color,
              fillOpacity: zone.prominence === 'high' ? 0.35 : 0.25,
              weight: zone.prominence === 'high' ? 4 : 2,
              dashArray: zone.dashed ? '10, 5' : undefined,
            }}
            eventHandlers={{
              click: () => setSelectedZone(zone),
            }}
          />
        </React.Fragment>
      ))}

      {selectedZone && (
        <SecurityZoneModal zone={selectedZone} onClose={() => setSelectedZone(null)} />
      )}
    </>
  );
};

const SecurityZoneModal = ({ zone, onClose }) => {
  const category = SECURITY_CATEGORIES[zone.type] || {};

  return (
    <motion.div
      className="security-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-panel security-modal"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="security-modal__close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="security-modal__header" style={{ borderColor: zone.color }}>
          <div className="security-modal__icon" style={{ background: zone.color }}>
            <span>{category.icon || '⚠️'}</span>
          </div>
          <div>
            <h3>{zone.name}</h3>
            <span className="security-modal__category">{zone.category}</span>
          </div>
        </div>

        <div className="security-modal__body">
          <p>{zone.description}</p>

          <div className="security-modal__stats">
            <div className="stat">
              <span className="stat__label">Radius</span>
              <span className="stat__value">{(zone.radius / 1000).toFixed(1)} km</span>
            </div>
            <div className="stat">
              <span className="stat__label">Type</span>
              <span className="stat__value">{category.label}</span>
            </div>
            <div className="stat">
              <span className="stat__label">Status</span>
              <span className="stat__value" style={{ color: zone.color }}>RESTRICTED</span>
            </div>
          </div>

          <div className="security-modal__warning">
            <ShieldAlert size={18} />
            <p>
              This area is designated as a restricted zone. Unauthorized entry may be
              subject to legal action under Pakistan's security regulations.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SecurityOverlays;