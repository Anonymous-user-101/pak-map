import React from 'react';
import { motion } from 'framer-motion';
import { useMapContext } from '../../context/MapContext';
import CityHistory from '../CityInfo/CityHistory';
import { CITIES_WITH_WIKI } from '../../config/cities';
import { ArrowLeft, MapPin } from 'lucide-react';

/**
 * Detail Section - City information with Wikipedia integration
 * Shows history, stats, and interactive content for major cities.
 */
const DetailSection = () => {
  const { selectedCity, setActiveSection } = useMapContext();

  const cityData = selectedCity ? CITIES_WITH_WIKI[selectedCity] : null;

  return (
    <motion.section
      className="detail-section"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
    >
      <button
        className="back-button"
        onClick={() => setActiveSection('map')}
      >
        <ArrowLeft size={18} />
        <span>Back to Map</span>
      </button>

      {!cityData ? (
        <div className="detail-empty">
          <MapPin size={48} />
          <h2>Select a City</h2>
          <p>Click any major city on the map to view its history and details.</p>
        </div>
      ) : (
        <CityHistory city={cityData} />
      )}
    </motion.section>
  );
};

export default DetailSection;