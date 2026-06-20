/**
 * Landmark Categories with Favicon/Marker Icons
 * Icons rendered as SVG for crisp display on retina displays
 */

export const LANDMARK_CATEGORIES = {
  cars: { label: 'Cars', icon: '🚗', color: '#FF6B6B' },
  airports: { label: 'Airports', icon: '✈️', color: '#4ECDC4' },
  busStands: { label: 'Bus Stands', icon: '🚌', color: '#FFE66D' },
  schools: { label: 'Schools/Colleges', icon: '🎓', color: '#A8E6CF' },
  hospitals: { label: 'Hospitals', icon: '🏥', color: '#FF6B9D' },
  ports: { label: 'Ports', icon: '⚓', color: '#16213E' },
  restaurants: { label: 'Restaurants', icon: '🍽️', color: '#FF8C42' },
  hotels: { label: 'Hotels', icon: '🏨', color: '#95E1D3' },
  shops: { label: 'Shops/Malls', icon: '🛍️', color: '#F38181' },
  mosques: { label: 'Mosques', icon: '🕌', color: '#AA96DA' },
};

export const DEFAULT_LANDMARKS = [
  // Airports
  { id: 1, name: 'Islamabad International Airport', category: 'airports', coords: [33.6167, 73.0992] },
  { id: 2, name: 'Jinnah International Airport', category: 'airports', coords: [24.9065, 67.1608] },
  { id: 3, name: 'Allama Iqbal International Airport', category: 'airports', coords: [31.5216, 74.4036] },
  { id: 4, name: 'Peshawar Bacha Khan Airport', category: 'airports', coords: [33.9939, 71.5145] },

  // Hospitals
  { id: 5, name: 'PIMS Hospital', category: 'hospitals', coords: [33.7167, 73.0450] },
  { id: 6, name: 'Aga Khan University Hospital', category: 'hospitals', coords: [24.8833, 67.0700] },
  { id: 7, name: 'Shaukat Khanum Memorial Hospital', category: 'hospitals', coords: [31.4697, 74.2728] },

  // Universities
  { id: 8, name: 'NUST', category: 'schools', coords: [33.6417, 72.9900] },
  { id: 9, name: 'LUMS', category: 'schools', coords: [31.4822, 74.4106] },
  { id: 10, name: 'University of Karachi', category: 'schools', coords: [24.9431, 67.1358] },

  // Mosques
  { id: 11, name: 'Faisal Mosque', category: 'mosques', coords: [33.7305, 73.0075] },
  { id: 12, name: 'Badshahi Mosque', category: 'mosques', coords: [31.5881, 74.3106] },
  { id: 13, name: 'Grand Jamia Mosque', category: 'mosques', coords: [31.4333, 74.2500] },

  // Ports
  { id: 14, name: 'Karachi Port', category: 'ports', coords: [24.8380, 66.9840] },
  { id: 15, name: 'Port Qasim', category: 'ports', coords: [24.7783, 67.4117] },
  { id: 16, name: 'Gwadar Port', category: 'ports', coords: [25.1167, 62.3250] },

  // Hotels
  { id: 17, name: 'Islamabad Serena Hotel', category: 'hotels', coords: [33.7130, 73.0690] },
  { id: 18, name: 'Pearl Continental Karachi', category: 'hotels', coords: [24.8400, 67.0200] },

  // Malls/Shops
  { id: 19, name: 'Centaurus Mall', category: 'shops', coords: [33.7056, 73.0375] },
  { id: 20, name: 'Packages Mall Lahore', category: 'shops', coords: [31.4697, 74.3831] },
];