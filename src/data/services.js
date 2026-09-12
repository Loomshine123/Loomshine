import laundryServiceImage from '../assets/laundry-service-clean.jpg';

export const servicesData = [
  {
    id: '01',
    slug: 'laundry',
    title: 'Laundry',
    tagline: 'Everyday Wash, Dry & Fold',
    description: 'Everyday washing, drying and folding.',
    longDescription: "Take laundry off your everyday to-do list with LOOMSHINE's professional Wash & Fold service. Your garments are sorted by color and fabric sensitivity, washed in eco-friendly gentle detergents, tumble-dried at fiber-safe temperatures, and delivered neatly steam-refreshed and folded ready for your wardrobe.",
    suitableFor: 'Daily wear, cotton t-shirts, linens, towels, activewear, and bedsheets.',
    turnaround: '24 – 48 Hours',
    priceStarting: 'Starting from ₹79 / KG',
    features: [
      'Fabric-segregated washing cycles',
      'Gentle tumble drying at optimal temperatures',
      'Neat crisp folding and steam refresh',
      'Eco-friendly non-toxic wash solutions'
    ],
    image: laundryServiceImage,
  },
  {
    id: '02',
    slug: 'dry-cleaning',
    title: 'Dry Cleaning',
    tagline: 'Delicate & Formal Garment Care',
    description: 'Professional care for suits, dresses and delicate fabrics.',
    longDescription: "LOOMSHINE's luxury dry cleaning provides specialized bio-solvent care for designer clothing, woollen suits, silk sarees, heavy lehengas, and intricate evening wear. We gently extract stains while preserving fabric structure, vibrant dye, and delicate embroidery without harsh chemical smells.",
    suitableFor: 'Suits, blazers, silk sarees, lehengas, gowns, coats, and sherwanis.',
    turnaround: '48 – 72 Hours',
    priceStarting: 'Starting from ₹100 / garment',
    features: [
      'Advanced solvent cleaning without harsh chemicals',
      'Stain extraction and specialized spot treatment',
      'Hand inspection and custom garment pressing',
      'Breathable protective garment hanger bags'
    ],
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: '03',
    slug: 'press-finish',
    title: 'Press & Finish',
    tagline: 'Precision Steam Pressing',
    description: 'Crisp pressing and finishing for a polished look.',
    longDescription: "Our high-pressure precision steam pressing ensures razor-sharp creases and immaculate collar shaping without scorching fabric fibers. Each garment is finished on contoured forms and returned on premium wooden or wire hangers shielded in dust covers.",
    suitableFor: 'Formal shirts, trousers, pleated skirts, kurtas, and delicate silks.',
    turnaround: 'Same Day / 24 Hours',
    priceStarting: 'Starting from ₹49 / piece',
    features: [
      'High-pressure precision steam pressing',
      'Crease perfection on cuffs, collars and pleats',
      'Custom garment hanger and cover presentation',
      'Anti-wrinkle humidity shield finishing'
    ],
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: '04',
    slug: 'shoe-bag-care',
    title: 'Shoe & Bag Care',
    tagline: 'Luxury Leather & Sneaker Restoration',
    description: 'Specialized cleaning for footwear and accessories.',
    longDescription: "Complete restoration and revival for designer sneakers, leather shoes, boots, and luxury handbags. Our craftspeople treat suede, nubuck, canvas, and smooth leathers with specialized conditioning, deep dirt extraction, antibacterial sanitization, and edge recoloring.",
    suitableFor: 'Sneakers, leather formal shoes, luxury handbags, suede boots, and leather jackets.',
    turnaround: '3 – 5 Days',
    priceStarting: 'Starting from ₹399 / pair',
    features: [
      'Material-specific deep cleaning & stain lift',
      'Premium leather nourishment and conditioning',
      'Deodorization and antibacterial sanitization',
      'Sole whitening, edge recoloring & hardware polish'
    ],
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=90',
  }
];
