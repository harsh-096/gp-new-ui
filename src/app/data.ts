import type { Product, Category } from './types'

export const categories: Category[] = [
  {
    id: 'signages',
    name: 'Signages',
    subcategories: [
      { id: 'road-signs', name: 'Road Signs' },
      { id: 'banner-signs', name: 'Banner Signs' },
      { id: 'hazard-signs', name: 'Hazard Signs' },
      { id: 'safety-signs', name: 'Safety Signs' },
      { id: 'door-signs', name: 'Door Signs' },
      { id: 'prohibition-signs', name: 'Prohibition Signs' },
    ],
  },
  {
    id: 'roller-banners',
    name: 'Roller Banners',
    subcategories: [
      { id: 'standard-roller', name: 'Standard Roller' },
      { id: 'premium-roller', name: 'Premium Roller' },
      { id: 'double-sided', name: 'Double Sided' },
      { id: 'wide-format', name: 'Wide Format' },
    ],
  },
  {
    id: 'print-materials',
    name: 'Print Materials',
    subcategories: [
      { id: 'flyers', name: 'Flyers' },
      { id: 'business-cards', name: 'Business Cards' },
      { id: 'notepads', name: 'Notepads' },
      { id: 'brochures', name: 'Brochures' },
    ],
  },
  {
    id: 'stationery',
    name: 'Stationery',
    subcategories: [
      { id: 'letterheads', name: 'Letterheads' },
      { id: 'envelopes', name: 'Envelopes' },
      { id: 'folders', name: 'Folders' },
    ],
  },
]

