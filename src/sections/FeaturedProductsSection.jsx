import { useState } from 'react';
import Container from '../components/common/Container';
import { useCart } from '../context/CartContext';
import menSuitImage from '../assets/dry-cleaning/men/suit-2-piece.png';
import lehengaImage from '../assets/dry-cleaning/women/lehenga-zari.webp';
import overcoatImage from '../assets/dry-cleaning/men/over-coat.avif';
import sneakerImage from '../assets/shoe-cleaning/luxury-designer-sneakers.png';
import './FeaturedProductsSection.css';

const TICKER_ITEMS = [
  '100% ECO-FRIENDLY ORGANIC SOLVENTS',
  'DOORSTEP VALET ACROSS GURUGRAM & MG ROAD',
  'ZERO FABRIC BLEED OR SHRINKAGE',
  'ADVANCED GERMAN STEAM PRESSING',
  '24–48 HOUR EXPRESS TURNAROUND',
  'CUSTOM BARCODE TRACKING & INSPECTION'
];

const FEATURED_GARMENTS = [
  {
    id: 'featured-suit-2-piece',
    badge: 'POPULAR',
    badgeVariant: 'badge--navy',
    category: "MEN'S FORMALS",
    name: 'Gents 2-Piece Suit Dry Clean',
    price: 350,
    unit: 'per piece',
    image: menSuitImage,
    service: 'Dry Cleaning',
    description: 'Hydrocarbon solvent wash with bespoke lapel pressing & shoulder roll finish.',
    turnaround: '24–48 Hours',
  },
  {
    id: 'featured-couture-lehenga',
    badge: 'DELICATE CARE',
    badgeVariant: 'badge--gold',
    category: "WOMEN'S COUTURE",
    name: 'Heavy Zari Lehenga & Dupatta',
    price: 499,
    unit: 'per piece',
    image: lehengaImage,
    service: 'Dry Cleaning',
    description: 'Gentle zero-harsh care safeguarding metallic zari, sequins & delicate handwork.',
    turnaround: '48–72 Hours',
  },
  {
    id: 'featured-woollen-overcoat',
    badge: 'WINTER CARE',
    badgeVariant: 'badge--navy',
    category: 'WINTERWEAR',
    name: 'Pure Woollen Overcoat / Blazer',
    price: 350,
    unit: 'per piece',
    image: overcoatImage,
    service: 'Dry Cleaning',
    description: 'Deep fibre de-linting, anti-moth protection & structured form restoration.',
    turnaround: '24–48 Hours',
  },
  {
    id: 'featured-luxury-sneakers',
    badge: 'SHOE SPA',
    badgeVariant: 'badge--blue',
    category: 'FOOTWEAR SPA',
    name: 'Luxury Designer Sneakers Care',
    price: 399,
    unit: 'per pair',
    image: sneakerImage,
    service: 'Shoe Cleaning',
    description: 'Mid-sole brightening, suede revival, lace refresh & hydrophobic rain shield.',
    turnaround: '3–4 Days',
  },
];

export const FeaturedProductsSection = () => {
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState({});

  const handleAdd = (item) => {
    addToCart(item, 1);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  return (
    <section className="featured-showcase-section" id="featured-products">
      {/* LOOMSHINE RUNNING TICKER */}
      <div className="showcase-ticker-bar" aria-hidden="true">
        <div className="showcase-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((text, idx) => (
            <span key={idx} className="showcase-ticker-item">
              <span className="ticker-diamond">✦</span> {text}
            </span>
          ))}
        </div>
      </div>

      <Container>
        {/* HEADER ROW WITH VIEW ALL LINK */}
        <div className="showcase-header-row">
          <div className="showcase-title-block">
            <span className="showcase-eyebrow">POPULAR GARMENT SERVICES</span>
            <h2 className="showcase-main-title">SIGNATURE GARMENT CARE</h2>
            <div className="showcase-title-underline" />
          </div>

          <a href="#/pricing" className="showcase-view-all-link" title="Explore all Loomshine pricing rates">
            <span>VIEW ALL RATES</span>
            <span className="arrow-icon">→</span>
          </a>
        </div>

        {/* 4-COLUMN PRODUCT GRID */}
        <div className="showcase-products-grid">
          {FEATURED_GARMENTS.map((garment) => {
            const isAdded = !!addedIds[garment.id];

            return (
              <article className="showcase-product-card" key={garment.id}>
                {/* CARD MEDIA WITH LOOMSHINE BADGE */}
                <div className="product-card-media-wrap">
                  {garment.badge && (
                    <span className={`product-card-badge ${garment.badgeVariant || ''}`}>
                      {garment.badge}
                    </span>
                  )}
                  <img
                    src={garment.image}
                    alt={garment.name}
                    className="product-card-image"
                    loading="lazy"
                  />
                </div>

                {/* CARD INFO */}
                <div className="product-card-info">
                  <span className="product-card-category">{garment.category}</span>
                  <h3 className="product-card-title">{garment.name}</h3>

                  <div className="product-card-pricing">
                    <strong className="product-price-current">₹{garment.price}</strong>
                    <span className="product-price-unit">/{garment.unit.replace('per ', '')}</span>
                  </div>

                  <p className="product-card-desc">{garment.description}</p>

                  <button
                    type="button"
                    className={`product-card-add-btn ${isAdded ? 'product-card-add-btn--added' : ''}`}
                    onClick={() => handleAdd(garment)}
                  >
                    {isAdded ? 'ADDED ✓' : 'ADD TO BAG +'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProductsSection;
