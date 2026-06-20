import React from 'react';
import { motion } from 'framer-motion';
import { useMapContext } from '../../context/MapContext';
import { Map as MapIcon, Satellite, Layers } from 'lucide-react';

/**
 * Layer Switcher with iOS Glass morphism
 * Allows users to toggle between OSM, Hybrid, and Satellite views
 */
const LayerSwitcher = () => {
  const { activeLayer, setActiveLayer } = useMapContext();

  const layers = [
    { id: 'osm', label: 'Map', icon: MapIcon, desc: 'Street View' },
    { id: 'hybrid', label: 'Hybrid', icon: Layers, desc: 'Mixed View' },
    { id: 'satellite', label: 'Satellite', icon: Satellite, desc: 'Aerial View' },
  ];

  return (
    <motion.div
      className="glass-panel layer-switcher"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div className="layer-switcher__header">
        <Layers size={16} />
        <span>Layers</span>
      </div>
      <div className="layer-switcher__options">
        {layers.map(({ id, label, icon: Icon, desc }) => (
          <motion.button
            key={id}
            className={`layer-option ${activeLayer === id ? 'active' : ''}`}
            onClick={() => setActiveLayer(id)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="layer-option__icon">
              <Icon size={20} />
            </div>
            <div className="layer-option__info">
              <span className="layer-option__label">{label}</span>
              <span className="layer-option__desc">{desc}</span>
            </div>
            {activeLayer === id && <div className="layer-option__dot" />}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default LayerSwitcher;