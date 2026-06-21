export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  image: string;
  description: string;
  features: string[];
  specs: ProductSpec[];
  category: string; // <-- Added this
}

export const PRODUCTS: Product[] = [
  {
    id: 'lightning-arrester',
    title: 'Lightning Arrester',
    image: 'assets/Products/arrester.jpg',
    description: 'Advanced arresters for reliable lightning protection and surge control.',
    features: ['Fast discharge', 'Weatherproof', 'Low maintenance'],
    category: 'Lightning Protection',
    specs: [
      { label: 'Type', value: 'ESE / Conventional' },
      { label: 'Material', value: 'Stainless Steel' },
      { label: 'Protection Radius', value: 'Up to 107m' },
      { label: 'Ingress', value: 'IP65' }
    ]
  },
  {
    id: 'gi-chemical-earthing-pipe',
    title: 'GI Chemical Earthing Pipe',
    image: 'assets/Products/gi chemical earthing pipe.jpg',
    description: 'GI pipes for chemical earthing systems with enhanced conductivity.',
    features: ['Rust proof', 'Durable', 'Easy to install'],
    category: 'Earthing Pipes & Rods',
    specs: [
      { label: 'Material', value: 'GI Steel' },
      { label: 'Length', value: '3m' },
      { label: 'Diameter', value: '50mm' },
      { label: 'Use', value: 'Chemical earthing' }
    ]
  },
  {
    id: 'bos-kit',
    title: 'BOS Kit',
    image: 'assets/Products/BOS.png',
    description: 'Complete Balance of System kits for residential and commercial solar projects.',
    features: ['IP65 enclosure', 'Pre-wired', 'Easy installation'],
    category: 'Solar & BOS',
    specs: [
      { label: 'Components', value: 'ACDB, DCDB, MC4' },
      { label: 'Protection', value: 'SPD and Fuses' },
      { label: 'Voltage', value: 'Up to 1500V DC' },
      { label: 'Rating', value: '10A - 63A' }
    ]
  },
  {
    id: 'dc-cable',
    title: 'DC Cable',
    image: 'assets/Products/dcCable.jpg',
    description: 'UV-resistant DC cables for solar rooftop and ground-mounted installations.',
    features: ['Flexible routing', 'High durability', 'Weatherproof'],
    category: 'Wires & Cables',
    specs: [
      { label: 'Insulation', value: 'XLPO' },
      { label: 'Voltage', value: '1.5kV DC' },
      { label: 'Type', value: '2-core / 4-core' },
      { label: 'Standards', value: 'TUV / IS 694' }
    ]
  },
  {
    id: 'aluminium-strip',
    title: 'Aluminium Strip',
    image: 'assets/Products/aluminium strip.jpg',
    description: 'Lightweight aluminium strips for grounding and busbar applications.',
    features: ['Good conductivity', 'Rust resistant', 'Easy mounting'],
    category: 'Strips & Plates',
    specs: [
      { label: 'Material', value: 'Aluminium' },
      { label: 'Thickness', value: '3mm - 10mm' },
      { label: 'Finish', value: 'Natural' },
      { label: 'Use', value: 'Grounding strip' }
    ]
  },
  {
    id: 'bi-metallic-sheet',
    title: 'Bi Metallic Sheet',
    image: 'assets/Products/bi metellic sheet.jpg',
    description: 'Durable bi-metallic sheets for earthing and bonding applications.',
    features: ['High conductivity', 'Corrosion resistance', 'Easy fabrication'],
    category: 'Strips & Plates',
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
    image: 'assets/Products/brass sheet.jpg',
    description: 'High-quality brass sheets for grounding and electrical connectors.',
    features: ['Excellent conductivity', 'Corrosion resistant', 'Durable finish'],
    category: 'Strips & Plates',
    specs: [
      { label: 'Material', value: 'Brass' },
      { label: 'Gauge', value: '0.5mm - 3mm' },
      { label: 'Finish', value: 'Polished' },
      { label: 'Application', value: 'Earthing busbars' }
    ]
  },
  {
    id: 'brass-wire',
    title: 'Brass Wire',
    image: 'assets/Products/brass wire.jpg',
    description: 'Flexible brass wire for grounding connections and earthing joints.',
    features: ['High tensile strength', 'Oxidation resistant', 'Flexible'],
    category: 'Wires & Cables',
    specs: [
      { label: 'Material', value: 'Brass' },
      { label: 'Diameter', value: '1.5mm - 10mm' },
      { label: 'Form', value: 'Coiled' },
      { label: 'Usage', value: 'Earthing conductors' }
    ]
  },
  {
    id: 'cable-tray',
    title: 'Cable Tray',
    image: 'assets/Products/cables tray.jpg',
    description: 'Strong cable trays for clean and safe cable routing in electrical systems.',
    features: ['Heavy duty', 'Ventilated design', 'Easy mounting'],
    category: 'Accessories',
    specs: [
      { label: 'Material', value: 'GI Steel' },
      { label: 'Finish', value: 'Powder coated' },
      { label: 'Width', value: '100mm - 600mm' },
      { label: 'Application', value: 'Cable management' }
    ]
  },
  {
    id: 'cables',
    title: 'Cables',
    image: 'assets/Products/cables.jpg',
    description: 'Industrial-grade cables for power distribution and grounding applications.',
    features: ['Durable insulation', 'High current', 'Weather resistant'],
    category: 'Wires & Cables',
    specs: [
      { label: 'Insulation', value: 'XLPE / PVC' },
      { label: 'Voltage', value: '450/750V' },
      { label: 'Conductor', value: 'Copper' },
      { label: 'Use', value: 'Power distribution' }
    ]
  },
  {
    id: 'ci-pipe',
    title: 'CI Pipe',
    image: 'assets/Products/ci pipe.jpg',
    description: 'Cast iron earthing pipes for robust and long-lasting grounding systems.',
    features: ['Strong build', 'Rust resistant', 'Heavy duty'],
    category: 'Earthing Pipes & Rods',
    specs: [
      { label: 'Material', value: 'Cast Iron' },
      { label: 'Diameter', value: '50mm - 100mm' },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Earthing electrodes' }
    ]
  },
  {
    id: 'copper-bonded-chemical-earthing-pipe',
    title: 'Copper Bonded Chemical Earthing Pipe',
    image: 'assets/Products/copper bonded chemical earthing pipe.jpg',
    description: 'Chemical earthing pipe with copper bonding for improved soil conductivity.',
    features: ['Enhanced grounding', 'Corrosion protection', 'Long life'],
    category: 'Earthing Pipes & Rods',
    specs: [
      { label: 'Material', value: 'Copper bonded steel' },
      { label: 'Length', value: '3m' },
      { label: 'Diameter', value: '50mm' },
      { label: 'Standard', value: 'IS 3043' }
    ]
  },
  {
    id: 'copper-bonded-earthing-rod',
    title: 'Copper Bonded Earthing Rod',
    image: 'assets/Products/copper bonded earthing rod.jpg',
    description: 'Copper bonded rods for low resistance earthing and strong corrosion resistance.',
    features: ['High conductivity', 'Corrosion shield', 'Longer life'],
    category: 'Earthing Pipes & Rods',
    specs: [
      { label: 'Material', value: 'Copper bonded steel' },
      { label: 'Length', value: '3m' },
      { label: 'Diameter', value: '20mm' },
      { label: 'Coating', value: '99.9% copper' }
    ]
  },
  {
    id: 'copper-plate',
    title: 'Copper Plate',
    image: 'assets/Products/copper plate.jpg',
    description: 'Pure copper plates for grounding and electrical bonding applications.',
    features: ['Excellent conductivity', 'Heavy duty', 'Easy install'],
    category: 'Strips & Plates',
    specs: [
      { label: 'Material', value: 'Copper' },
      { label: 'Thickness', value: '3mm - 5mm' },
      { label: 'Finish', value: 'Polished' },
      { label: 'Use', value: 'Earth pits' }
    ]
  },
  {
    id: 'copper-strip',
    title: 'Copper Strip',
    image: 'assets/Products/copper strip.jpg',
    description: 'Flexible copper strips ideal for building earthing systems and bonding.',
    features: ['Superior conductivity', 'Flexible', 'Rust proof'],
    category: 'Strips & Plates',
    specs: [
      { label: 'Material', value: 'Copper' },
      { label: 'Width', value: '10mm - 50mm' },
      { label: 'Thickness', value: '0.5mm - 3mm' },
      { label: 'Use', value: 'Earthing busbars' }
    ]
  },
  {
    id: 'copper-wire',
    title: 'Copper Wire',
    image: 'assets/Products/copper wire.jpg',
    description: 'High quality copper wires for earthing and electrical grounding.',
    features: ['Low resistance', 'Flexible', 'Long lasting'],
    category: 'Wires & Cables',
    specs: [
      { label: 'Material', value: 'Copper' },
      { label: 'Diameter', value: '2mm - 10mm' },
      { label: 'Insulation', value: 'PVC optional' },
      { label: 'Application', value: 'Earthing connections' }
    ]
  },
  {
    id: 'earthing-coal',
    title: 'Earthing Coal',
    image: 'assets/Products/earthing coal.jpg',
    description: 'Conductive earthing coal to improve the soil resistivity around earthing electrodes.',
    features: ['Moisture retention', 'High conductivity', 'Long life'],
    category: 'Accessories',
    specs: [
      { label: 'Material', value: 'Charcoal' },
      { label: 'Use', value: 'Soil conductivity' },
      { label: 'Quantity', value: '25kg bags' },
      { label: 'Benefit', value: 'Lower earth resistance' }
    ]
  },
  {
    id: 'earthing-lugs',
    title: 'Earthing Lugs',
    image: 'assets/Products/Earthing lugs.jpg',
    description: 'Strong earthing lugs for secure conductor-to-earthing connections.',
    features: ['High clamping force', 'Corrosion resistant', 'Easy fitting'],
    category: 'Accessories',
    specs: [
      { label: 'Material', value: 'Copper / Brass' },
      { label: 'Sizes', value: '6mm - 50mm' },
      { label: 'Finish', value: 'Tin plated' },
      { label: 'Use', value: 'Cable termination' }
    ]
  },
  {
    id: 'earthing-salt',
    title: 'Earthing Salt',
    image: 'assets/Products/earthing salt.jpg',
    description: 'High quality earthing salt to enhance soil conductivity and lower resistance.',
    features: ['Fast conductivity', 'Moisture attractor', 'Easy use'],
    category: 'Accessories',
    specs: [
      { label: 'Material', value: 'Sodium chloride' },
      { label: 'Packaging', value: '25kg bags' },
      { label: 'Use', value: 'Earthing pits' },
      { label: 'Benefits', value: 'Improves soil conductivity' }
    ]
  },
  {
    id: 'gi-angle',
    title: 'GI Angle',
    image: 'assets/Products/gi angle.jpg',
    description: 'Galvanized iron angles for support structures and grounding frames.',
    features: ['Strong', 'Corrosion resistant', 'Easy fabrication'],
    category: 'Accessories',
    specs: [
      { label: 'Material', value: 'GI Steel' },
      { label: 'Size', value: '20mm - 100mm' },
      { label: 'Finish', value: 'Hot dip galvanised' },
      { label: 'Use', value: 'Mounting support' }
    ]
  },
  {
    id: 'gi-pipe',
    title: 'GI Pipe',
    image: 'assets/Products/gi pipe.jpg',
    description: 'Galvanized iron pipes ideal for grounding rods and earthing systems.',
    features: ['Strong', 'Weather resistant', 'Affordable'],
    category: 'Earthing Pipes & Rods',
    specs: [
      { label: 'Material', value: 'GI Steel' },
      { label: 'Length', value: '3m' },
      { label: 'Diameter', value: '20mm - 50mm' },
      { label: 'Use', value: 'Earthing electrodes' }
    ]
  },
  {
    id: 'gi-earthing-electrode',
    title: 'GI Earthing Electrode',
    image: 'assets/Products/gi-earthing-electrode.jpg',
    description: 'Reliable GI earthing electrodes for consistent grounding performance.',
    features: ['Durable', 'Low resistance', 'Easy installation'],
    category: 'Earthing Pipes & Rods',
    specs: [
      { label: 'Material', value: 'GI Steel' },
      { label: 'Length', value: '3m' },
      { label: 'Diameter', value: '20mm' },
      { label: 'Standard', value: 'IS 3043' }
    ]
  },
  {
    id: 'hot-dip-gi-plate',
    title: 'Hot Dip GI Plate',
    image: 'assets/Products/hot dip gi plate.jpg',
    description: 'Hot dip galvanised plates for earthing trays and electrical support systems.',
    features: ['High corrosion resistance', 'Strong structure', 'Long lasting'],
    category: 'Strips & Plates',
    specs: [
      { label: 'Material', value: 'GI Steel' },
      { label: 'Thickness', value: '3mm - 10mm' },
      { label: 'Finish', value: 'Hot dip galvanised' },
      { label: 'Use', value: 'Earthing trays' }
    ]
  },
  {
    id: 'hpt-dip-gi-flat',
    title: 'HPT Dip GI Flat',
    image: 'assets/Products/hpt dip gi flat.jpg',
    description: 'Galvanised flats for grounding strips and electrical bonding.',
    features: ['Robust', 'Rust resistant', 'Easy to cut'],
    category: 'Strips & Plates',
    specs: [
      { label: 'Material', value: 'GI Steel' },
      { label: 'Width', value: '25mm - 150mm' },
      { label: 'Thickness', value: '3mm - 10mm' },
      { label: 'Use', value: 'Earthing bars' }
    ]
  },
  {
    id: 'thread-rod',
    title: 'Thread Rod',
    image: 'assets/Products/thread road.jpg',
    description: 'High strength threaded rods for earthing assemblies and structural supports.',
    features: ['Strong grip', 'Easy fastening', 'Durable'],
    category: 'Accessories',
    specs: [
      { label: 'Material', value: 'Steel' },
      { label: 'Diameter', value: '8mm - 20mm' },
      { label: 'Length', value: '1m - 3m' },
      { label: 'Application', value: 'Structural support' }
    ]
  }
];