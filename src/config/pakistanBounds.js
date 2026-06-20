/**
 * Pakistan Geographic Bounds
 * Used to restrict the map view to Pakistan territory only.
 * Prevents users from panning outside national boundaries for focused UX.
 */
export const PAKISTAN_BOUNDS = {
  southWest: [23.5, 60.8],  // Southwest corner (Balochistan coast)
  northEast: [37.1, 77.2],  // Northeast corner (Gilgit-Baltistan)
};

export const PAKISTAN_CENTER = [30.3753, 69.3451]; // Geographic center
export const PAKISTAN_DEFAULT_ZOOM = 6;

/**
 * City centers with coordinates for quick navigation
 */
export const PAKISTAN_CITIES = {
  islamabad: { lat: 33.6844, lng: 73.0479, name: 'Islamabad' },
  rawalpindi: { lat: 33.5651, lng: 73.0169, name: 'Rawalpindi' },
  lahore: { lat: 31.5204, lng: 74.3587, name: 'Lahore' },
  karachi: { lat: 24.8607, lng: 67.0011, name: 'Karachi' },
  peshawar: { lat: 34.0151, lng: 71.5249, name: 'Peshawar' },
  quetta: { lat: 30.1798, lng: 66.9752, name: 'Quetta' },
  faisalabad: { lat: 31.4504, lng: 73.1350, name: 'Faisalabad' },
  multan: { lat: 30.1575, lng: 71.5249, name: 'Multan' },
  sialkot: { lat: 32.4945, lng: 74.5229, name: 'Sialkot' },
  gujranwala: { lat: 32.1877, lng: 74.1945, name: 'Gujranwala' },
  hyderabad: { lat: 25.3960, lng: 68.3578, name: 'Hyderabad' },
  muzaffarabad: { lat: 34.3700, lng: 73.4700, name: 'Muzaffarabad' },
};