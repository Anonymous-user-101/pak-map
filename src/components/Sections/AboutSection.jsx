import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  MapPin, Shield, Globe, Zap, Eye, Layers,
  Satellite, Smartphone, Code, ArrowDown
} from 'lucide-react';

/**
 * About Section - Apple Maps-style Hero with 3D Interactive Preview
 * 
 * Features:
 * - Parallax hero with animated map preview
 * - Feature grid with hover animations
 * - Technology showcase with interactive elements
 * - Privacy commitment section
 */
const AboutSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const features = [
    {
      icon: Shield,
      title: 'Privacy-First',
      desc: 'Zero tracking, zero telemetry. Your location data stays on your device.',
      color: '#0A84FF',
    },
    {
      icon: Layers,
      title: 'Multi-Layer Maps',
      desc: 'OpenStreetMap, hybrid, and satellite imagery with seamless transitions.',
      color: '#30D158',
    },
    {
      icon: Satellite,
      title: 'ArcGIS Wayback',
      desc: 'Historical satellite imagery from Living Atlas for time-based analysis.',
      color: '#FF9F0A',
    },
    {
      icon: Eye,
      title: 'Security Zones',
      desc: 'Military, nuclear, and restricted areas highlighted on all layers.',
      color: '#FF375F',
    },
    {
      icon: Zap,
      title: 'Flagship Optimized',
      desc: 'Built for high-end devices with premium animations and 3D rendering.',
      color: '#BF5AF2',
    },
    {
      icon: Globe,
      title: 'Pakistan Focused',
      desc: 'Every coordinate, city, and landmark tuned for Pakistan\'s geography.',
      color: '#32D74B',
    },
  ];

  return (
    <motion.section
      ref={containerRef}
      className="about-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero */}
      <motion.div
        className="about-hero"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="about-hero__content">
          <motion.div
            className="hero-badge"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <MapPin size={14} />
            <span>Built for Pakistan</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Pak Map
            <span className="hero-title__accent">Reimagined.</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            A privacy-focused mapping experience designed for precision,
            security, and the unique geography of Pakistan.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button className="btn-primary btn-lg">Explore the Map</button>
            <button className="btn-ghost btn-lg">Learn More</button>
          </motion.div>
        </div>

        {/* 3D Map Preview */}
        <motion.div
          className="hero-map-preview"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
        >
          <div className="map-preview-3d">
            <div className="map-preview__surface">
              <div className="map-preview__layer" />
              <div className="map-preview__pins">
                <div className="pin pin-1" style={{ top: '30%', left: '40%' }}>
                  <MapPin size={16} />
                </div>
                <div className="pin pin-2" style={{ top: '55%', left: '65%' }}>
                  <Shield size={16} />
                </div>
                <div className="pin pin-3" style={{ top: '70%', left: '30%' }}>
                  <MapPin size={16} />
                </div>
              </div>
            </div>
            <div className="map-preview__shadow" />
          </div>
        </motion.div>

        <motion.div
          className="hero-scroll-hint"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={20} />
          <span>Scroll to explore</span>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <div className="about-features">
        <h2 className="section-title">Built different.</h2>
        <p className="section-subtitle">
          Every pixel, every feature, every privacy decision - intentional.
        </p>

        <div className="features-grid">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="feature-card__icon" style={{ background: feat.color + '22', color: feat.color }}>
                <feat.icon size={24} />
              </div>
              <h3 className="feature-card__title">{feat.title}</h3>
              <p className="feature-card__desc">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technology Section */}
      <div className="about-technology">
        <div className="tech-content">
          <h2 className="section-title">Under the hood.</h2>
          <p className="section-subtitle">
            Modern stack. Premium performance. Zero compromise on privacy.
          </p>
          <ul className="tech-list">
            <li>
              <Code size={18} />
              <div>
                <strong>React 18</strong> with concurrent features for fluid interactions
              </div>
            </li>
            <li>
              <Zap size={18} />
              <div>
                <strong>Vite</strong> for lightning-fast builds and hot reload
              </div>
            </li>
            <li>
              <Smartphone size={18} />
              <div>
                <strong>Capacitor-ready</strong> architecture for future Android APK conversion
              </div>
            </li>
            <li>
              <Shield size={18} />
              <div>
                <strong>No third-party analytics</strong> - your data is yours alone
              </div>
            </li>
          </ul>
        </div>
        <div className="tech-visual">
          <div className="tech-visual__orb" />
          <div className="tech-visual__rings">
            <div className="ring ring-1" />
            <div className="ring ring-2" />
            <div className="ring ring-3" />
          </div>
        </div>
      </div>

      {/* Privacy Commitment */}
      <div className="about-privacy">
        <motion.div
          className="privacy-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Shield size={48} className="privacy-card__icon" />
          <h2>Privacy is not a feature.<br />It's the foundation.</h2>
          <p>
            Pak Map never collects, stores, or transmits your personal data.
            No Google Analytics. No Facebook Pixel. No telemetry.
            Just maps - as they should be.
          </p>
          <div className="privacy-stats">
            <div className="privacy-stat">
              <span className="privacy-stat__num">0</span>
              <span className="privacy-stat__label">Tracking Scripts</span>
            </div>
            <div className="privacy-stat">
              <span className="privacy-stat__num">0</span>
              <span className="privacy-stat__label">Data Collected</span>
            </div>
            <div className="privacy-stat">
              <span className="privacy-stat__num">100%</span>
              <span className="privacy-stat__label">Client-Side</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;