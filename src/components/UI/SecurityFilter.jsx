import React from 'react';
import { useMapContext } from '../../context/MapContext';
import { SECURITY_CATEGORIES } from '../../config/securityZones';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

/**
 * Security Zone Visibility Toggle
 * Users can show/hide restricted area overlays.
 */
const SecurityFilter = () => {
  const { activeSecurityZones, setActiveSecurityZones } = useMapContext();

  return (
    <div className="security-filter">
      <div className="security-filter__header">
        <Shield size={18} />
        <span>Security Zones</span>
      </div>

      <p className="security-filter__desc">
        Military, nuclear, and government restricted zones are displayed
        across all map layers for situational awareness.
      </p>

      <motion.button
        className={`security-toggle ${activeSecurityZones ? 'active' : ''}`}
        onClick={() => setActiveSecurityZones(!activeSecurityZones)}
      >
        {activeSecurityZones ? <ShieldCheck size={20} /> : <ShieldAlert size={20} />}
        <div>
          <div className="security-toggle__label">
            {activeSecurityZones ? 'Visible on All Layers' : 'Hidden'}
          </div>
          <div className="security-toggle__desc">
            {activeSecurityZones ? 'Click to hide restricted zones' : 'Click to show'}
          </div>
        </div>
      </motion.button>

      <div className="security-categories">
        {Object.values(SECURITY_CATEGORIES).map((cat, idx) => (
          <div key={idx} className="security-category">
            <span className="security-category__icon">{cat.icon}</span>
            <span className="security-category__label">{cat.label}</span>
            <div
              className="security-category__dot"
              style={{ background: cat.color }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Add motion wrapper
import { motion } from 'framer-motion';
export default SecurityFilter;