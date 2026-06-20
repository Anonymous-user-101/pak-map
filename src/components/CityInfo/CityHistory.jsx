import React from 'react';
import { motion } from 'framer-motion';
import { useWikipedia } from '../../hooks/useWikipedia';
import {
  Calendar, Users, MapPin, Building, Loader2,
  ExternalLink, Image as ImageIcon
} from 'lucide-react';

/**
 * City History Component
 * Displays city information with Wikipedia content.
 * Competes with Apple/Google Maps city info cards.
 */
const CityHistory = ({ city }) => {
  const { data: wiki, loading, error } = useWikipedia(city.wikiSlug);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="city-history"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero */}
      <motion.div className="city-history__hero" variants={itemVariants}>
        {wiki?.thumbnail && (
          <img src={wiki.thumbnail} alt={city.name} className="city-history__image" />
        )}
        <div className="city-history__hero-overlay">
          <h1>{city.name}</h1>
          <p>{city.province}</p>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div className="city-stats" variants={itemVariants}>
        <div className="city-stat">
          <Calendar size={16} />
          <div>
            <span className="city-stat__value">{city.founded}</span>
            <span className="city-stat__label">Founded</span>
          </div>
        </div>
        <div className="city-stat">
          <Users size={16} />
          <div>
            <span className="city-stat__value">{city.population}</span>
            <span className="city-stat__label">Population</span>
          </div>
        </div>
        <div className="city-stat">
          <Building size={16} />
          <div>
            <span className="city-stat__value">{city.province}</span>
            <span className="city-stat__label">Province</span>
          </div>
        </div>
      </motion.div>

      {/* Description from Wikipedia */}
      <motion.div className="city-section" variants={itemVariants}>
        <h3>About {city.name}</h3>
        {loading && (
          <div className="city-loading">
            <Loader2 size={20} className="spin" />
            <span>Loading from Wikipedia...</span>
          </div>
        )}
        {error && (
          <div className="city-error">
            <MapPin size={18} />
            <span>Unable to load details: {error}</span>
          </div>
        )}
        {!loading && !error && wiki && (
          <>
            <p className="city-description">{wiki.description}</p>
            <p className="city-extract">{wiki.extract}</p>
            {wiki.fullExtract && (
              <div className="city-full-extract">
                <h4>History</h4>
                <p>{wiki.fullExtract.substring(0, 600)}...</p>
              </div>
            )}
            {wiki.url && (
              <a href={wiki.url} target="_blank" rel="noopener noreferrer" className="city-wiki-link">
                <ExternalLink size={14} />
                Read full article on Wikipedia
              </a>
            )}
          </>
        )}
      </motion.div>

      {/* Highlights */}
      <motion.div className="city-section" variants={itemVariants}>
        <h3>Highlights</h3>
        <div className="city-highlights">
          {city.highlights.map((h, idx) => (
            <div key={idx} className="highlight-chip">
              <MapPin size={14} />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CityHistory;