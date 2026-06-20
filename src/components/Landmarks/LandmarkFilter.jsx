import React from 'react';
import { motion } from 'framer-motion';
import { useMapContext } from '../../context/MapContext';
import { LANDMARK_CATEGORIES } from '../../config/landmarks';
import { Check } from 'lucide-react';

/**
 * Landmark Category Filter
 * Toggle categories on/off with iOS switch-like UI.
 */
const LandmarkFilter = () => {
  const { activeLandmarks, setActiveLandmarks } = useMapContext();
  const categories = Object.entries(LANDMARK_CATEGORIES);

  const toggleCategory = (id) => {
    if (activeLandmarks.includes(id)) {
      setActiveLandmarks(activeLandmarks.filter(c => c !== id));
    } else {
      setActiveLandmarks([...activeLandmarks, id]);
    }
  };

  const allOn = activeLandmarks.length === categories.length;
  const noneOn = activeLandmarks.length === 0;

  return (
    <div className="landmark-filter">
      <div className="landmark-filter__header">
        <span>Landmark Categories</span>
        <div className="landmark-filter__actions">
          <button
            className="link-btn"
            onClick={() => setActiveLandmarks(categories.map(([id]) => id))}
            disabled={allOn}
          >
            All
          </button>
          <button
            className="link-btn"
            onClick={() => setActiveLandmarks([])}
            disabled={noneOn}
          >
            None
          </button>
        </div>
      </div>

      <div className="landmark-filter__list">
        {categories.map(([id, cat]) => {
          const active = activeLandmarks.includes(id);
          return (
            <motion.button
              key={id}
              className={`landmark-toggle ${active ? 'active' : ''}`}
              onClick={() => toggleCategory(id)}
              whileTap={{ scale: 0.97 }}
            >
              <div
                className="landmark-toggle__icon"
                style={{ background: cat.color + '33' }}
              >
                <span>{cat.icon}</span>
              </div>
              <span className="landmark-toggle__label">{cat.label}</span>
              <div className={`landmark-toggle__check ${active ? 'on' : ''}`}>
                {active && <Check size={14} />}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default LandmarkFilter;