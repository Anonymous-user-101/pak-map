import React from 'react';
import { motion } from 'framer-motion';
import PakMapContainer from '../Map/MapContainer';
import Sidebar from '../UI/Sidebar';
import TopBar from '../UI/TopBar';

/**
 * Map Section - Main interactive map interface
 * Combines sidebar, topbar, and full-screen map canvas.
 */
const MapSection = () => {
  return (
    <motion.section
      className="map-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TopBar />
      <Sidebar />
      <PakMapContainer />
    </motion.section>
  );
};

export default MapSection;