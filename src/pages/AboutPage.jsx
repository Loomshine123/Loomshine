import { useEffect } from "react";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import shirtsImage from "../assets/services-shirts.png";
import laundryServiceImage from "../assets/laundry-service-clean.jpg";
import "../styles/AboutPage.css";

const CORE_PILLARS = [
  {
    id: "01",
    tag: "VIP TREATMENT & PRECISION",
    title: "Expert Garment Care",
    desc: "Our specialists don't just wash; they revive. We understand exact fabric needs, ensuring your expensive office wear and delicate couture are handled with 100% precision and care.",
    icon: "✦",
    highlights: [
      "Fabric-specific temperature & cycle care",
      "Delicate silks, woollens & couture preservation",
      "Immaculate finishing with zero scorch marks",
    ],
  },
  {
    id: "02",
    tag: "ECO-FRIENDLY & HYGIENIC",
    title: "Advanced Cleaning Process",
    desc: "Say goodbye to tough stains. We use eco-friendly, premium detergents and modern machines to deliver hygienically clean, odor-free, and perfectly pressed clothes every single time.",
    icon: "◈",
    highlights: [
      "Bio-enzyme deep stain pre-treatment",
      "Modern German & Italian cleaning technology",
      "Anti-bacterial hygiene rinse with natural fresh scent",
    ],
  },
  {
    id: "03",
    tag: "SPEED & RELIABILITY",
    title: "Convenient Doorstep Service",
    desc: "Why step out? Schedule a pickup in 30 seconds. Our valet reaches your Gurugram address in exactly 30 minutes, and we deliver your fresh clothes back the very same day.",
    icon: "◇",
    highlights: [
      "Instant 30-second digital scheduling",
      "Express 30-minute valet doorstep arrival",
      "Guaranteed same-day return in pristine condition",
    ],
  },
];

const STATS = [
  {
    value: "30 MINS",
    label: "Doorstep Valet Arrival",
    sub: "Direct to your Gurugram gate",
    icon: "⏱",
  },
  {
    value: "SAME DAY",
    label: "Express Turnaround",
    sub: "Fresh clothes returned fast",
    icon: "⚡",
  },
  {
    value: "100%",
    label: "Fabric Precision",
    sub: "Office wear to fine couture",
    icon: "✦",
  },
  {
    value: "BIO-SAFE",
    label: "Eco-Friendly Chemistry",
    sub: "Odor-free, gentle on skin",
    icon: "🌿",
  },
];

