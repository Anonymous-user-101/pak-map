import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable iOS 26.3 Glass Morphism Panel
 * Uses backdrop-filter for frosted glass effect.
 */
const GlassPanel = ({ children, className = '', variant = 'default', ...props }) => {
  const variants = {
    default: 'glass-panel',
    floating: 'glass-panel glass-panel--floating',
    sidebar: 'glass-panel glass-panel--sidebar',
    modal: 'glass-panel glass-panel--modal',
    bottom: 'glass-panel glass-panel--bottom',
  };

  return (
    <motion.div
      className={`${variants[variant]} ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassPanel;