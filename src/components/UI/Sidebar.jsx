import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMapContext } from '../../context/MapContext';
import GlassPanel from './GlassPanel';
import SearchBar from '../Navigation/SearchBar';
import RoutePlanner from '../Navigation/RoutePlanner';
import LandmarkFilter from '../Landmarks/LandmarkFilter';
import SecurityFilter from './SecurityFilter';
import {
  Menu, X, MapPin, Navigation, Layers, Shield,
  Info, Filter, Home
} from 'lucide-react';

const Sidebar = () => {
  const { activeSection, setActiveSection } = useMapContext();
  const [expanded, setExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('search');

  const tabs = [
    { id: 'search', icon: MapPin, label: 'Search' },
    { id: 'route', icon: Navigation, label: 'Route' },
    { id: 'filters', icon: Filter, label: 'Filters' },
    { id: 'security', icon: Shield, label: 'Security' },
  ];

  return (
    <>
      <motion.button
        className="sidebar-toggle glass-button"
        onClick={() => setExpanded(!expanded)}
        whileTap={{ scale: 0.9 }}
      >
        {expanded ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.aside
            className="sidebar glass-panel--sidebar"
            initial={{ x: -380, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -380, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="sidebar__header">
              <div className="sidebar__logo">
                <div className="logo-mark">
                  <MapPin size={18} />
                </div>
                <div>
                  <h2>Pak Map</h2>
                  <span className="sidebar__tagline">Privacy • Precision • Pakistan</span>
                </div>
              </div>
            </div>

            <div className="sidebar__section-nav">
              <button
                className={`section-btn ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => setActiveSection('about')}
              >
                <Info size={14} /> About
              </button>
              <button
                className={`section-btn ${activeSection === 'map' ? 'active' : ''}`}
                onClick={() => setActiveSection('map')}
              >
                <MapPin size={14} /> Map
              </button>
            </div>

            <div className="sidebar__tabs">
              {tabs.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  className={`sidebar__tab ${activeTab === id ? 'active' : ''}`}
                  onClick={() => setActiveTab(id)}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <div className="sidebar__content">
              <AnimatePresence mode="wait">
                {activeTab === 'search' && <SearchBar key="search" />}
                {activeTab === 'route' && <RoutePlanner key="route" />}
                {activeTab === 'filters' && <LandmarkFilter key="filters" />}
                {activeTab === 'security' && <SecurityFilter key="security" />}
              </AnimatePresence>
            </div>

            <div className="sidebar__footer">
              <div className="privacy-badge">
                <Shield size={14} />
                <span>Zero Tracking • Zero Telemetry</span>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;