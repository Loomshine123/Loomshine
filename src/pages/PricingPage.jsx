import { useState, useEffect } from "react";
import dryCleaningProducts from "../data/dryCleaningProducts";
import { steamPressProducts, shoeCareProducts } from "../data/pricingRatesData";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import { useCart } from "../context/CartContext";
import "../styles/PricingPage.css";

const SERVICE_OPTIONS = [
  { id: "dry-cleaning", name: "DRY CLEANING", subtitle: "Garment by Garment", badge: "Full Catalogue" },
  { id: "steam-press", name: "STEAM PRESS", subtitle: "Crisp Finish", badge: "Per Garment" },
  { id: "wash-fold", name: "WASH & FOLD", subtitle: "Everyday Laundry", badge: "₹79 / KG" },
  { id: "wash-iron", name: "WASH & IRON", subtitle: "Wash & Crisp Press", badge: "₹109 / KG" },
  { id: "shoe-cleaning", name: "SHOE CLEANING", subtitle: "Footwear & Bags", badge: "From ₹399" },
];

export default function PricingPage({ initialService = "dry-cleaning" }) {
  const { addToCart } = useCart();
  const [activeService, setActiveService] = useState(initialService);
  const [activeCategory, setActiveCategory] = useState("Men");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Pricing & Rate Lists | LOOMSHINE Luxury Garment Care";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (initialService) {
      setActiveService(initialService);
    }
  }, [initialService]);

  // Update hash when switching services so users can bookmark or share
  const handleServiceSelect = (serviceId) => {
    setActiveService(serviceId);
    setActiveCategory("Men");
    setSearchQuery("");
    window.history.replaceState(null, "", `#/pricing?service=${serviceId}`);
  };

  // Filter dry cleaning items
  const filteredDryCleaning = dryCleaningProducts.filter((product) => {
    const matchesCategory = product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter steam press items
  const filteredSteamPress = steamPressProducts.filter((product) => {
    const matchesCategory = product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="loom-pricing-page">
      {/* HERO SECTION */}
      <section className="pricing-hero">
        <Container>
          <p className="pricing-hero__eyebrow">LOOMSHINE TRANSPARENT PRICING</p>
          <h1 className="pricing-hero__headline">
            <span>GARMENT CARE.</span>
            <span className="pricing-hero__headline-accent">CLEAR PRICING.</span>
          </h1>
          <p className="pricing-hero__subtext">
            Explore comprehensive rates for every service. Transparent, honest pricing with 
            no hidden charges—handled by dedicated garment care artisans.
          </p>

          <div className="pricing-hero__badges">
            <div className="pricing-hero__badge">
              <span className="badge-icon">✓</span>
              <span>100% Transparent Rates</span>
            </div>
            <div className="pricing-hero__badge">
              <span className="badge-icon">✓</span>
              <span>Doorstep Pickup & Delivery</span>
            </div>
            <div className="pricing-hero__badge">
              <span className="badge-icon">✓</span>
              <span>Fabric-Specific Processing</span>
            </div>
            <div className="pricing-hero__badge">
              <span className="badge-icon">✓</span>
              <span>Quality Assurance</span>
            </div>
          </div>
        </Container>
      </section>

      {/* SERVICE SELECTOR TABS */}
      <section className="pricing-service-selector-section">
        <Container>
          <div className="pricing-selector-header">
            <span className="pricing-selector-label">SELECT A SERVICE TO VIEW PRICES</span>
            <h2 className="pricing-selector-title">CHOOSE GARMENT CARE CATEGORY</h2>
          </div>

          <div className="pricing-services-nav">
            {SERVICE_OPTIONS.map((service) => (
              <button
                key={service.id}
                type="button"
                className={`pricing-service-tab ${activeService === service.id ? "pricing-service-tab--active" : ""}`}
                onClick={() => handleServiceSelect(service.id)}
              >
                <div className="pricing-service-tab__top">
                  <span className="pricing-service-tab__badge">{service.badge}</span>
                  <span className="pricing-service-tab__arrow">→</span>
                </div>
                <h3 className="pricing-service-tab__name">{service.name}</h3>
                <span className="pricing-service-tab__subtitle">{service.subtitle}</span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* SERVICE CONTENT CONTAINER */}
      <section className="pricing-content-section">
        <Container>
          {/* ========================================================================= */}
          {/* OPTION 1: DRY CLEANING PRICE LIST (FULL GARMENT CATALOGUE) */}
          {/* ========================================================================= */}
          {activeService === "dry-cleaning" && (
            <div className="service-price-block">
              <div className="service-price-block__header">
                <div>
                  <span className="section-pretitle">DRY CLEANING RATE LIST</span>
                  <h2 className="service-price-block__title">INDIVIDUAL GARMENT DRY CLEANING</h2>
                  <p className="service-price-block__desc">
                    Specialised organic dry cleaning for delicate fabrics, designer wear, formal suits, silks, and woollens.
                  </p>
                </div>
                <Button href="#/contact?service=dry-cleaning" variant="primary" size="md">
                  Book Dry Cleaning Pickup +
                </Button>
              </div>

              {/* CATEGORY TABS & SEARCH */}
              <div className="pricing-subnav-row">
                <div className="pricing-category-tabs">
                  {["Men", "Women", "Household"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`pricing-category-btn ${activeCategory === cat ? "pricing-category-btn--active" : ""}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat.toUpperCase()} GARMENTS
                    </button>
                  ))}
                </div>

                <div className="pricing-search-box">
                  <input
                    type="text"
                    placeholder={`Search ${activeCategory.toLowerCase()} items (e.g. suit, saree, coat)...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pricing-search-input"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="pricing-search-clear"
                      onClick={() => setSearchQuery("")}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* PRODUCTS GRID */}
              <div className="pricing-products-grid">
                {filteredDryCleaning.map((product) => (
                  <article className="pricing-product-card" key={product.id}>
                    <div className="pricing-product-card__image-box">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="pricing-product-card__img"
                        loading="lazy"
                      />
                      <span className="pricing-product-card__cat-tag">{product.category}</span>
                    </div>

                    <div className="pricing-product-card__body">
                      <h4 className="pricing-product-card__title">{product.name}</h4>
                      <p className="pricing-product-card__desc">
                        {product.shortDescription}
                      </p>

                      <div className="pricing-product-card__footer">
                        <div className="pricing-product-card__pricing">
                          <span className="price-tag-label">PRICE</span>
                          <span className="price-tag-amount">₹{product.price}</span>
                          <span className="price-tag-unit">{product.unit}</span>
                        </div>

                        <div className="pricing-card-actions">
                          <button
                            type="button"
                            className="pricing-add-cart-btn"
                            onClick={() => addToCart({ ...product, service: 'Dry Cleaning' })}
                          >
                            + Add to Bag
                          </button>
                          <Button
                            href={`#/contact?service=dry-cleaning&item=${encodeURIComponent(product.name)}`}
                            variant="dark"
                            size="sm"
                          >
                            Book Pickup
                          </Button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredDryCleaning.length === 0 && (
                <div className="pricing-empty-state">
                  <p>No items found matching "{searchQuery}" in {activeCategory}.</p>
                  <Button variant="text" size="sm" onClick={() => setSearchQuery("")}>
                    Clear search
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* OPTION 2: STEAM PRESS PRICE LIST */}
          {/* ========================================================================= */}
          {activeService === "steam-press" && (
            <div className="service-price-block">
              <div className="service-price-block__header">
                <div>
                  <span className="section-pretitle">STEAM PRESS RATE LIST</span>
                  <h2 className="service-price-block__title">PRECISION STEAM PRESSING</h2>
                  <p className="service-price-block__desc">
                    High-pressure vacuum steam finish. Eliminates wrinkles, restores garment shape, and leaves zero shine or iron marks.
                  </p>
                </div>
                <Button href="#/contact?service=steam-press" variant="primary" size="md">
                  Book Steam Press Pickup +
                </Button>
              </div>

              {/* CATEGORY TABS & SEARCH */}
              <div className="pricing-subnav-row">
                <div className="pricing-category-tabs">
                  {["Men", "Women", "Household"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`pricing-category-btn ${activeCategory === cat ? "pricing-category-btn--active" : ""}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat.toUpperCase()} PRESSING
                    </button>
                  ))}
                </div>

                <div className="pricing-search-box">
                  <input
                    type="text"
                    placeholder={`Search steam press items...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pricing-search-input"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="pricing-search-clear"
                      onClick={() => setSearchQuery("")}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* STEAM PRESS ITEMS TABLE / GRID */}
              <div className="steam-press-grid">
                {filteredSteamPress.map((item) => (
                  <div
                    className={`steam-press-item-card ${item.image ? "steam-press-item-card--has-image" : ""}`}
                    key={item.id}
                  >
                    {item.image && (
                      <div className="steam-press-item-card__image-box">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="steam-press-item-card__img"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="steam-press-item-card__content">
                      <div className="steam-press-item-card__main">
                        <h4 className="steam-press-item-name">{item.name}</h4>
                        <p className="steam-press-item-desc">{item.shortDescription}</p>
                        <div className="steam-press-item-meta">
                          <span className="steam-press-turnaround">⏱ {item.turnaround}</span>
                          <span className="steam-press-unit">{item.unit}</span>
                        </div>
                      </div>
                      <div className="steam-press-item-card__price-box">
                        <span className="steam-press-rate">₹{item.price}</span>
                        <div className="pricing-card-actions">
                          <button
                            type="button"
                            className="pricing-add-cart-btn"
                            onClick={() => addToCart({ ...item, service: 'Steam Press' })}
                          >
                            + Add to Bag
                          </button>
                          <Button
                            href={`#/contact?service=steam-press&item=${encodeURIComponent(item.name)}`}
                            variant="dark"
                            size="sm"
                          >
                            Select
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredSteamPress.length === 0 && (
                <div className="pricing-empty-state">
                  <p>No steam press items found matching "{searchQuery}".</p>
                  <Button variant="text" size="sm" onClick={() => setSearchQuery("")}>
                    Clear search
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* OPTION 3: WASH & FOLD (LAUNDRY BY KG) */}
          {/* ========================================================================= */}
          {activeService === "wash-fold" && (
            <div className="service-price-block">
              <div className="service-price-block__header">
                <div>
                  <span className="section-pretitle">LAUNDRY BY WEIGHT</span>
                  <h2 className="service-price-block__title">EVERYDAY WASH & FOLD</h2>
                  <p className="service-price-block__desc">
                    Hygienic machine wash with bio-detergents, tumble dry, and neat fold packaging for daily wear and home linens.
                  </p>
                </div>
                <Button href="#/contact?service=wash-fold" variant="primary" size="md">
                  Book Laundry Pickup +
                </Button>
              </div>

              <div className="kg-pricing-overview">
                <div className="kg-pricing-banner">
                  <div className="kg-pricing-banner__cost">
                    <span className="kg-currency">₹</span>
                    <span className="kg-number">79</span>
                    <span className="kg-unit">/ KG</span>
                  </div>
                  <div className="kg-pricing-banner__info">
                    <h3>All-Inclusive Weight-Based Laundry</h3>
                    <p>Minimum load: 4 KG • Standard turnaround: 24 - 48 Hours</p>
                    <span className="kg-highlight-pill">✓ FREE Pick-up & Delivery Included</span>
                  </div>
                  <Button href="#/contact?service=wash-fold" variant="dark" size="lg">
                    Schedule Pickup →
                  </Button>
                </div>

                <div className="laundry-breakdown-grid">
                  <div className="laundry-feature-box">
                    <div className="laundry-feature-icon">✦</div>
                    <h4>What's Included</h4>
                    <ul className="laundry-list">
                      <li>Sorting by whites, lights & darks</li>
                      <li>Eco-friendly enzyme detergents</li>
                      <li>Temperature-monitored wash cycle</li>
                      <li>Gentle low-heat tumble drying</li>
                      <li>Neatly folded & wrapped packaging</li>
                    </ul>
                  </div>

                  <div className="laundry-feature-box">
                    <div className="laundry-feature-icon">◈</div>
                    <h4>Ideal Items</h4>
                    <ul className="laundry-list">
                      <li>T-shirts, polo shirts & shorts</li>
                      <li>Gym, sportswear & nightwear</li>
                      <li>Everyday cotton home wear</li>
                      <li>Bath towels & hand towels</li>
                      <li>Daily cotton bedsheets & covers</li>
                    </ul>
                  </div>

                  <div className="laundry-feature-box">
                    <div className="laundry-feature-icon">◇</div>
                    <h4>Optional Care Add-ons</h4>
                    <ul className="laundry-list">
                      <li>Stain Pre-treatment (+₹30 / KG)</li>
                      <li>Fabric Sanitizer & Softener (+₹15 / KG)</li>
                      <li>Anti-Allergen Fragrance-Free Rinse</li>
                      <li>Express 24H Turnaround (+₹20 / KG)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* OPTION 4: WASH & IRON */}
          {/* ========================================================================= */}
          {activeService === "wash-iron" && (
            <div className="service-price-block">
              <div className="service-price-block__header">
                <div>
                  <span className="section-pretitle">COMPLETE CARE BY WEIGHT</span>
                  <h2 className="service-price-block__title">WASH & CRISP STEAM IRON</h2>
                  <p className="service-price-block__desc">
                    Expert washing followed by precision steam iron press. Your everyday clothes returned ready to wear directly from the wardrobe.
                  </p>
                </div>
                <Button href="#/contact?service=wash-iron" variant="primary" size="md">
                  Book Wash & Iron Pickup +
                </Button>
              </div>

              <div className="kg-pricing-overview">
                <div className="kg-pricing-banner kg-pricing-banner--iron">
                  <div className="kg-pricing-banner__cost">
                    <span className="kg-currency">₹</span>
                    <span className="kg-number">109</span>
                    <span className="kg-unit">/ KG</span>
                  </div>
                  <div className="kg-pricing-banner__info">
                    <h3>Full Wash & Steam Press Package</h3>
                    <p>Minimum load: 3 KG • Standard turnaround: 24 - 48 Hours</p>
                    <span className="kg-highlight-pill">✓ Hanger or Fold Packaging Options</span>
                  </div>
                  <Button href="#/contact?service=wash-iron" variant="dark" size="lg">
                    Schedule Pickup →
                  </Button>
                </div>

                <div className="laundry-breakdown-grid">
                  <div className="laundry-feature-box">
                    <div className="laundry-feature-icon">✦</div>
                    <h4>Professional Washing</h4>
                    <ul className="laundry-list">
                      <li>Fabric-specific gentle cycles</li>
                      <li>Colour-protecting bio detergents</li>
                      <li>Fabric conditioner for soft touch</li>
                      <li>Spot stain pre-inspection</li>
                    </ul>
                  </div>

                  <div className="laundry-feature-box">
                    <div className="laundry-feature-icon">◈</div>
                    <h4>Precision Steam Pressing</h4>
                    <ul className="laundry-list">
                      <li>Sharp crease line on trousers</li>
                      <li>Roll-lapel collar steam alignment</li>
                      <li>Zero scorch marks or fabric shine</li>
                      <li>Delivered on high-grade hangers or crisp folds</li>
                    </ul>
                  </div>

                  <div className="laundry-feature-box">
                    <div className="laundry-feature-icon">◇</div>
                    <h4>Best Suited For</h4>
                    <ul className="laundry-list">
                      <li>Workplace office shirts & blouses</li>
                      <li>Formal trousers & chinos</li>
                      <li>Daily cotton kurtas & pyjamas</li>
                      <li>Regular cotton sarees & dresses</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* OPTION 5: SHOE CLEANING & BAG CARE */}
          {/* ========================================================================= */}
          {activeService === "shoe-cleaning" && (
            <div className="service-price-block">
              <div className="service-price-block__header">
                <div>
                  <span className="section-pretitle">FOOTWEAR & ACCESSORY REJUVENATION</span>
                  <h2 className="service-price-block__title">SHOE & LEATHER BAG CARE</h2>
                  <p className="service-price-block__desc">
                    Deep restoration for sneakers, formal leather shoes, suede boots, and luxury bags.
                  </p>
                </div>
                <Button href="#/contact?service=shoe-cleaning" variant="primary" size="md">
                  Book Shoe Pickup +
                </Button>
              </div>

              <div className="shoe-pricing-grid">
                {shoeCareProducts.map((item) => (
                  <div className="shoe-card" key={item.id}>
                    {item.image && (
                      <div className="shoe-card__image-box">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="shoe-card__img"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="shoe-card__header">
                      <span className="shoe-card__turnaround">⏱ {item.turnaround}</span>
                      <span className="shoe-card__unit">{item.unit}</span>
                    </div>
                    <h4 className="shoe-card__title">{item.name}</h4>
                    <p className="shoe-card__desc">{item.shortDescription}</p>
                      <div className="shoe-card__footer">
                        <div className="shoe-card__price">
                          <span className="shoe-card__price-label">PRICE</span>
                          <strong className="shoe-card__price-val">₹{item.price}</strong>
                        </div>
                        <div className="pricing-card-actions">
                          <button
                            type="button"
                            className="pricing-add-cart-btn"
                            onClick={() => addToCart({ ...item, service: 'Shoe Cleaning' })}
                          >
                            + Add to Bag
                          </button>
                          <Button
                            href={`#/contact?service=shoe-cleaning&item=${encodeURIComponent(item.name)}`}
                            variant="dark"
                            size="sm"
                          >
                            Select
                          </Button>
                        </div>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* BOTTOM HELP BANNER */}
      <section className="pricing-help-strip">
        <Container>
          <div className="pricing-help-box">
            <div className="pricing-help-left">
              <h3>Have garments not listed here?</h3>
              <p>
                From wedding lehengas and cashmere overcoats to antique tapestries, 
                our master cleaners provide customized evaluations.
              </p>
            </div>
            <div className="pricing-help-actions">
              <Button href="#/contact?service=other-services" variant="primary" size="lg">
                Book a Custom Pickup →
              </Button>
              <Button href="tel:+919876543210" variant="dark-outline" size="lg">
                Call Support
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
