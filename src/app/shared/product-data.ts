// ============================================================================
// PRODUCT CATALOGUE
// Categories, product codes and size tables follow the Nexus Solutions
// Company Profile (assets/Nexus_Solutions_Company_Profile.pdf).
// To add a product: copy one block below, give it a unique `id` and a `category`.
// ============================================================================

export interface ProductSpec {
  label: string;
  value: string;
}

/** Optional size / model table shown in the product details popup */
export interface SpecTable {
  title?: string;
  columns: string[];
  rows: string[][];
  note?: string;
}

export type CategoryId = 'lightning' | 'earthing' | 'strips' | 'solar-bos' | 'wire-cables';

export interface ProductCategory {
  id: CategoryId;
  name: string;
  description: string;
  image: string;
  highlights: string[];
  /** shown as a "Key Product" card on the home page */
  featured: boolean;
}

export interface Product {
  id: string;
  title: string;
  code?: string;
  image: string;
  description: string;
  features: string[];
  specs: ProductSpec[];
  category: CategoryId;
  table?: SpecTable;
}

const IMG = 'assets/products-v2/';
const OLD = 'assets/Products/';

export const CATEGORIES: ProductCategory[] = [
  {
    id: 'lightning',
    name: 'Lightning Arrester System',
    description: 'ESE and conventional lightning arresters with a complete range of LPS installation accessories, designed to IEC 62305 and NFC 17-102.',
    image: IMG + 'ese-lightning-arrester.webp',
    highlights: ['ESE arresters: 35 m to 107 m protection radius', 'Copper / copper bonded spike arresters', 'Air terminals, saddles, clamps & tapes'],
    featured: true
  },
  {
    id: 'earthing',
    name: 'Earthing System',
    description: 'GI, copper bonded and pure copper earthing electrodes, backfill compound, pit covers and chambers for low and stable earth resistance.',
    image: IMG + 'copper-terminal-earthing-electrode.webp',
    highlights: ['GI, copper bonded & pure copper electrodes', '1, 2 & 3 m lengths, 48–88 mm pipe', 'Backfill compound, pit covers & chambers'],
    featured: true
  },
  {
    id: 'strips',
    name: 'Strips',
    description: 'Hot dip GI and EC grade copper earthing strips, flats, plates and sheets in all standard sizes.',
    image: IMG + 'copper-earthing-strip.webp',
    highlights: ['GI strips with min. 86 micron zinc coating', 'Copper strips 25×3 mm to 100×10 mm, 99.9% Cu', 'Aluminium, brass & bi-metallic options'],
    featured: true
  },
  {
    id: 'solar-bos',
    name: 'Solar BOS Items',
    description: 'Balance of System components for rooftop and ground-mounted solar projects: BOS kits, cable trays and mounting hardware.',
    image: IMG + 'bos-kit.webp',
    highlights: ['ACDB / DCDB with SPD & fuses', 'Perforated & ladder cable trays', 'GI angles & threaded rods for mounting'],
    featured: true
  },
  {
    id: 'wire-cables',
    name: 'Wire and Cables',
    description: 'Solar DC cables, power cables and copper / brass earthing wires for safe power distribution and grounding.',
    image: OLD + 'dcCable.jpg',
    highlights: ['UV-resistant solar DC cables', 'XLPE / PVC power cables', 'Copper & brass earthing wire'],
    featured: false
  }
];

export function getCategory(id: CategoryId | string): ProductCategory | undefined {
  return CATEGORIES.find(c => c.id === id);
}

const ELECTRODE_FEATURES = [
  'Hot dip galvanized for corrosion protection',
  'Designed for fast fault current dissipation',
  'Low maintenance on site',
  'Easy & fast installation on site',
  'Most suitable for soil with pH value 5.0 to 8.0',
  'Moisture booster chemical bags provided for low earth resistance'
];

const ELECTRODE_COLUMNS = ['Model', 'Length (m)', 'Terminal Size', 'Inner Strip', 'Outer Pipe Dia. (min) mm'];

function electrodeRows(prefix: string, pipe: [string, string, string]): string[][] {
  return [
    [`40 ${prefix}`, '1, 2 & 3', '40 × 6', '25 × 3', pipe[0]],
    [`50 ${prefix}`, '1, 2 & 3', '40 × 6', '25 × 3', pipe[1]],
    [`80 ${prefix}`, '1, 2 & 3', '50 × 6', '25 × 3', pipe[2]]
  ];
}

