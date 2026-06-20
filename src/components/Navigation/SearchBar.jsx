import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, X, Navigation, Loader2 } from 'lucide-react';
import { useMapContext } from '../../context/MapContext';
import { PAKISTAN_CITIES } from '../../config/pakistanBounds';

/**
 * Search Bar with Autocomplete
 * 
 * Privacy: Queries are sent to Nominatim (OpenStreetMap) only.
 * Results are limited to Pakistan via viewbox parameter.
 */
const SearchBar = () => {
  const { setCenter, setZoom, setDestination } = useMapContext();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const debounceRef = useRef(null);

  // City suggestions from config
  const citySuggestions = Object.values(PAKISTAN_CITIES).filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.length < 3) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        // Nominatim search restricted to Pakistan
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&countrycodes=pk&limit=8&viewbox=60.8,23.5,77.2,37.1&bounded=1`;
        const res = await fetch(url, {
          headers: { 'User-Agent': 'PakMap/1.0 (privacy-focused)' }
        });
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error('Search failed:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const selectResult = (item) => {
    const coords = { lat: parseFloat(item.lat), lng: parseFloat(item.lon) };
    setCenter([coords.lat, coords.lng]);
    setZoom(15);
    setQuery(item.display_name);
    setResults([]);
  };

  const selectCity = (city) => {
    setCenter([city.lat, city.lng]);
    setZoom(13);
    setQuery(city.name);
    setDestination({ lat: city.lat, lng: city.lng, label: city.name });
  };

  return (
    <div className="search-bar">
      <div className={`search-input-wrapper ${focused ? 'focused' : ''}`}>
        <Search size={18} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search cities, places, landmarks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
        />
        {loading && <Loader2 size={16} className="search-loading" />}
        {query && !loading && (
          <button className="search-clear" onClick={() => setQuery('')}>
            <X size={14} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {focused && (query || citySuggestions.length > 0) && (
          <motion.div
            className="search-results glass-panel"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {citySuggestions.length > 0 && (
              <div className="search-section">
                <div className="search-section__header">Quick Cities</div>
                {citySuggestions.map((city) => (
                  <motion.button
                    key={city.name}
                    className="search-result-item"
                    onClick={() => selectCity(city)}
                    whileHover={{ x: 4 }}
                  >
                    <Navigation size={16} />
                    <div>
                      <div className="result-name">{city.name}</div>
                      <div className="result-meta">Major City</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {results.length > 0 && (
              <div className="search-section">
                <div className="search-section__header">Places</div>
                {results.map((r, idx) => (
                  <motion.button
                    key={idx}
                    className="search-result-item"
                    onClick={() => selectResult(r)}
                    whileHover={{ x: 4 }}
                  >
                    <MapPin size={16} />
                    <div>
                      <div className="result-name">{r.display_name.split(',')[0]}</div>
                      <div className="result-meta">{r.display_name}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {!loading && results.length === 0 && citySuggestions.length === 0 && query.length >= 3 && (
              <div className="search-empty">No results in Pakistan</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;