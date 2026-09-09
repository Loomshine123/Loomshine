import { useEffect, useState } from "react";
import services from "../../data/servicesData";
import Button from "../common/Button";
import "../services/ServiceDetailPage.css";

export default function ServiceDetail({ slug: propSlug }) {
  const getSlugFromHash = () => {
    const hash = window.location.hash;

    // Example:
    // #/services/wash-fold
    const parts = hash.split("/");

    return parts[parts.length - 1];
  };

  const [slug, setSlug] = useState(propSlug || getSlugFromHash());

  useEffect(() => {
    if (propSlug) {
      setSlug(propSlug);
    }
  }, [propSlug]);

  useEffect(() => {
    const handleHashChange = () => {
      setSlug(getSlugFromHash());
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const service = services.find(
    (item) => item.slug === slug
  );

  if (!service) {
    return (
      <div className="service-not-found">
        <h1>Service Not Found</h1>

        <a href="#/services">
          BACK TO SERVICES
        </a>
      </div>
    );
  }

  return (
    <main className="service-detail-page">

      {/* HERO */}

      <section className="service-detail-hero">

        <div className="service-detail-container">

          {/* LEFT IMAGE */}

          <div className="service-image-column">

            <div className="service-image-wrapper">
              <img
                src={service.image}
                alt={service.name}
                className="service-main-image"
              />

              <div className="service-image-number">
                {service.id}
              </div>
            </div>

          </div>


          {/* RIGHT CONTENT */}

          <div className="service-content-column">

            <span className="service-detail-eyebrow">
              LOOMSHINE PROFESSIONAL CARE
            </span>

            <h1 className="service-detail-title">
              {service.name}
            </h1>

            <p className="service-detail-short-description">
              {service.shortDescription}
            </p>


            {/* PRICE */}

            <div className="service-price-section">

              <span className="service-price-label">
                STARTING FROM
              </span>

              <div className="service-price-row">

                <strong>
                  {service.price}
                </strong>

                <span>
                  {service.unit}
                </span>

              </div>

            </div>


            {/* FEATURES */}

            <div className="service-detail-features">

              {service.features.map((feature) => (
                <div
                  className="service-detail-feature"
                  key={feature}
                >
                  <span className="feature-line">
                    —
                  </span>

                  {feature}
                </div>
              ))}

            </div>


            {/* BUTTONS */}

            <div className="service-action-buttons">

              <button
                className="add-to-cart-btn"
                onClick={() => {
                  alert(`${service.name} added to cart`);
                }}
              >
                ADD TO CART
              </button>
              <a href="#/contact" className="book-pickup-btn">
                BOOK A PICKUP
              </a>
              <button
                className="view-catalogue-btn"
                onClick={() => {
                  window.location.hash = `#/pricing?service=${slug}`;
                }}
              >
                VIEW PRICE LIST
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ABOUT */}

      <section className="service-about-section">

        <div className="service-about-container">

          <div className="service-about-number">
            ABOUT
          </div>

          <div className="service-about-content">

            <span className="service-about-eyebrow">
              MORE ABOUT OUR SERVICE
            </span>

            <h2>
              About {service.name}
            </h2>

            <p>
              {service.details}
            </p>

          </div>

        </div>

      </section>


      {/* FEATURES SECTION */}

      <section className="service-benefits-section">

        <div className="service-benefits-container">

          <div className="service-benefits-header">

            <span>
              WHY LOOMSHINE
            </span>

            <h2>
              CARE DESIGNED FOR
              <br />
              EVERY GARMENT.
            </h2>

          </div>


          <div className="service-benefits-grid">

            <div className="service-benefit-card">

              <span>01</span>

              <h3>
                PROFESSIONAL CARE
              </h3>

              <p>
                Every item is handled with attention
                to fabric type and garment requirements.
              </p>

            </div>


            <div className="service-benefit-card">

              <span>02</span>

              <h3>
                QUALITY CHECKED
              </h3>

              <p>
                Garments are carefully checked before
                being prepared for delivery.
              </p>

            </div>


            <div className="service-benefit-card">

              <span>03</span>

              <h3>
                DOORSTEP CONVENIENCE
              </h3>

              <p>
                Convenient pickup and delivery designed
                around your schedule.
              </p>

            </div>


            <div className="service-benefit-card">

              <span>04</span>

              <h3>
                TRANSPARENT SERVICE
              </h3>

              <p>
                Clear service details and straightforward
                pricing from start to finish.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* BOTTOM CTA */}

      <section className="service-bottom-cta">

        <div className="service-bottom-cta-content">

          <span>
            READY WHEN YOU ARE
          </span>

          <h2>
            GIVE YOUR CLOTHES
            <br />
            THE CARE THEY DESERVE.
          </h2>

          <Button href="#/contact" variant="dark" size="lg">
            Book a Pickup +
          </Button>

        </div>

      </section>

    </main>
  );
}