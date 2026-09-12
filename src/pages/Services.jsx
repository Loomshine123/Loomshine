import { useState, useEffect } from "react";
import shirtsImage from "../assets/services-shirts.png";
import foldedImage from "../assets/services-folded.png";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import services from "../data/servicesData";
import "../styles/Services.css";

export default function Services() {
  // Default first service expanded or null
  const [selectedService, setSelectedService] = useState("01");

  useEffect(() => {
    document.title = "Services | LOOMSHINE Luxury Garment Care";
    window.scrollTo(0, 0);
  }, []);

  const handleServiceClick = (id) => {
    setSelectedService((current) => (current === id ? null : id));
  };

  return (
    <div className="services-page">
      {/* ========================================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================================= */}
      <section className="services-hero">
        <Container>
          <div className="services-hero__grid">
            <div className="services-hero__text">
              <span className="services-hero__eyebrow">OUR CRAFT & SERVICES</span>
              <h1 className="services-hero__title">
                <span>CARE FOR EVERY</span>
                <span className="services-hero__title-accent">KIND OF CLOTHING.</span>
              </h1>
              <p className="services-hero__desc">
                From everyday essentials to bespoke suits, couture lehengas, and delicate silks—every garment receives meticulous care with transparent, upfront pricing.
              </p>
              <div className="services-hero__cta-group">
                <Button href="#/contact" variant="primary" size="lg">
                  Book a Pickup +
                </Button>
                <Button href="#/pricing" variant="dark-outline" size="lg">
                  Explore Price Lists →
                </Button>
              </div>
            </div>

            <div className="services-hero__media">
              <div className="services-hero__image-frame">
                <img
                  src={shirtsImage}
                  alt="Crisp pressed luxury garments"
                  className="services-hero__img"
                />
                <span className="services-hero__media-tag">LOOMSHINE SPECIALISED CARE</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* SERVICES LIST ACCORDION */}
      {/* ========================================================================= */}
      <section className="services-list-section">
        <Container>
          <div className="services-section-header">
            <span className="services-section-eyebrow">COMPLETE SERVICE RANGE</span>
            <h2 className="services-section-title">EXPLORE OUR TAILORED SOLUTIONS</h2>
            <p className="services-section-desc">
              Select any service below to view our multi-stage care process, garment suitability, and starting rates.
            </p>
          </div>

          <div className="services-accordion">
            {services.map((service) => {
              const isSelected = selectedService === service.id;

              return (
                <article
                  className={`service-item ${isSelected ? "service-item--active" : ""}`}
                  key={service.id}
                >
                  {/* SERVICE HEADER BAR */}
                  <button
                    type="button"
                    className="service-item__header"
                    onClick={() => handleServiceClick(service.id)}
                    aria-expanded={isSelected}
                  >
                    <div className="service-item__left">
                      <span className="service-item__num">{service.id}</span>
                      <div className="service-item__titles">
                        <h3 className="service-item__name">{service.name}</h3>
                        <p className="service-item__short-desc">{service.shortDescription}</p>
                      </div>
                    </div>

                    <div className="service-item__right">
                      <div className="service-item__price-badge">
                        <span className="price-badge-label">STARTING FROM</span>
                        <strong className="price-badge-val">{service.price}</strong>
                        <span className="price-badge-unit">{service.unit}</span>
                      </div>

                      <div className="service-item__toggle">
                        <span className="service-toggle-icon">{isSelected ? "−" : "+"}</span>
                      </div>
                    </div>
                  </button>

                  {/* EXPANDED SERVICE DETAILS */}
                  {isSelected && (
                    <div className="service-item__drawer">
                      <div className="service-drawer__grid">
                        {/* LEFT: IMAGE */}
                        <div className="service-drawer__media">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="service-drawer__img"
                          />
                        </div>

                        {/* CENTER: PROCESS & FEATURES */}
                        <div className="service-drawer__info">
                          <h4 className="service-drawer__heading">Process & Fabric Care</h4>
                          <p className="service-drawer__details">{service.details}</p>

                          {service.features && service.features.length > 0 && (
                            <div className="service-drawer__features">
                              <h5 className="service-drawer__features-title">KEY HIGHLIGHTS:</h5>
                              <ul className="service-features-list">
                                {service.features.map((feature) => (
                                  <li key={feature} className="service-feature-item">
                                    <span className="feature-check">✓</span>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* RIGHT: RATE CARD & ACTIONS */}
                        <div className="service-drawer__actions">
                          <div className="service-action-card">
                            <span className="action-card-eyebrow">TRANSPARENT PRICING</span>
                            <div className="action-card-price">
                              <strong className="action-price-number">{service.price}</strong>
                              <span className="action-price-unit">{service.unit}</span>
                            </div>
                            <p className="action-card-note">
                              Guaranteed pickup and doorstep delivery with order status updates.
                            </p>

                            <div className="action-card-buttons">
                              <Button
                                href={`#/services/${service.slug}`}
                                variant="dark"
                                size="md"
                                fullWidth
                              >
                                View Service Details →
                              </Button>
                              <Button
                                href={`#/pricing?service=${service.slug}`}
                                variant="dark-outline"
                                size="md"
                                fullWidth
                              >
                                View Price List →
                              </Button>
                              <Button
                                href={`#/contact?service=${service.slug}`}
                                variant="primary"
                                size="md"
                                fullWidth
                              >
                                Book a Pickup +
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* BRAND PROMISE SECTION */}
      {/* ========================================================================= */}
      <section className="services-promise-section">
        <Container>
          <div className="services-promise__grid">
            <div className="services-promise__media">
              <div className="services-promise__image-wrapper">
                <img
                  src={foldedImage}
                  alt="Freshly folded crisp garments"
                  className="services-promise__img"
                />
              </div>
            </div>

            <div className="services-promise__content">
              <span className="services-promise__eyebrow">THE LOOMSHINE PROMISE</span>
              <h2 className="services-promise__title">
                WE DON'T JUST CLEAN CLOTHES.<br />
                WE CARE FOR THEM.
              </h2>
              <p className="services-promise__desc">
                Every garment is individually inspected upon arrival. We adjust water temperature, bio-detergents, and pressing heat specifically to match each fabric's structural requirements.
              </p>

              <div className="promise-cards-grid">
                <div className="promise-card">
                  <div className="promise-card__icon">✦</div>
                  <h4 className="promise-card__title">FABRIC-FIRST CARE</h4>
                  <p className="promise-card__text">
                    Custom chemistry and tailored programs for silks, woollens, linens, and blended couture.
                  </p>
                </div>

                <div className="promise-card">
                  <div className="promise-card__icon">◈</div>
                  <h4 className="promise-card__title">QUALITY CONTROL</h4>
                  <p className="promise-card__text">
                    Multi-point scrutiny for spot stains, cuff finishes, button integrity, and crisp creasing.
                  </p>
                </div>

                <div className="promise-card">
                  <div className="promise-card__icon">◇</div>
                  <h4 className="promise-card__title">DOORSTEP PICKUP</h4>
                  <p className="promise-card__text">
                    Reliable collection and hanger/fold delivery right at your preferred time window.
                  </p>
                </div>

                <div className="promise-card">
                  <div className="promise-card__icon">✓</div>
                  <h4 className="promise-card__title">TRANSPARENT RATES</h4>
                  <p className="promise-card__text">
                    Clear upfront pricing with no surprise charges and live tracking every step of the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* BOTTOM CTA STRIP */}
      {/* ========================================================================= */}
      <section className="services-cta-strip">
        <Container>
          <div className="services-cta-box">
            <div className="services-cta-text">
              <h3>Ready to give your clothes the care they deserve?</h3>
              <p>Schedule your pickup in under two minutes, and our team will take care of the rest.</p>
            </div>
            <div className="services-cta-buttons">
              <Button href="#/contact" variant="primary" size="lg">
                Book a Pickup +
              </Button>
              <Button href="#/pricing" variant="dark-outline" size="lg">
                Check All Prices →
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}