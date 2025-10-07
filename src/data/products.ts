export interface ProductItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  power: string;
  category: 'tools' | 'electrical' | 'lighting';
  image: string;
  discount: number;
  description: string;
  features: string[];
  inStock: boolean;
  badge: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  gallery?: string[];
}

const imageBase = {
  drill: '/pexels-dzeninalukac-754262.jpg',
  ledStrip: '/images%20(4).jpg',
  breaker: '/download%20(1).jpg',
  welding: '/images%20(2).jpg',
  switchPanel: '/images.jpg',
  angleGrinder: '/pexels-thatguycraig000-1529745.jpg',
  solar: '/pexels-pixabay-302743.jpg',
  workLight: '/354ed4c3de93588e08212cab7f824f97.jpg_720x720q80.jpg_.webp',
  multimeter: '/download.jpg',
  fan: '/images%20(3).jpg',
  wireStripper: '/download%20(2).jpg',
  smartBulb: '/images%20(1).jpg'
} as const;

export const productCatalog: ProductItem[] = [
  {
    id: 1,
    name: 'Professional Power Drill Set',
    brand: 'Bosch',
    price: 5999,
    originalPrice: 7999,
    rating: 4.8,
    reviews: 156,
    power: '800W',
    category: 'tools',
    image: imageBase.drill,
    discount: 25,
    description:
      'Heavy-duty cordless drill with advanced battery technology and precision control for professional applications.',
    features: ['Variable Speed', 'LED Light', 'Keyless Chuck', 'Impact Function'],
    inStock: true,
    badge: 'Best Seller',
    isBestSeller: true,
    gallery: [imageBase.drill, imageBase.angleGrinder, '/pexels-dzeninalukac-754262.jpg']
  },
  {
    id: 2,
    name: 'Smart LED Strip Light Kit',
    brand: 'Philips',
    price: 2499,
    originalPrice: 3499,
    rating: 4.6,
    reviews: 89,
    power: '24W',
    category: 'lighting',
    image: imageBase.ledStrip,
    discount: 28,
    description:
      'Smart RGB LED strip lights with app control and voice assistant compatibility for modern home lighting.',
    features: ['RGB Colors', 'App Control', 'Voice Control', '5m Length'],
    inStock: true,
    badge: 'New',
    isNew: true,
    gallery: [imageBase.ledStrip, '/images%20(1).jpg', '/images%20(4).jpg']
  },
  {
    id: 3,
    name: 'Heavy Duty Circuit Breaker',
    brand: 'Havells',
    price: 1899,
    originalPrice: 2299,
    rating: 4.7,
    reviews: 234,
    power: '32A',
    category: 'electrical',
    image: imageBase.breaker,
    discount: 17,
    description:
      'ISI certified heavy-duty circuit breaker with advanced protection features for electrical safety.',
    features: ['MCB Protection', 'Fire Resistant', 'Easy Installation', 'ISI Certified'],
    inStock: true,
    badge: '',
    gallery: [imageBase.breaker, '/download%20(1).jpg']
  },
  {
    id: 4,
    name: 'Industrial Grade Welding Kit',
    brand: 'Lincoln',
    price: 15999,
    originalPrice: 18999,
    rating: 4.9,
    reviews: 67,
    power: '200A',
    category: 'tools',
    image: imageBase.welding,
    discount: 15,
    description:
      'Professional welding equipment with multi-process capability and digital controls for precision work.',
    features: ['MIG/TIG/Stick', 'Digital Display', 'Auto Voltage', 'Portable Design'],
    inStock: false,
    badge: 'Premium',
    gallery: [imageBase.welding, '/images%20(2).jpg', '/download.jpg']
  },
  {
    id: 5,
    name: 'Smart Home Switch Panel',
    brand: 'Syska',
    price: 3299,
    originalPrice: 4199,
    rating: 4.5,
    reviews: 123,
    power: '16A',
    category: 'electrical',
    image: imageBase.switchPanel,
    discount: 21,
    description:
      'WiFi-enabled smart switch panel with touch controls and voice assistant integration.',
    features: ['Touch Control', 'WiFi Enabled', 'Voice Control', 'Timer Function'],
    inStock: true,
    badge: 'Smart',
    gallery: [imageBase.switchPanel, '/images.jpg', '/images%20(1).jpg']
  },
  {
    id: 6,
    name: 'High Performance Angle Grinder',
    brand: 'Makita',
    price: 4599,
    originalPrice: 5999,
    rating: 4.8,
    reviews: 198,
    power: '1200W',
    category: 'tools',
    image: imageBase.angleGrinder,
    discount: 23,
    description:
      'Professional angle grinder with anti-vibration technology and superior dust protection.',
    features: ['Anti-Vibration', 'Dust Protection', 'Quick Change', 'Ergonomic Grip'],
    inStock: true,
    badge: '',
    gallery: [imageBase.angleGrinder, '/pexels-thatguycraig000-1529745.jpg', '/pexels-dzeninalukac-754262.jpg']
  },
  {
    id: 7,
    name: 'Solar Panel Kit 100W',
    brand: 'Luminous',
    price: 8999,
    originalPrice: 11999,
    rating: 4.4,
    reviews: 45,
    power: '100W',
    category: 'electrical',
    image: imageBase.solar,
    discount: 25,
    description:
      'Complete solar panel system with monocrystalline technology and 25-year performance warranty.',
    features: ['Monocrystalline', 'Weather Resistant', '25 Year Warranty', 'Easy Setup'],
    inStock: true,
    badge: 'Eco',
    gallery: [imageBase.solar, '/pexels-pixabay-302743.jpg', '/pexels-pixabay-302743.jpg']
  },
  {
    id: 8,
    name: 'Industrial Work Light LED',
    brand: 'Osram',
    price: 1799,
    originalPrice: 2299,
    rating: 4.6,
    reviews: 156,
    power: '50W',
    category: 'lighting',
    image: imageBase.workLight,
    discount: 21,
    description:
      'Heavy-duty LED work light with tripod stand and 360-degree rotation for versatile illumination.',
    features: ['Tripod Stand', '360° Rotation', 'IP65 Rated', '5000K Cool White'],
    inStock: true,
    badge: '',
    gallery: [imageBase.workLight, '/354ed4c3de93588e08212cab7f824f97.jpg_720x720q80.jpg_.webp']
  },
  {
    id: 9,
    name: 'Digital Multimeter Pro',
    brand: 'Fluke',
    price: 6999,
    originalPrice: 8499,
    rating: 4.9,
    reviews: 287,
    power: 'N/A',
    category: 'tools',
    image: imageBase.multimeter,
    discount: 18,
    description:
      'Professional digital multimeter with advanced measurement capabilities and safety ratings.',
    features: ['True RMS', 'Data Logging', 'Auto Range', 'Safety Rated'],
    inStock: true,
    badge: 'Pro',
    gallery: [imageBase.multimeter, '/download.jpg']
  },
  {
    id: 10,
    name: 'Ceiling Fan BLDC Motor',
    brand: 'Crompton',
    price: 4299,
    originalPrice: 5599,
    rating: 4.3,
    reviews: 176,
    power: '28W',
    category: 'electrical',
    image: imageBase.fan,
    discount: 23,
    description:
      'Energy-efficient BLDC motor ceiling fan with remote control and variable speed settings.',
    features: ['BLDC Motor', 'Remote Control', 'Energy Saving', 'Silent Operation'],
    inStock: true,
    badge: '',
    gallery: [imageBase.fan, '/images%20(3).jpg']
  },
  {
    id: 11,
    name: 'Wire Stripper Tool Set',
    brand: 'Klein',
    price: 1299,
    originalPrice: 1699,
    rating: 4.7,
    reviews: 203,
    power: 'N/A',
    category: 'tools',
    image: imageBase.wireStripper,
    discount: 24,
    description:
      'Professional wire stripper set with multiple gauge capacities and precision cutting edges.',
    features: ['Multi-Gauge', 'Precision Cut', 'Ergonomic Handle', 'Professional Grade'],
    inStock: true,
    badge: '',
    gallery: [imageBase.wireStripper, '/download%20(2).jpg']
  },
  {
    id: 12,
    name: 'Smart LED Bulb 9W',
    brand: 'Philips',
    price: 899,
    originalPrice: 1199,
    rating: 4.4,
    reviews: 412,
    power: '9W',
    category: 'lighting',
    image: imageBase.smartBulb,
    discount: 25,
    description:
      'WiFi-enabled smart LED bulb with millions of colors and scheduling features.',
    features: ['16 Million Colors', 'App Control', 'Voice Control', 'Scheduling'],
    inStock: true,
    badge: 'Smart',
    isNew: true,
    gallery: [imageBase.smartBulb, '/images%20(1).jpg', '/images%20(4).jpg']
  }
];
