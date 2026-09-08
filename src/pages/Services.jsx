import { useState } from "react";
import shirtsImage from "../assets/services-shirts.png";
import foldedImage from "../assets/services-folded.png";
import "../styles/Services.css";
import services from "../data/servicesData";

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (id) => {
    setSelectedService((current) =>
      current === id ? null : id
    );
  };

  return (
    <div className="services-page">

      {/* HERO SECTION */}
      <section className="services-hero">
        <div className="services-hero-content">
          <div className="services-hero-text">
            <span className="services-eyebrow">
              OUR SERVICES
            </span>

            <h1>
              CARE FOR
              <br />
              EVERY KIND
              <br />
              OF CLOTHING.
            </h1>

            <p>
              From everyday essentials to delicate garments,
              every item receives the care it deserves with
              clear, honest pricing before you book.
            </p>
          </div>

          <div className="services-hero-image">
            <img
              src={shirtsImage}
              alt="Professional garment care"
            />
          </div>
        </div>
      </section>


      {/* SERVICES SECTION */}
      <section className="services-list-section">

        <div className="services-list">

          {services.map((service) => {
            const isSelected =
              selectedService === service.id;

            return (
              <div
                className={`service-row ${
                  isSelected ? "service-row-active" : ""
                }`}
                key={service.id}
              >

                {/* SERVICE SUMMARY */}
                <button
                  type="button"
                  className="service-summary"
                  onClick={() =>
                    handleServiceClick(service.id)
                  }
                  aria-expanded={isSelected}
                >

                  <span className="service-number">
                    {service.id}
                  </span>

                  <div className="service-summary-content">
                    <h2>{service.name}</h2>

                    <p>
                      {service.shortDescription}
                    </p>
                  </div>

                  <span className="service-expand-icon">
                    {isSelected ? "−" : "+"}
                  </span>

                </button>


                {/* EXPANDED CONTENT */}
                {isSelected && (
                  <div className="expanded-service">

                    <div className="expanded-service-content">

                      <div className="expanded-service-info">

                        <p className="expanded-description">
                          {service.details}
                        </p>


                        {/* FEATURES */}
                        {service.features &&
                          service.features.length > 0 && (
                            <div className="service-features">

                              {service.features.map(
                                (feature) => (
                                  <span
                                    key={feature}
                                  >
                                    {feature}
                                  </span>
                                )
                              )}

                            </div>
                          )}

                      </div>


                      {/* PRICE */}
                      <div className="expanded-service-price">

                        <span className="starting-from">
                          STARTING FROM
                        </span>

                        <strong>
                          {service.price}
                        </strong>

                        <span className="price-unit">
                          {service.unit}
                        </span>

                      </div>

                    </div>


                    {/* CTA */}
                    <div className="expanded-service-cta">

                      <a
                        href={`#/services/${service.slug}`}
                        className="view-service-btn"
                      >
                        VIEW SERVICE →
                      </a>

                    </div>

                  </div>
                )}

              </div>
            );
          })}

        </div>

      </section>


      {/* OUR PROMISE SECTION */}
      <section className="promise-section">

        <div className="promise-container">

          {/* IMAGE */}
          <div className="promise-image-wrapper">
            <img
              src={foldedImage}
              alt="Freshly folded clothes"
              className="promise-image"
            />
          </div>


          {/* CONTENT */}
          <div className="promise-content">

            <span className="promise-eyebrow">
              OUR PROMISE
            </span>

            <h2>
              WE DON'T JUST
              <br />
              CLEAN CLOTHES.
              <br />
              WE CARE FOR
              <br />
              THEM.
            </h2>

            <p className="promise-description">
              Every garment deserves the right process,
              the right attention and the right finish.
            </p>


            {/* PROMISE GRID */}
            <div className="promise-grid">

              <div className="promise-card">
                <span>
                  FABRIC-FIRST CARE
                </span>

                <p>
                  Each garment is treated according to its
                  fabric and finish.
                </p>
              </div>


              <div className="promise-card">
                <span>
                  QUALITY CONTROL
                </span>

                <p>
                  Every order is checked before it leaves
                  our facility.
                </p>
              </div>


              <div className="promise-card">
                <span>
                  DOORSTEP CONVENIENCE
                </span>

                <p>
                  Pickup and delivery on a schedule that
                  suits you.
                </p>
              </div>


              <div className="promise-card">
                <span>
                  TRANSPARENT SERVICE
                </span>

                <p>
                  Clear pricing and honest updates at
                  every stage.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}