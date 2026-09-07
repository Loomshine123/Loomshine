import "./../styles/Services.css";
import shirtsImage from "../assets/services-shirts.png";
import foldedImage from "../assets/services-folded.png";
const services = [
  {
    number: "01",
    title: "LAUNDRY",
    subtitle: "Everyday washing, drying and folding.",
    description:
      "Machine-washed at fabric-safe temperatures with premium detergents. Sorted by colour and fabric, never mixed with other orders.",
    features: [
      "COLOUR-SORTED WASHING",
      "FABRIC-SAFE DETERGENTS",
      "NEATLY FOLDED & PACKED",
    ],
    price: "₹99",
    unit: "PER KG",
  },
  {
    number: "02",
    title: "DRY CLEANING",
    subtitle: "Professional care for suits, dresses and delicate fabrics.",
    description:
      "Solvent-based cleaning by garment specialists for structured and delicate pieces. Each item is inspected and finished by hand.",
    features: [
      "PRE-CLEAN INSPECTION",
      "HAND SPOT TREATMENT",
      "HAND-FINISHED PRESSING",
    ],
    price: "₹149",
    unit: "PER GARMENT",
  },
  {
    number: "03",
    title: "PRESS & FINISH",
    subtitle: "Crisp pressing and finishing for a polished look.",
    description:
      "Steam pressing with professional finishing equipment for a sharp, structured result. Collars, cuffs and pleats get the attention they deserve.",
    features: [
      "STEAM PRESS FINISH",
      "COLLAR & CUFF DETAILING",
      "HANGER OR FOLD RETURN",
    ],
    price: "₹49",
    unit: "PER ITEM",
  },
  {
    number: "04",
    title: "SHOE & BAG CARE",
    subtitle: "Specialized cleaning for footwear and accessories.",
    description:
      "Deep cleaning, conditioning and restoration for sneakers, leather shoes, handbags and backpacks.",
    features: [
      "MATERIAL-SPECIFIC PROCESS",
      "CONDITION & POLISH",
      "RESTORATION AVAILABLE",
    ],
    price: "₹399",
    unit: "PER ITEM",
  },
];

function Services() {
  return (
    <main className="services-page">
      {/* SERVICES HERO */}
      <section className="services-hero">
        <div className="services-container services-hero-content">
          <div className="services-hero-text">
      
            <h1>
              CARE FOR
              <br />
              EVERY KIND
              <br />
              OF
              <br />
              CLOTHING.
            </h1>

            <p>
              From everyday essentials to delicate garments, every item
              receives the care it deserves — with clear, honest pricing
              before you book.
            </p>

            <div className="services-hero-buttons">
              <button className="services-primary-button">
                EXPLORE SERVICES →
              </button>

              <button className="services-secondary-button">
                VIEW PRICES →
              </button>
            </div>
          </div>

          <div className="services-hero-image">
            <img src={shirtsImage} alt="Professional garment care" />

            <span className="services-image-label">
              LOOM LAUNDRY DRY CLEANING
            </span>
          </div>
        </div>

        <div className="services-hero-strip">
          <span>DOORSTEP PICKUP</span>
          <span className="services-strip-divider">/</span>

          <span>PROFESSIONAL CLEANING</span>
          <span className="services-strip-divider">/</span>

          <span>RELIABLE DELIVERY</span>
        </div>
      </section>
      {/* FOUR SERVICES SECTION */}
<section className="services-list-section" id="services">
  <div className="services-container">
    <div className="services-section-heading">
      <div>
        <span className="services-eyebrow">
          OUR SERVICES
        </span>

        <h2>
          FOUR SERVICES.
          <br />
          ONE STANDARD OF CARE.
        </h2>
      </div>

      <p>
        Every order is handled by garment-care professionals, quality
        checked before dispatch and returned on a schedule that suits you.
      </p>
    </div>

    <div className="services-list">
      {services.map((service) => (
        <article className="service-row" key={service.number}>
          <div className="service-number">
            {service.number}
          </div>

          <div className="service-title">
            <h3>{service.title}</h3>
            <p>{service.subtitle}</p>
          </div>

          <div className="service-description">
            <p>{service.description}</p>

            <div className="service-features">
              {service.features.map((feature) => (
                <span key={feature}>
                  — {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="service-price">
            <span>STARTING FROM</span>
            <strong>{service.price}</strong>
            <small>{service.unit}</small>
          </div>

          <button
            className="service-arrow"
            aria-label={`View ${service.title}`}
          >
            →
          </button>
        </article>
      ))}
    </div>
  </div>
</section>
{/* PROMISE SECTION */}
<section className="promise-section">
  <div className="services-container promise-container">

    <div className="promise-image">
      <img
        src={foldedImage}
        alt="Professionally folded and cared for garments"
      />
    </div>

    <div className="promise-content">
      <span className="services-eyebrow">
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

      <p className="promise-intro">
        Every garment deserves the right process, the right attention and
        the right finish.
      </p>

      <div className="promise-grid">
        <div className="promise-card">
          <h4>FABRIC-FIRST CARE</h4>
          <p>
            Each garment is treated according to its fibre and finish.
          </p>
        </div>

        <div className="promise-card">
          <h4>QUALITY CONTROL</h4>
          <p>
            Every order is checked before it leaves our facility.
          </p>
        </div>

        <div className="promise-card">
          <h4>DOORSTEP CONVENIENCE</h4>
          <p>
            Pickup and delivery on a schedule that suits you.
          </p>
        </div>

        <div className="promise-card">
          <h4>TRANSPARENT SERVICE</h4>
          <p>
            Clear pricing and honest updates at every stage.
          </p>
        </div>
      </div>
    </div>

  </div>
</section>

    </main>
  );
}

export default Services;