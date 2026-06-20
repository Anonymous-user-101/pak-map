import React from 'react';
import { useMapContext } from '../../context/MapContext';
import { MapPin, Info, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Top navigation bar with section switcher
 */
const TopBar = () => {
  const { activeSection, setActiveSection } = useMapContext();

  const sections = [
    { id: 'about', label: 'About', icon: Info },
    { id: 'map', label: 'Map', icon: MapPin },
  ];

  return (
    <motion.header
      className="top-bar glass-panel--top"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
    >
      <div className="top-bar__brand">
        <div className="brand-logo">
          <MapPin size={20} />
        </div>
        <span className="brand-name">Pak Map</span>
      </div>

      <nav className="top-bar__nav">
        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`top-nav-item ${activeSection === id ? 'active' : ''}`}
            onClick={() => setActiveSection(id)}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="top-bar__status">
        <div className="status-indicator online" />
        <span>Privacy Mode Active</span>
      </div>
    </motion.header>
  );
};

export default TopBar;