export const products: Product[] = [
  // Signages - Road Signs
  {
    id: 1,
    code: 'RS001',
    name: 'Speed Limit Sign',
    parentCategory: 'signages',
    subCategory: 'road-signs',
    description:
      'Durable speed limit signs for roads and private property. Made from high-quality aluminum with reflective coating for maximum visibility.',
    image: '/images/roller-banners.png',
    basePrice: 35,
    sizes: [
      { mm: '450 x 450 mm', ft: '1.5 x 1.5 ft', priceMultiplier: 1 },
      { mm: '600 x 600 mm', ft: '2 x 2 ft', priceMultiplier: 1.3 },
      { mm: '750 x 750 mm', ft: '2.5 x 2.5 ft', priceMultiplier: 1.5 },
    ],
    materials: [
      { label: 'Aluminum', priceMultiplier: 1 },
      { label: 'Reflective Aluminum', priceMultiplier: 1.4 },
      { label: 'Composite', priceMultiplier: 1.2 },
    ],
    features: ['Weather resistant', 'Reflective coating', 'UV protected', '10 year warranty'],
    requiresArtwork: false,
  },
  {
    id: 2,
    code: 'RS002',
    name: 'Directional Road Sign',
    parentCategory: 'signages',
    subCategory: 'road-signs',
    description:
      'Professional directional signs for roads, car parks, and commercial areas. Clear typography for easy reading at distance.',
    image: '/images/roller-banners.png',
    basePrice: 45,
    sizes: [
      { mm: '600 x 200 mm', ft: '2 x 0.65 ft', priceMultiplier: 1 },
      { mm: '900 x 300 mm', ft: '3 x 1 ft', priceMultiplier: 1.4 },
      { mm: '1200 x 400 mm', ft: '4 x 1.3 ft', priceMultiplier: 1.8 },
    ],
    materials: [
      { label: 'Aluminum', priceMultiplier: 1 },
      { label: 'Reflective Aluminum', priceMultiplier: 1.35 },
    ],
    features: ['Directional arrows', 'Custom text', 'Post mounting', 'Durable finish'],
    requiresArtwork: false,
  },

  // Signages - Banner Signs
  {
    id: 3,
    code: 'BS001',
    name: 'Outdoor Banner Sign',
    parentCategory: 'signages',
    subCategory: 'banner-signs',
    description:
      'Large format outdoor banner signs perfect for events, promotions, and business advertising. Printed on heavy-duty PVC.',
    image: '/images/roller-banners.png',
    basePrice: 55,
    sizes: [
      { mm: '1000 x 500 mm', ft: '3.3 x 1.6 ft', priceMultiplier: 1 },
      { mm: '1500 x 750 mm', ft: '5 x 2.5 ft', priceMultiplier: 1.5 },
      { mm: '2000 x 1000 mm', ft: '6.5 x 3.3 ft', priceMultiplier: 2 },
      { mm: '3000 x 1500 mm', ft: '10 x 5 ft', priceMultiplier: 3 },
    ],
    materials: [
      { label: 'PVC Banner', priceMultiplier: 1 },
      { label: 'Mesh Banner', priceMultiplier: 1.1 },
      { label: 'Heavy Duty PVC', priceMultiplier: 1.3 },
    ],
    features: ['Hemmed edges', 'Eyelets included', 'Full color print', 'Weatherproof'],
    requiresArtwork: false,
  },
  {
    id: 4,
    code: 'BS002',
    name: 'Foamex Board Sign',
    parentCategory: 'signages',
    subCategory: 'banner-signs',
    description:
      'Lightweight and rigid foamex board signs ideal for indoor and short-term outdoor use. Perfect for real estate and event signage.',
    image: '/images/roller-banners.png',
    basePrice: 25,
    sizes: [
      { mm: 'A3 (297 x 420 mm)', ft: 'A3 (0.97 x 1.38 ft)', priceMultiplier: 1 },
      { mm: 'A2 (420 x 594 mm)', ft: 'A2 (1.38 x 1.95 ft)', priceMultiplier: 1.5 },
      { mm: 'A1 (594 x 841 mm)', ft: 'A1 (1.95 x 2.76 ft)', priceMultiplier: 2 },
      { mm: 'A0 (841 x 1189 mm)', ft: 'A0 (2.76 x 3.9 ft)', priceMultiplier: 3 },
    ],
    materials: [
      { label: '3mm Foamex', priceMultiplier: 1 },
      { label: '5mm Foamex', priceMultiplier: 1.3 },
      { label: '10mm Foamex', priceMultiplier: 1.6 },
    ],
    features: ['Lightweight', 'Easy mounting', 'Vibrant colors', 'Indoor/outdoor use'],
    requiresArtwork: false,
  },

  // Signages - Hazard Signs
  {
    id: 5,
    code: 'HS001',
    name: 'Warning Hazard Sign',
    parentCategory: 'signages',
    subCategory: 'hazard-signs',
    description:
      'Essential hazard warning signs for workplaces and public areas. Compliant with health and safety regulations.',
    image: '/images/roller-banners.png',
    basePrice: 18,
    sizes: [
      { mm: '200 x 200 mm', ft: '0.65 x 0.65 ft', priceMultiplier: 1 },
      { mm: '300 x 300 mm', ft: '1 x 1 ft', priceMultiplier: 1.3 },
      { mm: '400 x 400 mm', ft: '1.3 x 1.3 ft', priceMultiplier: 1.6 },
    ],
    materials: [
      { label: 'Self-adhesive Vinyl', priceMultiplier: 1 },
      { label: 'Rigid Plastic', priceMultiplier: 1.4 },
      { label: 'Aluminum', priceMultiplier: 1.8 },
    ],
    features: ['Safety compliant', 'High visibility', 'Durable', 'Easy to install'],
    requiresArtwork: false,
  },
  {
    id: 6,
    code: 'HS002',
    name: 'Caution Floor Sign',
    parentCategory: 'signages',
    subCategory: 'hazard-signs',
    description:
      'Portable caution signs for wet floors and temporary hazards. Bright yellow for maximum visibility.',
    image: '/images/roller-banners.png',
    basePrice: 22,
    sizes: [
      { mm: '300 x 400 mm', ft: '1 x 1.3 ft', priceMultiplier: 1 },
      { mm: '400 x 600 mm', ft: '1.3 x 2 ft', priceMultiplier: 1.4 },
    ],
    materials: [
      { label: 'Plastic A-Frame', priceMultiplier: 1 },
      { label: 'Heavy Duty Plastic', priceMultiplier: 1.3 },
    ],
    features: ['Foldable design', 'Non-slip base', 'Double-sided', 'Stackable'],
    requiresArtwork: false,
  },

  // Signages - Safety Signs
  {
    id: 7,
    code: 'SS001',
    name: 'Fire Exit Sign',
    parentCategory: 'signages',
    subCategory: 'safety-signs',
    description:
      'Mandatory fire exit signs compliant with UK regulations. Available in photoluminescent for emergency visibility.',
    image: '/images/roller-banners.png',
    basePrice: 15,
    sizes: [
      { mm: '150 x 300 mm', ft: '0.5 x 1 ft', priceMultiplier: 1 },
      { mm: '200 x 400 mm', ft: '0.65 x 1.3 ft', priceMultiplier: 1.3 },
      { mm: '300 x 600 mm', ft: '1 x 2 ft', priceMultiplier: 1.8 },
    ],
    materials: [
      { label: 'Self-adhesive Vinyl', priceMultiplier: 1 },
      { label: 'Rigid Plastic', priceMultiplier: 1.3 },
      { label: 'Photoluminescent', priceMultiplier: 2 },
    ],
    features: ['BS compliant', 'Glow in dark option', 'Arrow directions', 'Easy mounting'],
    requiresArtwork: false,
  },
  {
    id: 8,
    code: 'SS002',
    name: 'First Aid Sign',
    parentCategory: 'signages',
    subCategory: 'safety-signs',
    description:
      'Clear first aid location signs for workplaces, schools, and public buildings. Green background as per safety standards.',
    image: '/images/roller-banners.png',
    basePrice: 12,
    sizes: [
      { mm: '150 x 150 mm', ft: '0.5 x 0.5 ft', priceMultiplier: 1 },
      { mm: '200 x 200 mm', ft: '0.65 x 0.65 ft', priceMultiplier: 1.2 },
      { mm: '300 x 300 mm', ft: '1 x 1 ft', priceMultiplier: 1.5 },
    ],
    materials: [
      { label: 'Self-adhesive Vinyl', priceMultiplier: 1 },
      { label: 'Rigid Plastic', priceMultiplier: 1.4 },
    ],
    features: ['ISO compliant', 'Green/white design', 'Cross symbol', 'Multiple sizes'],
    requiresArtwork: false,
  },

  // Signages - Door Signs
  {
    id: 9,
    code: 'DS001',
    name: 'Office Door Sign',
    parentCategory: 'signages',
    subCategory: 'door-signs',
    description:
      'Professional door signs for offices and commercial buildings. Customizable with room numbers and names.',
    image: '/images/roller-banners.png',
    basePrice: 20,
    sizes: [
      { mm: '100 x 200 mm', ft: '0.33 x 0.65 ft', priceMultiplier: 1 },
      { mm: '150 x 300 mm', ft: '0.5 x 1 ft', priceMultiplier: 1.4 },
      { mm: '200 x 400 mm', ft: '0.65 x 1.3 ft', priceMultiplier: 1.8 },
    ],
    materials: [
      { label: 'Acrylic', priceMultiplier: 1 },
      { label: 'Brushed Aluminum', priceMultiplier: 1.5 },
      { label: 'Stainless Steel', priceMultiplier: 2 },
    ],
    features: ['Custom text', 'Modern design', 'Easy mounting', 'Professional finish'],
    requiresArtwork: false,
  },

  // Signages - Prohibition Signs
  {
    id: 10,
    code: 'PS001',
    name: 'No Smoking Sign',
    parentCategory: 'signages',
    subCategory: 'prohibition-signs',
    description:
      'Clear no smoking signs for compliance with smoking regulations. Red circle with diagonal line design.',
    image: '/images/roller-banners.png',
    basePrice: 10,
    sizes: [
      { mm: '100 x 100 mm', ft: '0.33 x 0.33 ft', priceMultiplier: 1 },
      { mm: '150 x 150 mm', ft: '0.5 x 0.5 ft', priceMultiplier: 1.2 },
      { mm: '200 x 200 mm', ft: '0.65 x 0.65 ft', priceMultiplier: 1.4 },
    ],
    materials: [
      { label: 'Self-adhesive Vinyl', priceMultiplier: 1 },
      { label: 'Rigid Plastic', priceMultiplier: 1.5 },
    ],
    features: ['Legal compliant', 'Standard symbol', 'Weatherproof', 'Multiple languages'],
    requiresArtwork: false,
  },

  // Roller Banners - Standard
  {
    id: 11,
    code: 'RB001',
    name: 'Economy Roller Banner',
    parentCategory: 'roller-banners',
    subCategory: 'standard-roller',
    description:
      'Budget-friendly roller banner for short-term events and promotions. Lightweight and easy to transport.',
    image: '/images/roller-banners.png',
    basePrice: 35,
    sizes: [
      { mm: '800 x 2000 mm', ft: '2.6 x 6.5 ft', priceMultiplier: 1 },
      { mm: '850 x 2000 mm', ft: '2.8 x 6.5 ft', priceMultiplier: 1.1 },
    ],
    materials: [
      { label: 'Standard PVC', priceMultiplier: 1 },
      { label: 'Premium PVC', priceMultiplier: 1.2 },
    ],
    features: ['Carry bag included', 'Quick setup', 'Lightweight', 'Budget friendly'],
    requiresArtwork: true,
  },

  // Roller Banners - Premium
  {
    id: 12,
    code: 'RB002',
    name: 'Premium Roller Banner',
    parentCategory: 'roller-banners',
    subCategory: 'premium-roller',
    description:
      'High-quality retractable roller banner with premium finish. Sturdy aluminum base with chrome feet.',
    image: '/images/roller-banners.png',
    basePrice: 65,
    sizes: [
      { mm: '800 x 2000 mm', ft: '2.6 x 6.5 ft', priceMultiplier: 1 },
      { mm: '850 x 2000 mm', ft: '2.8 x 6.5 ft', priceMultiplier: 1.1 },
      { mm: '1000 x 2000 mm', ft: '3.3 x 6.5 ft', priceMultiplier: 1.25 },
      { mm: '1200 x 2000 mm', ft: '3.9 x 6.5 ft', priceMultiplier: 1.4 },
    ],
    materials: [
      { label: 'Premium PVC', priceMultiplier: 1 },
      { label: 'Anti-curl Film', priceMultiplier: 1.2 },
      { label: 'Fabric', priceMultiplier: 1.4 },
    ],
    features: ['Chrome base', 'Adjustable height', 'Padded carry bag', 'Replaceable graphics'],
    requiresArtwork: true,
  },

  // Roller Banners - Double Sided
  {
    id: 13,
    code: 'RB003',
    name: 'Double Sided Roller Banner',
    parentCategory: 'roller-banners',
    subCategory: 'double-sided',
    description:
      'Eye-catching double-sided roller banner visible from both directions. Perfect for central placements.',
    image: '/images/roller-banners.png',
    basePrice: 95,
    sizes: [
      { mm: '800 x 2000 mm', ft: '2.6 x 6.5 ft', priceMultiplier: 1 },
      { mm: '850 x 2000 mm', ft: '2.8 x 6.5 ft', priceMultiplier: 1.1 },
      { mm: '1000 x 2000 mm', ft: '3.3 x 6.5 ft', priceMultiplier: 1.3 },
    ],
    materials: [
      { label: 'Blockout PVC', priceMultiplier: 1 },
      { label: 'Premium Blockout', priceMultiplier: 1.25 },
    ],
    features: ['360° visibility', 'Heavy-duty base', 'Two graphics', 'Premium finish'],
    requiresArtwork: true,
  },

  // Roller Banners - Wide Format
  {
    id: 14,
    code: 'RB004',
    name: 'Wide Format Roller Banner',
    parentCategory: 'roller-banners',
    subCategory: 'wide-format',
    description:
      'Extra-wide roller banner for maximum visual impact. Ideal for backdrops and large displays.',
    image: '/images/roller-banners.png',
    basePrice: 120,
    sizes: [
      { mm: '1500 x 2000 mm', ft: '5 x 6.5 ft', priceMultiplier: 1 },
      { mm: '2000 x 2000 mm', ft: '6.5 x 6.5 ft', priceMultiplier: 1.3 },
      { mm: '2400 x 2000 mm', ft: '8 x 6.5 ft', priceMultiplier: 1.5 },
    ],
    materials: [
      { label: 'Premium PVC', priceMultiplier: 1 },
      { label: 'Fabric', priceMultiplier: 1.3 },
    ],
    features: ['Backdrop suitable', 'Modular system', 'Professional grade', 'Easy transport'],
    requiresArtwork: true,
  },

  // Print Materials - Flyers
  {
    id: 15,
    code: 'FL001',
    name: 'Custom Flyers',
    parentCategory: 'print-materials',
    subCategory: 'flyers',
    description:
      'Professional quality flyers printed on premium paper stock. Perfect for promotions and marketing.',
    image: '/images/flyers.png',
    basePrice: 25,
    sizes: [
      { mm: 'A6 (105 x 148 mm)', ft: 'A6 (0.34 x 0.49 ft)', priceMultiplier: 1 },
      { mm: 'A5 (148 x 210 mm)', ft: 'A5 (0.49 x 0.69 ft)', priceMultiplier: 1.3 },
      { mm: 'A4 (210 x 297 mm)', ft: 'A4 (0.69 x 0.97 ft)', priceMultiplier: 1.6 },
      { mm: 'DL (99 x 210 mm)', ft: 'DL (0.32 x 0.69 ft)', priceMultiplier: 1.2 },
    ],
    materials: [
      { label: '150gsm Gloss', priceMultiplier: 1 },
      { label: '170gsm Silk', priceMultiplier: 1.15 },
      { label: '300gsm Card', priceMultiplier: 1.4 },
      { label: '350gsm Premium', priceMultiplier: 1.6 },
    ],
    features: ['Full color printing', 'Double-sided option', 'Fast turnaround', 'Bulk discounts'],
    requiresArtwork: true,
  },

  // Print Materials - Business Cards
  {
    id: 16,
    code: 'BC001',
    name: 'Business Cards',
    parentCategory: 'print-materials',
    subCategory: 'business-cards',
    description:
      'Make a lasting impression with premium business cards. High-quality card stock with special finishes.',
    image: '/images/business-cards.png',
    basePrice: 15,
    sizes: [
      { mm: '85 x 55 mm (Standard)', ft: '3.3 x 2.2 in (Standard)', priceMultiplier: 1 },
      { mm: '90 x 50 mm (Euro)', ft: '3.5 x 2.0 in (Euro)', priceMultiplier: 1.05 },
      { mm: '85 x 85 mm (Square)', ft: '3.3 x 3.3 in (Square)', priceMultiplier: 1.2 },
      { mm: '55 x 85 mm (Mini)', ft: '2.2 x 3.3 in (Mini)', priceMultiplier: 0.9 },
    ],
    materials: [
      { label: '350gsm Silk', priceMultiplier: 1 },
      { label: '400gsm Uncoated', priceMultiplier: 1.2 },
      { label: '450gsm Premium', priceMultiplier: 1.4 },
      { label: 'Recycled Card', priceMultiplier: 1.3 },
    ],
    features: ['Spot UV available', 'Foil options', 'Rounded corners', 'Matt lamination'],
    requiresArtwork: true,
  },

  // Print Materials - Notepads
  {
    id: 17,
    code: 'NP001',
    name: 'Custom Notepads',
    parentCategory: 'print-materials',
    subCategory: 'notepads',
    description:
      'Branded notepads perfect for offices and promotional giveaways. Customizable with your logo.',
    image: '/images/notepads.png',
    basePrice: 35,
    sizes: [
      { mm: 'A6 (105 x 148 mm)', ft: 'A6 (0.34 x 0.49 ft)', priceMultiplier: 1 },
      { mm: 'A5 (148 x 210 mm)', ft: 'A5 (0.49 x 0.69 ft)', priceMultiplier: 1.4 },
      { mm: 'A4 (210 x 297 mm)', ft: 'A4 (0.69 x 0.97 ft)', priceMultiplier: 1.8 },
    ],
    materials: [
      { label: '80gsm Bond', priceMultiplier: 1 },
      { label: '100gsm Premium', priceMultiplier: 1.2 },
      { label: '120gsm Luxury', priceMultiplier: 1.4 },
    ],
    features: ['50 sheets per pad', 'Glued binding', 'Cardboard backing', 'Full color header'],
    requiresArtwork: true,
  },

  // Print Materials - Brochures
  {
    id: 18,
    code: 'BR001',
    name: 'Tri-fold Brochures',
    parentCategory: 'print-materials',
    subCategory: 'brochures',
    description:
      'Professional tri-fold brochures for business marketing. High-quality print with crisp folds.',
    image: '/images/flyers.png',
    basePrice: 40,
    sizes: [
      { mm: 'A4 folded to DL', ft: 'A4 folded to DL', priceMultiplier: 1 },
      { mm: 'A3 folded to A4', ft: 'A3 folded to A4', priceMultiplier: 1.5 },
    ],
    materials: [
      { label: '150gsm Gloss', priceMultiplier: 1 },
      { label: '170gsm Silk', priceMultiplier: 1.15 },
      { label: '250gsm Card', priceMultiplier: 1.4 },
    ],
    features: ['Tri-fold design', 'Full color', 'Crisp folds', 'Multiple pages'],
    requiresArtwork: true,
  },

  // Stationery - Letterheads
  {
    id: 19,
    code: 'LH001',
    name: 'Corporate Letterheads',
    parentCategory: 'stationery',
    subCategory: 'letterheads',
    description:
      'Professional letterheads for corporate correspondence. Printed on premium paper stock.',
    image: '/images/notepads.png',
    basePrice: 30,
    sizes: [
      { mm: 'A4 (210 x 297 mm)', ft: 'A4 (8.3 x 11.7 in)', priceMultiplier: 1 },
      { mm: 'US Letter (216 x 279 mm)', ft: 'US Letter (8.5 x 11 in)', priceMultiplier: 1.05 },
    ],
    materials: [
      { label: '100gsm Bond', priceMultiplier: 1 },
      { label: '120gsm Premium', priceMultiplier: 1.2 },
      { label: '150gsm Luxury', priceMultiplier: 1.5 },
    ],
    features: ['Corporate branding', 'Watermark option', 'Premium paper', 'Consistent quality'],
    requiresArtwork: true,
  },

  // Stationery - Envelopes
  {
    id: 20,
    code: 'EN001',
    name: 'Printed Envelopes',
    parentCategory: 'stationery',
    subCategory: 'envelopes',
    description:
      'Custom printed envelopes with your branding. Available in multiple sizes and styles.',
    image: '/images/notepads.png',
    basePrice: 25,
    sizes: [
      { mm: 'DL (110 x 220 mm)', ft: 'DL (4.3 x 8.7 in)', priceMultiplier: 1 },
      { mm: 'C5 (162 x 229 mm)', ft: 'C5 (6.4 x 9 in)', priceMultiplier: 1.2 },
      { mm: 'C4 (229 x 324 mm)', ft: 'C4 (9 x 12.8 in)', priceMultiplier: 1.5 },
    ],
    materials: [
      { label: '80gsm White', priceMultiplier: 1 },
      { label: '100gsm Premium', priceMultiplier: 1.2 },
      { label: 'Window Envelope', priceMultiplier: 1.1 },
    ],
    features: ['Peel & seal', 'Window option', 'Full color print', 'Bulk pricing'],
    requiresArtwork: true,
  },
]