export const PRODUCTS: Product[] = [
  // ======================= LIGHTNING ARRESTER SYSTEM =======================
  {
    id: 'lightning-arrester',
    title: 'ESE Lightning Arrester',
    code: 'NS ESE LA-001',
    image: IMG + 'ese-lightning-arrester.webp',
    description: 'Early Streamer Emission (ESE) lightning arrester giving a wide area of protection from 35 m up to 107 m radius, as per NFC 17-102:2011.',
    features: ['Protection radius 35 m to 107 m', '9 models (NSESE 1 to 9)', 'As per NFC 17-102:2011'],
    category: 'lightning',
    specs: [
      { label: 'Technology', value: 'ESE (Early Streamer Emission)' },
      { label: 'Standard', value: 'NFC 17-102:2011' },
      { label: 'Protection Radius', value: '35 m to 107 m' },
      { label: 'Models', value: 'NSESE 1 to NSESE 9' }
    ],
    table: {
      title: 'Protection radius Rp (m) by height h (m)',
      columns: ['h (m)', 'NSESE 1', 'NSESE 2', 'NSESE 3', 'NSESE 4', 'NSESE 5', 'NSESE 6', 'NSESE 7', 'NSESE 8', 'NSESE 9'],
      rows: [
        ['2', '17', '23', '32', '23', '30', '40', '26', '34', '44'],
        ['3', '25', '35', '48', '34', '45', '59', '39', '50', '65'],
        ['4', '34', '46', '64', '46', '60', '78', '52', '67', '87'],
        ['5', '42', '58', '79', '57', '75', '97', '65', '83', '107'],
        ['6', '43', '59', '79', '58', '76', '97', '66', '84', '107'],
        ['7', '44', '59', '79', '59', '76', '98', '67', '87', '108'],
        ['10', '45', '60', '80', '60', '77', '99', '68', '88', '109']
      ],
      note: 'NSESE 1–3: Level I, D = 20 m · NSESE 4–6: D = 45 m · NSESE 7–9: D = 60 m · ΔT = 25 / 40 / 60 µs within each group.'
    }
  },
  {
    id: 'spike-lightning-arrester',
    title: 'Copper / Copper Bonded / Spike Lightning Arrester',
    image: IMG + 'spike-lightning-arrester.webp',
    description: 'Conventional spike lightning arrester made of copper, used to protect roofs of buildings, tall or isolated structures and masts from lightning damage.',
    features: ['Conventional type, IEC 62305', 'Pure / bonded / hollow copper', '16 mm solid rod or 25 mm hollow pipe'],
    category: 'lightning',
    specs: [
      { label: 'Standard', value: 'IEC 62305' },
      { label: 'Material', value: 'Pure Copper / Bonded Copper / Hollow Copper' },
      { label: 'Technology', value: 'Conventional Type' }
    ],
    table: {
      columns: ['Diameter', 'Length'],
      rows: [
        ['16 mm (Solid Rod)', '1 m'],
        ['16 mm (Solid Rod)', '2 m'],
        ['25 mm (Hollow Pipe)', '1 m'],
        ['25 mm (Hollow Pipe)', '2 m']
      ]
    }
  },
  {
    id: 'lps-installation-accessories',
    title: 'LPS Installation Accessories',
    image: IMG + 'lps-installation-accessories.webp',
    description: 'High quality lightning protection system (LPS) accessories for reliable earthing, lightning protection and electrical safety across all applications.',
    features: ['Air terminal rods & bases', 'Saddles, clips & tape clamps', 'Insulated copper tape'],
    category: 'lightning',
    specs: [
      { label: 'Air Terminals', value: 'Air terminal rod, air terminal base' },
      { label: 'Saddles', value: 'Ridge saddle, heavy duty conductor saddle' },
      { label: 'Clamps & Clips', value: 'Square tape clamp, tee clamp, DC tape clip, tape clip, plate test clamp' },
      { label: 'Tape', value: 'PVC / LSOH insulated copper tape' }
    ]
  },

  // ============================ EARTHING SYSTEM ============================
  {
    id: 'gi-earthing-electrode',
    title: 'GI Earthing Electrode (Strip in Pipe)',
    code: 'NSGI-002 / NSGI-005',
    image: IMG + 'gi-earthing-electrode-strip-in-pipe.webp',
    description: 'Hot dip galvanized GI earthing electrode with strip in pipe construction, for consistent grounding performance and fast fault current dissipation.',
    features: ['Hot dip galvanized', '1, 2 & 3 m lengths', 'Moisture booster chemical bags'],
    category: 'earthing',
    specs: [
      { label: 'Material', value: 'Hot dip galvanized iron' },
      { label: 'Construction', value: 'Strip in pipe' },
      { label: 'Soil Suitability', value: 'pH 5.0 to 8.0' }
    ],
    table: { columns: ELECTRODE_COLUMNS, rows: electrodeRows('NSGI', ['48', '58', '88']) }
  },
  {
    id: 'copper-terminal-earthing-electrode',
    title: 'Copper Terminal Earthing Electrode',
    code: 'NSCT-003',
    image: IMG + 'copper-terminal-earthing-electrode.webp',
    description: 'Earthing electrode with copper terminal for better connection and conductivity, designed for fast fault current dissipation.',
    features: ['Copper terminal', '1, 2 & 3 m lengths', 'Moisture booster chemical bags'],
    category: 'earthing',
    specs: [
      { label: 'Terminal', value: 'Copper' },
      { label: 'Body', value: 'Hot dip galvanized pipe' },
      { label: 'Soil Suitability', value: 'pH 5.0 to 8.0' }
    ],
    table: { columns: ELECTRODE_COLUMNS, rows: electrodeRows('NSCT', ['40', '50', '80']) }
  },
  {
    id: 'copper-bonded-chemical-earthing-pipe',
    title: 'Copper Bonded Earthing Electrode',
    code: 'NSCB-006',
    image: IMG + 'copper-bonded-earthing-electrode.webp',
    description: 'Copper bonded chemical earthing electrode for improved conductivity, corrosion protection and long service life.',
    features: ['Copper bonded', '1, 2 & 3 m lengths', 'Moisture booster chemical bags'],
    category: 'earthing',
    specs: [
      { label: 'Material', value: 'Copper bonded steel' },
      { label: 'Construction', value: 'Strip in pipe' },
      { label: 'Soil Suitability', value: 'pH 5.0 to 8.0' }
    ],
    table: { columns: ELECTRODE_COLUMNS, rows: electrodeRows('NSCB', ['48', '58', '88']) }
  },
  {
    id: 'pure-copper-earthing-electrode',
    title: 'Pure Copper Earthing Electrode',
    code: 'NS PC-007',
    image: IMG + 'pure-copper-earthing-electrode.webp',
    description: 'Pure copper earthing electrode for the lowest earth resistance and maximum life in critical installations.',
    features: ['Pure copper', '1, 2 & 3 m lengths', 'Moisture booster chemical bags'],
    category: 'earthing',
    specs: [
      { label: 'Material', value: 'Pure copper' },
      { label: 'Construction', value: 'Strip in pipe' },
      { label: 'Soil Suitability', value: 'pH 5.0 to 8.0' }
    ],
    table: { columns: ELECTRODE_COLUMNS, rows: electrodeRows('NSPC', ['48', '58', '88']) }
  },
  {
    id: 'copper-bonded-earthing-rod',
    title: 'Copper Bonded Earthing Rod',
    code: 'NSCBR-004',
    image: IMG + 'copper-bonded-earthing-rod.webp',
    description: 'Copper bonded earthing rods with 250 micron copper bonding (100 micron also available) for low resistance earthing and strong corrosion resistance. UL listed and certified.',
    features: ['250 micron copper bonding', '14.2 mm to 25 mm diameter', 'UL listed & certified'],
    category: 'earthing',
    specs: [
      { label: 'Copper Bonding', value: '250 micron (100 micron available)' },
      { label: 'Diameter', value: '14.2, 17.2, 23.2 & 25 mm' },
      { label: 'Length', value: '1000, 2000 & 3000 mm' },
      { label: 'Certification', value: 'UL listed and certified' }
    ],
    table: {
      columns: ['Model', 'Rod Dia. (mm)', 'Length (mm)', 'Copper Bonding'],
      rows: [
        ['NS 14.2/1CBR', '14.2', '1000', '250 micron'],
        ['NS 14.2/2CBR', '14.2', '2000', '250 micron'],
        ['NS 14.2/3CBR', '14.2', '3000', '250 micron'],
        ['NS 17.2/1CBR', '17.2', '1000', '250 micron'],
        ['NS 17.2/2CBR', '17.2', '2000', '250 micron'],
        ['NS 17.2/3CBR', '17.2', '3000', '250 micron'],
        ['NS 23.2/2CBR', '23.2', '2000', '250 micron'],
        ['NS 23.2/3CBR', '23.2', '3000', '250 micron'],
        ['NS 25.2/2CBR', '25', '2000', '250 micron'],
        ['NS 25.2/3CBR', '25', '3000', '250 micron']
      ]
    }
  },
  {
    id: 'backfill-compound',
    title: 'Nexus Backfill Compound',
    image: IMG + 'backfill-compound.webp',
    description: 'Graphite based earthing backfill compound that keeps soil moist for longer and lowers ground resistance, without needing water over time.',
    features: ['Resistivity below 0.2 ohm-metre', 'No need to add water', 'Tested at NABL accredited lab'],
    category: 'earthing',
    specs: [
      { label: 'Base', value: 'Graphite based, non-toxic' },
      { label: 'Resistivity', value: 'Less than 0.2 ohm-metre' },
      { label: 'Packing', value: '25 kg bag / 15 kg bucket' },
      { label: 'Testing', value: 'NABL accredited lab' }
    ],
    table: {
      columns: ['Quantity', 'No. of Bags'],
      rows: [['25 kg', '1'], ['15 kg', '1']]
    }
  },
  {
    id: 'earth-pit-cover',
    title: 'Earth Pit Covers (Poly Plastic)',
    image: IMG + 'earth-pit-cover.webp',
    description: 'Durable round and square poly plastic pit covers for earthing, grounding and utility applications.',
    features: ['Round 6" & 10" covers', 'Square 300 × 300 mm cover', 'Strong, durable, long life'],
    category: 'earthing',
    specs: [
      { label: 'Material', value: 'Poly plastic' },
      { label: 'Shapes', value: 'Round & square' }
    ],
    table: {
      columns: ['Type', 'Material', 'Size'],
      rows: [
        ['Round – Small', 'Poly Plastic', '6 inches'],
        ['Round – Big', 'Poly Plastic', '10 inches'],
        ['Square – Big', 'Poly Plastic', '300 × 300 mm']
      ]
    }
  },
  {
    id: 'earth-pit-chamber',
    title: 'Earth Pit Chambers (RCC / FRP / CI)',
    image: IMG + 'earth-pit-chamber.webp',
    description: 'Heavy duty RCC, FRP and CI earth pit chambers in all standard sizes for earthing, grounding and utility applications.',
    features: ['RCC, FRP & CI options', '250×250 to 650×650 mm', 'Easy installation'],
    category: 'earthing',
    specs: [
      { label: 'Types', value: 'RCC, FRP, CI' },
      { label: 'Size Range', value: '250 × 250 mm to 650 × 650 mm' }
    ],
    table: {
      columns: ['Chamber', 'Available Sizes (mm)'],
      rows: [
        ['RCC', '250×250, 300×300, 350×350, 400×400, 450×450, 600×600, 650×650'],
        ['FRP', '250×250, 300×300, 350×350, 450×450, 600×600, 650×650'],
        ['CI', '250×250, 300×300, 350×350, 400×400, 450×450, 600×600, 650×650']
      ]
    }
  },
  {
    id: 'earthing-connecting-components',
    title: 'Earthing Clamps & Connecting Components',
    image: IMG + 'earthing-connecting-components.webp',
    description: 'Clamps, bonds and connectors for secure rod, tape, cable and pipe connections in earthing and lightning protection systems.',
    features: ['Rod, tape & cable clamps', 'U bolt & split connectors', 'Copper tape & pipe clamps'],
    category: 'earthing',
    specs: [
      { label: 'Clamps', value: 'Earthing clamp, U bolt rod clamp (Type E), rod to tape clamp, rod to cable clamp, pipe clamp' },
      { label: 'Bonds & Connectors', value: 'B bond, split connector clamp, tower earth bond' },
      { label: 'Tape', value: 'Copper tape' }
    ]
  },
  {
    id: 'gi-chemical-earthing-pipe',
    title: 'GI Chemical Earthing Pipe',
    image: OLD + 'gi chemical earthing pipe.jpg',
    description: 'GI pipes for chemical earthing systems with enhanced conductivity.',
    features: ['Rust proof', 'Durable', 'Easy to install'],
    category: 'earthing',
    specs: [
      { label: 'Material', value: 'GI Steel' },
      { label: 'Length', value: '3m' },
      { label: 'Diameter', value: '50mm' },
      { label: 'Use', value: 'Chemical earthing' }
    ]
  },
  {
    id: 'ci-pipe',
    title: 'CI Pipe Earthing',
    image: IMG + 'ci-pipe.webp',
    description: 'Cast iron earthing pipes for robust and long-lasting grounding systems.',
    features: ['Strong build', 'Rust resistant', 'Heavy duty'],
    category: 'earthing',
    specs: [
      { label: 'Material', value: 'Cast Iron' },
      { label: 'Diameter', value: '50mm - 100mm' },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Earthing electrodes' }
    ]
  },
  {
    id: 'gi-pipe',
    title: 'GI Pipe',
    image: OLD + 'gi pipe.jpg',
    description: 'Galvanized iron pipes ideal for grounding rods and earthing systems.',
    features: ['Strong', 'Weather resistant', 'Affordable'],
    category: 'earthing',
    specs: [
      { label: 'Material', value: 'GI Steel' },
      { label: 'Length', value: '3m' },
      { label: 'Diameter', value: '20mm - 50mm' },
      { label: 'Use', value: 'Earthing electrodes' }
    ]
  },
  {
    id: 'earthing-lugs',
    title: 'Earthing Lugs',
    image: OLD + 'Earthing lugs.jpg',
    description: 'Strong earthing lugs for secure conductor-to-earthing connections.',
    features: ['High clamping force', 'Corrosion resistant', 'Easy fitting'],
    category: 'earthing',
    specs: [
      { label: 'Material', value: 'Copper / Brass' },
      { label: 'Sizes', value: '6mm - 50mm' },
      { label: 'Finish', value: 'Tin plated' },
      { label: 'Use', value: 'Cable termination' }
    ]
  },
  {
    id: 'earthing-coal',
    title: 'Earthing Coal',
    image: OLD + 'earthing coal.jpg',
    description: 'Conductive earthing coal to improve the soil resistivity around earthing electrodes.',
    features: ['Moisture retention', 'High conductivity', 'Long life'],
    category: 'earthing',
    specs: [
      { label: 'Material', value: 'Charcoal' },
      { label: 'Use', value: 'Soil conductivity' },
      { label: 'Quantity', value: '25kg bags' },
      { label: 'Benefit', value: 'Lower earth resistance' }
    ]
  },
  {
    id: 'earthing-salt',
    title: 'Earthing Salt',
    image: OLD + 'earthing salt.jpg',
    description: 'High quality earthing salt to enhance soil conductivity and lower resistance.',
    features: ['Fast conductivity', 'Moisture attractor', 'Easy use'],
    category: 'earthing',
    specs: [
      { label: 'Material', value: 'Sodium chloride' },
      { label: 'Packaging', value: '25kg bags' },
      { label: 'Use', value: 'Earthing pits' },
      { label: 'Benefits', value: 'Improves soil conductivity' }
    ]
  },

  // ================================ STRIPS =================================
  {
    id: 'gi-earthing-strip',
    title: 'Nexus GI Earthing Strip',
    image: IMG + 'gi-earthing-strip.webp',
    description: 'Hot dip GI earthing strips with a protective zinc coating that greatly reduces corrosion and extends life expectancy up to 15 years.',
    features: ['Min. 86 micron zinc coating', 'Life expectancy up to 15 years', '25×3 mm to 100×12 mm'],
    category: 'strips',
    specs: [
      { label: 'Material', value: 'Hot dip galvanized iron' },
      { label: 'Zinc Coating', value: 'Minimum 86 microns' },
      { label: 'Life Expectancy', value: 'Up to 15 years' },
      { label: 'Sizes', value: '25×3, 25×6, 50×3, 50×6, 100×6, 100×12 mm' }
    ]
  },
  {
    id: 'copper-strip',
    title: 'Nexus Copper Earthing Strip',
    image: IMG + 'copper-earthing-strip.webp',
    description: 'EC grade copper earthing strips used as HV electrodes for standard earthing arrangements on ground mounted LV, MV and HV substations. Protects against atmospheric corrosion for a longer life.',
    features: ['EC grade, 99.9% Cu purity', '25×3 mm to 100×10 mm', 'For LV / MV / HV substations'],
    category: 'strips',
    specs: [
      { label: 'Material', value: 'EC grade copper, 99.9% Cu' },
      { label: 'Sizes', value: '25×3 mm to 100×10 mm' },
      { label: 'Application', value: 'LV / MV / HV substation earthing' }
    ]
  },
  {
    id: 'hpt-dip-gi-flat',
    title: 'Hot Dip GI Flat',
    image: OLD + 'hpt dip gi flat.jpg',
    description: 'Galvanised flats for grounding strips and electrical bonding.',
    features: ['Robust', 'Rust resistant', 'Easy to cut'],
    category: 'strips',
    specs: [
      { label: 'Material', value: 'GI Steel' },
      { label: 'Width', value: '25mm - 150mm' },
      { label: 'Thickness', value: '3mm - 10mm' },
      { label: 'Use', value: 'Earthing bars' }
    ]
  },
  {
    id: 'aluminium-strip',
    title: 'Aluminium Strip',
    image: OLD + 'aluminium strip.jpg',
    description: 'Lightweight aluminium strips for grounding and busbar applications.',
    features: ['Good conductivity', 'Rust resistant', 'Easy mounting'],
    category: 'strips',
    specs: [
      { label: 'Material', value: 'Aluminium' },
      { label: 'Thickness', value: '3mm - 10mm' },
      { label: 'Finish', value: 'Natural' },
      { label: 'Use', value: 'Grounding strip' }
    ]
  },
  {
    id: 'copper-plate',
    title: 'Copper Plate',
    image: OLD + 'copper plate.jpg',
    description: 'Pure copper plates for grounding and electrical bonding applications.',
    features: ['Excellent conductivity', 'Heavy duty', 'Easy install'],
    category: 'strips',
    specs: [
      { label: 'Material', value: 'Copper' },
      { label: 'Thickness', value: '3mm - 5mm' },
      { label: 'Finish', value: 'Polished' },
      { label: 'Use', value: 'Earth pits' }
    ]
  },
  {
    id: 'hot-dip-gi-plate',
    title: 'Hot Dip GI Plate',
    image: OLD + 'hot dip gi plate.jpg',
    description: 'Hot dip galvanised plates for earthing trays and electrical support systems.',
    features: ['High corrosion resistance', 'Strong structure', 'Long lasting'],
    category: 'strips',
    specs: [
      { label: 'Material', value: 'GI Steel' },
      { label: 'Thickness', value: '3mm - 10mm' },
      { label: 'Finish', value: 'Hot dip galvanised' },
      { label: 'Use', value: 'Earthing trays' }
    ]
  },
  {
    id: 'bi-metallic-sheet',
    title: 'Bi Metallic Sheet',
    image: OLD + 'bi metellic sheet.jpg',
    description: 'Durable bi-metallic sheets for earthing and bonding applications.',
    features: ['High conductivity', 'Corrosion resistance', 'Easy fabrication'],
    category: 'strips',
    specs: [
      { label: 'Composition', value: 'Copper & Steel' },
      { label: 'Thickness', value: '1.5mm - 4mm' },
      { label: 'Standard', value: 'IS 6068' },
      { label: 'Length', value: 'Customizable' }
    ]
  },
  {
    id: 'brass-sheet',
    title: 'Brass Sheet',
    image: OLD + 'brass sheet.jpg',
    description: 'High-quality brass sheets for grounding and electrical connectors.',
    features: ['Excellent conductivity', 'Corrosion resistant', 'Durable finish'],
    category: 'strips',
    specs: [
      { label: 'Material', value: 'Brass' },
      { label: 'Gauge', value: '0.5mm - 3mm' },
      { label: 'Finish', value: 'Polished' },
      { label: 'Application', value: 'Earthing busbars' }
    ]
  },

  // ============================ SOLAR BOS ITEMS ============================
  {
    id: 'bos-kit',
    title: 'BOS Kit',
    image: IMG + 'bos-kit.webp',
    description: 'Complete Balance of System kits for residential and commercial solar projects.',
    features: ['IP65 enclosure', 'Pre-wired', 'Easy installation'],
    category: 'solar-bos',
    specs: [
      { label: 'Components', value: 'ACDB, DCDB, MC4' },
      { label: 'Protection', value: 'SPD and Fuses' },
      { label: 'Voltage', value: 'Up to 1500V DC' },
      { label: 'Rating', value: '10A - 63A' }
    ]
  },
  {
    id: 'cable-tray',
    title: 'Cable Tray',
    image: IMG + 'cable-tray.webp',
    description: 'Cable tray systems to support insulated cables for power distribution, control and communication, an alternative to open wiring or conduit that makes cables easy to add, identify and inspect.',
    features: ['Perforated & ladder types', 'GI, stainless steel, aluminium', 'Pre-galv, hot dip or powder coated'],
    category: 'solar-bos',
    specs: [
      { label: 'Material', value: 'Galvanized steel / Stainless steel / Aluminium' },
      { label: 'Surface Finish', value: 'Pre galvanized / Hot dip galvanized / Powder coated' },
      { label: 'Perforated Type', value: 'Vertical or horizontal perforation' },
      { label: 'Ladder Type', value: 'Bolted (knocked down) or welded' }
    ]
  },
  {
    id: 'gi-angle',
    title: 'GI Angle',
    image: OLD + 'gi angle.jpg',
    description: 'Galvanized iron angles for support structures and grounding frames.',
    features: ['Strong', 'Corrosion resistant', 'Easy fabrication'],
    category: 'solar-bos',
    specs: [
      { label: 'Material', value: 'GI Steel' },
      { label: 'Size', value: '20mm - 100mm' },
      { label: 'Finish', value: 'Hot dip galvanised' },
      { label: 'Use', value: 'Mounting support' }
    ]
  },
  {
    id: 'thread-rod',
    title: 'Thread Rod',
    image: OLD + 'thread road.jpg',
    description: 'High strength threaded rods for earthing assemblies and structural supports.',
    features: ['Strong grip', 'Easy fastening', 'Durable'],
    category: 'solar-bos',
    specs: [
      { label: 'Material', value: 'Steel' },
      { label: 'Diameter', value: '8mm - 20mm' },
      { label: 'Length', value: '1m - 3m' },
      { label: 'Application', value: 'Structural support' }
    ]
  },

  // ============================ WIRE AND CABLES ============================
  {
    id: 'dc-cable',
    title: 'DC Cable',
    image: OLD + 'dcCable.jpg',
    description: 'UV-resistant DC cables for solar rooftop and ground-mounted installations.',
    features: ['Flexible routing', 'High durability', 'Weatherproof'],
    category: 'wire-cables',
    specs: [
      { label: 'Insulation', value: 'XLPO' },
      { label: 'Voltage', value: '1.5kV DC' },
      { label: 'Type', value: '2-core / 4-core' },
      { label: 'Standards', value: 'TUV / IS 694' }
    ]
  },
  {
    id: 'cables',
    title: 'Cables',
    image: OLD + 'cables.jpg',
    description: 'Industrial-grade cables for power distribution and grounding applications.',
    features: ['Durable insulation', 'High current', 'Weather resistant'],
    category: 'wire-cables',
    specs: [
      { label: 'Insulation', value: 'XLPE / PVC' },
      { label: 'Voltage', value: '450/750V' },
      { label: 'Conductor', value: 'Copper' },
      { label: 'Use', value: 'Power distribution' }
    ]
  },
  {
    id: 'copper-wire',
    title: 'Copper Wire',
    image: OLD + 'copper wire.jpg',
    description: 'High quality copper wires for earthing and electrical grounding.',
    features: ['Low resistance', 'Flexible', 'Long lasting'],
    category: 'wire-cables',
    specs: [
      { label: 'Material', value: 'Copper' },
      { label: 'Diameter', value: '2mm - 10mm' },
      { label: 'Insulation', value: 'PVC optional' },
      { label: 'Application', value: 'Earthing connections' }
    ]
  },
  {
    id: 'brass-wire',
    title: 'Brass Wire',
    image: OLD + 'brass wire.jpg',
    description: 'Flexible brass wire for grounding connections and earthing joints.',
    features: ['High tensile strength', 'Oxidation resistant', 'Flexible'],
    category: 'wire-cables',
    specs: [
      { label: 'Material', value: 'Brass' },
      { label: 'Diameter', value: '1.5mm - 10mm' },
      { label: 'Form', value: 'Coiled' },
      { label: 'Usage', value: 'Earthing conductors' }
    ]
  }
];

export function productsInCategory(id: CategoryId | string): Product[] {
  return PRODUCTS.filter(p => p.category === id);
}