export default function AboutPage() {
  useEffect(() => {
    document.title = "About Us | LOOMSHINE Luxury Garment Care Gurugram";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="about-page">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="about-hero">
        <Container>
          <div className="about-hero__grid">
            <div className="about-hero__text">
              <span className="about-hero__eyebrow">
                <span>✦</span> ABOUT LOOMSHINE • GURUGRAM
              </span>

              <h1 className="about-hero__title">
                PROFESSIONAL LAUNDRY CARE, <br />
                <span className="about-hero__title-accent">DELIVERED TO YOUR DOOR.</span>
              </h1>

              <p className="about-hero__subtitle">
                Experience the Best Laundry Service in Gurgaon. Delivered to Your Door.
              </p>

              <p className="about-hero__desc">
                At <strong>LOOMSHINE</strong>, we turn your laundry day into free time. As
                Gurugram’s most trusted experts, we simplify your routine with our premium dry
                cleaning and quick wash laundry service. From our 30-minute instant pickup to
                same-day delivery, your garments get the VIP treatment they deserve.
              </p>

              <div className="about-hero__cta-group">
                <Button href="#/contact" variant="primary" size="lg">
                  Book 30-Min Pickup +
                </Button>
                <Button href="#/pricing" variant="dark-outline" size="lg">
                  Explore Price Lists →
                </Button>
              </div>
            </div>

            <div className="about-hero__media">
              <div className="about-hero__image-frame">
                <img
                  src={shirtsImage}
                  alt="Professional laundry care and crisp pressing in Gurgaon"
                  className="about-hero__img"
                />
                <div className="about-hero__badge">
                  <span className="about-hero__badge-label">GURUGRAM VALET SERVICE</span>
                  <span className="about-hero__badge-val">⚡ 30-MIN DOORSTEP ARRIVAL</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. STATS & KEY METRICS STRIP */}
      {/* ========================================================================= */}
      <section className="about-stats-strip">
        <Container>
          <div className="about-stats-grid">
            {STATS.map((stat) => (
              <div className="about-stat-card" key={stat.label}>
                <div className="about-stat-icon">{stat.icon}</div>
                <div className="about-stat-content">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. BRAND PHILOSOPHY & STORY */}
      {/* ========================================================================= */}
      <section className="about-story-section">
        <Container>
          <div className="about-story-grid">
            <div className="about-story-media">
              <div className="about-story-img-wrap">
                <img
                  src={laundryServiceImage}
                  alt="Pristine garment inspection and doorstep delivery"
                  className="about-story-img"
                />
              </div>
              <div className="about-story-tagline-card">
                <span>OUR PROMISE</span>
                <p>"We don't just clean clothes. We care for them."</p>
              </div>
            </div>

            <div className="about-story-content">
              <span className="about-section-eyebrow">EFFORTLESS CONVENIENCE</span>
              <h2 className="about-section-title">
                WE TURN YOUR LAUNDRY DAY INTO FREE TIME.
              </h2>

              <p className="about-story-lead">
                Living in Gurgaon moves fast. Laundry shouldn't slow you down.
              </p>

              <p className="about-story-body">
                At LOOMSHINE, we built an uncompromising garment care service crafted specifically
                for Gurugram’s discerning professionals, families, and residents. By combining
                cutting-edge cleaning technology with rapid 30-minute doorstep collection, we ensure
                your wardrobe stays impeccably fresh, odor-free, and crisply pressed without taking a
                single minute out of your schedule.
              </p>

              <ul className="about-story-checklist">
                <li>
                  <span className="about-check-icon">✓</span>
                  <span>Schedule in under 30 seconds from your phone or desktop</span>
                </li>
                <li>
                  <span className="about-check-icon">✓</span>
                  <span>Specialist inspection for expensive office wear and designer fabrics</span>
                </li>
                <li>
                  <span className="about-check-icon">✓</span>
                  <span>Guaranteed same-day return on luxury hangers or neat wardrobe folds</span>
                </li>
              </ul>

              <Button href="#/services" variant="dark" size="md">
                View All Services →
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 4. VISION & MISSION SECTION */}
      {/* ========================================================================= */}
      <section className="about-vm-section" id="vision-mission">
        <Container>
          <div className="about-vm-header">
            <span className="about-section-eyebrow">GUIDING PRINCIPLES</span>
            <h2 className="about-section-title">OUR VISION & MISSION</h2>
            <p className="about-vm-header-desc">
              Rooted in fabric mastery, powered by modern technology, and committed to sustainable luxury garment care.
            </p>
          </div>

          <div className="about-vm-grid">
            {/* VISION CARD */}
            <div className="about-vm-card about-vm-card--vision">
              <div className="about-vm-card__top">
                <span className="about-vm-card__badge">OUR VISION</span>
                <span className="about-vm-card__icon">✦</span>
              </div>
              <h3 className="about-vm-card__title">
                Redefining Fabric Longevity & Effortless Everyday Living
              </h3>
              <p className="about-vm-card__text">
                "To become India's most trusted gold standard in luxury garment care—where centuries of fabric stewardship meet intelligent doorstep convenience and eco-safe cleaning chemistry."
              </p>
              <div className="about-vm-card__divider" />
              <ul className="about-vm-card__points">
                <li>
                  <span className="vm-point-bullet">◈</span>
                  <div>
                    <strong>Sustainable Stewardship:</strong> Zero harsh bio-solvents, maximum fiber longevity, and eco-conscious water-saving cleaning cycles.
                  </div>
                </li>
                <li>
                  <span className="vm-point-bullet">◈</span>
                  <div>
                    <strong>Effortless Luxury:</strong> Giving people their time back through rapid 30-minute doorstep valet arrivals and guaranteed same-day delivery.
                  </div>
                </li>
                <li>
                  <span className="vm-point-bullet">◈</span>
                  <div>
                    <strong>Setting Industry Standards:</strong> Transforming laundry and dry cleaning into an uncompromised luxury craft with 100% upfront pricing honesty.
                  </div>
                </li>
              </ul>
            </div>

            {/* MISSION CARD */}
            <div className="about-vm-card about-vm-card--mission">
              <div className="about-vm-card__top">
                <span className="about-vm-card__badge">OUR MISSION</span>
                <span className="about-vm-card__icon">◈</span>
              </div>
              <h3 className="about-vm-card__title">
                Delivering Master-Class Care with Uncompromising Punctuality
              </h3>
              <p className="about-vm-card__text">
                "To liberate our clients from laundry chores by providing master-class cleaning, meticulous hand-finishing, and lightning-fast turnaround—treating every thread with bespoke precision."
              </p>
              <div className="about-vm-card__divider" />
              <ul className="about-vm-card__points">
                <li>
                  <span className="vm-point-bullet">✦</span>
                  <div>
                    <strong>Bespoke Garment Care:</strong> Individual fabric inspection, customized stain pre-treatment, and calibrated steam pressing with zero scorch marks.
                  </div>
                </li>
                <li>
                  <span className="vm-point-bullet">✦</span>
                  <div>
                    <strong>Absolute Transparency:</strong> Clear, upfront rate lists with no hidden surcharges and real-time digital status tracking from pickup to doorstep.
                  </div>
                </li>
                <li>
                  <span className="vm-point-bullet">✦</span>
                  <div>
                    <strong>Reliability You Can Count On:</strong> Punctual valet service you can set your clock by, ensuring your office wear and couture are always ready to wear.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 5. THREE CORE PILLARS (EXPERT CARE, ADVANCED PROCESS, DOORSTEP SERVICE) */}
      {/* ========================================================================= */}
      <section className="about-pillars-section">
        <Container>
          <div className="about-pillars-header">
            <span className="about-section-eyebrow">WHY CHOOSE LOOMSHINE</span>
            <h2 className="about-section-title">
              THE THREE PILLARS OF OUR CRAFT
            </h2>
            <p>
              Designed from the ground up to give every garment the VIP treatment it deserves,
              powered by transparency, eco-conscious chemistry, and unmatched punctuality.
            </p>
          </div>

          <div className="about-pillars-grid">
            {CORE_PILLARS.map((pillar) => (
              <article className="about-pillar-card" key={pillar.id}>
                <div className="about-pillar-card__top">
                  <div className="about-pillar-card__icon">{pillar.icon}</div>
                  <span className="about-pillar-card__index">{pillar.id}</span>
                </div>

                <span className="about-pillar-card__tag">{pillar.tag}</span>
                <h3 className="about-pillar-card__title">{pillar.title}</h3>
                <p className="about-pillar-card__desc">{pillar.desc}</p>

                <ul className="about-pillar-card__features">
                  {pillar.highlights.map((item) => (
                    <li key={item}>
                      <span>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 5. 30-MINUTE GURGAON SERVICE TIMELINE BANNER */}
      {/* ========================================================================= */}
      <section className="about-gurgaon-banner">
        <Container>
          <div className="about-gurgaon-box">
            <div className="about-gurgaon-header">
              <span className="about-section-eyebrow">HOW WE WORK IN GURUGRAM</span>
              <h2>THE 30-MINUTE DOORSTEP PROMISE</h2>
              <p>
                From DLF Phase 1–5 and Golf Course Road to Sohna Road and New Gurugram sectors,
                seamless luxury care is just moments away.
              </p>
            </div>

            <div className="about-timeline-steps">
              <div className="about-timeline-step">
                <span className="about-step-number">01</span>
                <h4 className="about-step-title">30-Sec Booking</h4>
                <p className="about-step-desc">
                  Drop your address pin and select your service in seconds.
                </p>
              </div>

              <div className="about-timeline-step">
                <span className="about-step-number">02</span>
                <h4 className="about-step-title">30-Min Valet</h4>
                <p className="about-step-desc">
                  Our professional courier arrives at your doorstep in 30 minutes.
                </p>
              </div>

              <div className="about-timeline-step">
                <span className="about-step-number">03</span>
                <h4 className="about-step-title">Expert Revival</h4>
                <p className="about-step-desc">
                  Eco-friendly bio-cleaning, spot extraction, and precision press.
                </p>
              </div>

              <div className="about-timeline-step">
                <span className="about-step-number">04</span>
                <h4 className="about-step-title">Same-Day Delivery</h4>
                <p className="about-step-desc">
                  Fresh, odor-free clothes delivered back ready for your wardrobe.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 6. CALL TO ACTION SECTION */}
      {/* ========================================================================= */}
      <section className="about-cta-section">
        <Container>
          <div className="about-cta-container">
            <span className="about-section-eyebrow">EXPERIENCE LOOMSHINE TODAY</span>
            <h2 className="about-cta-title">
              GIVE YOUR CLOTHES THE VIP TREATMENT THEY DESERVE.
            </h2>
            <p className="about-cta-desc">
              Why spend your weekends on laundry? Schedule an instant pickup in 30 seconds and let
              Gurugram's garment experts handle the rest.
            </p>
            <div className="about-cta-buttons">
              <Button href="#/contact" variant="primary" size="lg">
                Book a Pickup Now +
              </Button>
              <Button href="#/pricing" variant="dark-outline" size="lg">
                View All Price Lists →
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
