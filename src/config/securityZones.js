/**
 * Geopolitical Security Zones Configuration
 * All military, nuclear, and restricted facilities.
 * Rendered across ALL map layers (OSM, hybrid, satellite) for clarity.
 * 
 * SECURITY NOTICE: Data compiled from publicly available sources.
 * No classified coordinates are used.
 */

export const SECURITY_ZONES = {
  // Military Headquarters
  ghqRawalpindi: {
    id: 'ghq-rawalpindi',
    name: 'GHQ Rawalpindi',
    type: 'military_hq',
    category: 'Restricted Military Zone',
    coordinates: [33.5651, 73.0169],
    radius: 2500, // meters
    color: '#DC143C',
    description: 'General Headquarters - Pakistan Army',
    prominence: 'high',
  },
  navalHQ: {
    id: 'naval-hq-islamabad',
    name: 'Pakistan Naval Headquarters',
    type: 'naval_hq',
    category: 'Restricted Naval Zone',
    coordinates: [33.7074, 73.0493],
    radius: 1500,
    color: '#00308F',
    description: 'Naval Headquarters Islamabad',
    prominence: 'high',
  },
  airHQ: {
    id: 'air-hq-islamabad',
    name: 'Air Headquarters',
    type: 'airforce_hq',
    category: 'Restricted Air Zone',
    coordinates: [33.6944, 73.0500],
    radius: 1500,
    color: '#4A90E2',
    description: 'Pakistan Air Force AHQ',
    prominence: 'high',
  },

  // Key Military Installations
  chaklalaAirbase: {
    id: 'chaklala-airbase',
    name: 'PAF Base Chaklala',
    type: 'airbase',
    category: 'Restricted Military Installation',
    coordinates: [33.6167, 73.1000],
    radius: 3000,
    color: '#DC143C',
    description: 'Major PAF airbase - Restricted Area',
  },
  kamraAirbase: {
    id: 'kamra-airbase',
    name: 'PAF Base Minhas (Kamra)',
    type: 'airbase',
    category: 'Restricted Military Installation',
    coordinates: [33.8267, 72.8000],
    radius: 3500,
    color: '#DC143C',
    description: 'Aeronautical Complex - Restricted Area',
  },
  pofWah: {
    id: 'pof-wah',
    name: 'Pakistan Ordnance Factories',
    type: 'ordnance',
    category: 'Restricted Military Zone',
    coordinates: [33.7933, 72.7233],
    radius: 2000,
    color: '#B22222',
    description: 'Defense Production Complex',
  },

  // Nuclear Facilities
  kahuta: {
    id: 'kahuta-labs',
    name: 'Kahuta Research Laboratories',
    type: 'nuclear',
    category: 'Restricted Nuclear Facility',
    coordinates: [33.5925, 73.3833],
    radius: 4000,
    color: '#FF0000',
    description: 'Nuclear Research Complex - High Security',
    prominence: 'high',
  },
  khushab: {
    id: 'khushab-complex',
    name: 'Khushab Nuclear Complex',
    type: 'nuclear',
    category: 'Restricted Nuclear Facility',
    coordinates: [31.9833, 72.3500],
    radius: 5000,
    color: '#FF0000',
    description: 'Heavy Water Reactor Complex',
    prominence: 'high',
  },
  paec: {
    id: 'paec-islamabad',
    name: 'Pakistan Atomic Energy Commission',
    type: 'nuclear',
    category: 'Nuclear Research Facility',
    coordinates: [33.7180, 73.0620],
    radius: 1000,
    color: '#FF4500',
    description: 'PAEC Headquarters',
  },

  // Government High Security
  pmResidency: {
    id: 'pm-residency',
    name: 'Prime Minister House',
    type: 'government',
    category: 'High Security Government Zone',
    coordinates: [33.7120, 73.0530],
    radius: 800,
    color: '#800020',
    description: 'PM Secretariat - High Security',
    prominence: 'high',
  },
  parliamentHouse: {
    id: 'parliament-house',
    name: 'Parliament House',
    type: 'government',
    category: 'High Security Government Zone',
    coordinates: [33.7142, 73.0696],
    radius: 600,
    color: '#800020',
    description: 'National Assembly',
  },

  // Islamabad High Security Zone
  islamabadRedZone: {
    id: 'islamabad-red-zone',
    name: 'Islamabad High Security Zone',
    type: 'red_zone',
    category: 'High Security Alert Area',
    coordinates: [33.7074, 73.0493],
    radius: 8000,
    color: '#FF6347',
    description: 'Main High Security Zone Alert Area',
    prominence: 'high',
    dashed: true,
  },

  // Military Divisions (Corps HQs)
  lahoreCorps: {
    id: 'lahore-corps',
    name: 'Lahore Corps HQ',
    type: 'military_division',
    category: 'Restricted Military Zone',
    coordinates: [31.5400, 74.3400],
    radius: 2000,
    color: '#DC143C',
  },
  karachiCorps: {
    id: 'karachi-corps',
    name: 'Karachi Corps HQ',
    type: 'military_division',
    category: 'Restricted Military Zone',
    coordinates: [24.8600, 67.0500],
    radius: 2000,
    color: '#DC143C',
  },
  peshawarCorps: {
    id: 'peshawar-corps',
    name: 'Peshawar Corps HQ',
    type: 'military_division',
    category: 'Restricted Military Zone',
    coordinates: [34.0150, 71.5250],
    radius: 2000,
    color: '#DC143C',
  },
};

export const SECURITY_CATEGORIES = {
  nuclear: { label: 'Nuclear Facilities', color: '#FF0000', icon: '☢️' },
  military_hq: { label: 'Military Headquarters', color: '#DC143C', icon: '🎖️' },
  airbase: { label: 'Air Bases', color: '#DC143C', icon: '✈️' },
  naval_hq: { label: 'Naval Headquarters', color: '#00308F', icon: '⚓' },
  military_division: { label: 'Military Divisions', color: '#DC143C', icon: '⚔️' },
  government: { label: 'High Security Government', color: '#800020', icon: '🏛️' },
  red_zone: { label: 'High Security Alert Area', color: '#FF6347', icon: '⚠️' },
  ordnance: { label: 'Ordnance Facilities', color: '#B22222', icon: '🔫' },
};