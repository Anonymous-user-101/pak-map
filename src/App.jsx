import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMapContext } from './context/MapContext';
import AboutSection from './components/Sections/AboutSection';
import MapSection from './components/Sections/MapSection';
import DetailSection from './components/Sections/DetailSection';
import TopBar from './components/UI/TopBar';

const App = () => {
  const { activeSection } = useMapContext();

  return (
    <div className="app">
      <TopBar />
      <AnimatePresence mode="wait">
        {activeSection === 'about' && <AboutSection key="about" />}
        {activeSection === 'map' && <MapSection key="map" />}
        {activeSection === 'detail' && <DetailSection key="detail" />}
      </AnimatePresence>
    </div>
  );
};

export default App;