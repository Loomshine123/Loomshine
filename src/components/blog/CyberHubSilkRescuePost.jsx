import React, { useState } from 'react';
import Container from '../common/Container';
import Button from '../common/Button';
import '../../pages/BlogPostPage.css';

export const CyberHubSilkRescuePost = ({ post }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [selectedIncident, setSelectedIncident] = useState('mocktail');
  const [selectedFabric, setSelectedFabric] = useState('raw-silk');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPromo, setCopiedPromo] = useState(false);

  // Dynamic Triage Advisor based on user festive garment incident
  const getTriageAdvice = () => {
    if (selectedIncident === 'mocktail') {
      if (selectedFabric === 'raw-silk') {
        return {
          status: '100% Extractable (High Urgency)',
          immediateStep: 'Blot immediately with a dry white tissue. NEVER rub or use dining wet-wipes. Keep away from sunlight and hair dryers.',
          loomshineSolution: 'Pure zero-water hydrocarbon bio-solvent rinse lifts marigold fructose sugars and saffron oils without dissolving natural sericin proteins or causing dye bleeding.'
        };
      }
      if (selectedFabric === 'chanderi-zari') {
        return {
          status: 'Restorable (Delicate Metallic Care)',
          immediateStep: 'Gently dab the fabric flat. Do NOT fold over zari embroidery while damp, as sugars can oxidize metallic threads.',
          loomshineSolution: 'Targeted pH-balanced ultrasonic bio-spotting followed by cold-solvent immersion protects metallic threads and prevents tarnishing.'
        };
      }
      return {
        status: 'Fully Extractable',
        immediateStep: 'Absorb surface liquid gently. Avoid applying talcum powder, salt, or soda water.',
        loomshineSolution: 'Bio-enzymatic sugar digest + gentle hydrocarbon extraction locks in natural silk sheen without halo ring marks.'
      };
    } else if (selectedIncident === 'sweat') {
      return {
        status: 'Neutralizable (Act within 24–48 hrs)',
        immediateStep: 'Air dry in a shaded, well-ventilated room. Do NOT store damp in a closed plastic bag or laundry hamper.',
        loomshineSolution: 'Anti-bacterial bio-neutralization dissolves accumulated acidic sweat salts and urea crystals, eliminating underarm ring marks and odor.'
      };
    } else {
      return {
        status: 'Dual Recovery Required (High Success)',
        immediateStep: 'Blot outer liquid with dry tissue. Do NOT apply home detergent or water, which locks in acid salts and spreads dyes.',
        loomshineSolution: 'Two-stage laboratory bio-extraction: Sugar/tannin lift followed by salt neutralization and zero-contact German steam relaxing.'
      };
    }
  };

  const advice = getTriageAdvice();

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = encodeURIComponent(`${post.title} — Loomshine Luxury Garment Care Gurugram`);
    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${text}%20${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard?.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };

  const handleCopyPromo = () => {
    navigator.clipboard?.writeText(post.promoCode || 'FESTIVEFRESH').then(() => {
      setCopiedPromo(true);
      setTimeout(() => setCopiedPromo(false), 3000);
    });
  };

  const emergencyWhatsAppUrl = `https://wa.me/919205366606?text=${encodeURIComponent(
    'Hi Loomshine Gurugram, I have an urgent mocktail/sweat stain on my festive silk outfit from Dandiya night. Please arrange 30-minute express doorstep valet pickup.'
  )}`;

  return (
    <article className="loom-blog-page" itemScope itemType="https://schema.org/BlogPosting">
      {/* Dynamic Microdata Meta Elements for Search Engines */}
      <meta itemProp="headline" content={post.title} />
      <meta itemProp="datePublished" content={post.publishedDate} />
      <meta itemProp="dateModified" content={post.modifiedDate} />
      <meta itemProp="image" content={post.images.hero.src} />
      <meta itemProp="inLanguage" content="en-IN" />
      <div itemProp="publisher" itemScope itemType="https://schema.org/Organization" style={{ display: 'none' }}>
        <meta itemProp="name" content="Loomshine Dry Cleaning & Laundry" />
        <meta itemProp="url" content="https://loomshinedrycleaners.com/" />
        <link itemProp="logo" href="https://loomshinedrycleaners.com/logoloom.png" />
      </div>

      {/* Hero Header */}
      <header className="loom-blog-hero">
        <Container>
          {/* Breadcrumb Navigation */}
          <nav className="loom-blog-breadcrumb" aria-label="Breadcrumb">
            <ol itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a href="#home" itemProp="item"><span itemProp="name">Home</span></a>
                <meta itemProp="position" content="1" />
              </li>
              <li className="breadcrumb-separator">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a href="#/blog" itemProp="item"><span itemProp="name">Garment Care Guides</span></a>
                <meta itemProp="position" content="2" />
              </li>
              <li className="breadcrumb-separator">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" aria-current="page">
                <span itemProp="name">Cyber Hub Silk Stain Emergency</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          <div className="loom-blog-hero__badge">
            <span className="badge-tag">NAVRATRI FESTIVE CARE ADVISORY</span>
            <span className="badge-geo">DLF CYBER HUB &amp; GOLF COURSE ROAD</span>
          </div>

          <h1 className="loom-blog-hero__title" itemProp="name">
            Dandiya Night in Cyber Hub Got Messy?{' '}
            <span className="title-accent">How to Fix a Saffron Silk Outfit After a Sweat &amp; Mocktail Disaster</span>
          </h1>

          <p className="loom-blog-hero__subtitle" itemProp="description">
            You finished a high-stakes presentation at One Horizon Center at 6:30 PM, dashed straight to DLF Cyber Hub for dandiya, and mid-spin a marigold mocktail left a bright red-orange splash down your saffron silk kurta. Don&apos;t panic: Here is your exact Gurugram emergency rescue protocol.
          </p>

          <div className="loom-blog-hero__meta" itemProp="author" itemScope itemType="https://schema.org/Person">
            <div className="meta-author-avatar">
              <span>LS</span>
            </div>
            <div className="meta-author-info">
              <span className="meta-author-name" itemProp="name">Loomshine Textile Care Specialists</span>
              <span className="meta-author-sub">Central Arcade Market, MG Road, Gurugram</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-pill">
              <span className="meta-icon">⏱</span>
              <span>4 min read</span>
            </div>
            <div className="meta-pill">
              <span className="meta-icon">📍</span>
              <span>30-Min Gurugram Valet</span>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Blog Body Container */}
      <div className="loom-blog-body-wrapper">
        <Container>
          <div className="loom-blog-layout">
            {/* Left Content Column */}
            <main className="loom-blog-content" itemProp="articleBody">

              {/* Figure 1: Hero Featured Image */}
              <figure className="loom-blog-figure">
                <div className="figure-image-wrapper">
                  <img
                    src={post.images.hero.src}
                    alt={post.images.hero.alt}
                    loading="eager"
                    className="loom-blog-img"
                    width="700"
                    height="875"
                  />
                </div>
                <figcaption className="figure-caption">
                  <span className="caption-tag">FIG 1.0</span> {post.images.hero.caption}
                </figcaption>
              </figure>

              {/* AEO / AI Executive Answer Box */}
              <section className="loom-aeo-summary-box" aria-label="AI Search Quick Answer">
                <div className="aeo-summary-header">
                  <span className="aeo-icon">💡</span>
                  <span className="aeo-title">QUICK ANSWER FOR AI &amp; EMERGENCY SEARCH</span>
                </div>
                <p className="aeo-answer-text">
                  <strong>Can you save a sweat- and mocktail-stained saffron silk outfit? YES.</strong> In over 95% of cases, natural silk can be fully restored without ring marks or dye bleeding—provided you <strong>NEVER rub with water or wet napkins</strong>, avoid heat from irons, and treat it with zero-water hydrocarbon bio-solvents within 24 to 48 hours.
                </p>
                <div className="aeo-badges">
                  <span className="aeo-tag">✔ 95%+ Restoration Success</span>
                  <span className="aeo-tag">✔ 100% PERC-Free Hydrocarbon</span>
                  <span className="aeo-tag">✔ 30-Min Doorstep Valet Gurugram</span>
                </div>
              </section>

              {/* The Narrative: Presentation at 6:30. Garba by Night. */}
              <section className="loom-blog-section">
                <div className="section-title-wrap">
                  <span className="section-eyebrow">THE INCIDENT</span>
                  <h2 className="section-title">Presentation at 6:30. Garba by Night.</h2>
                </div>
                <p className="lead-paragraph">
                  You finished a high-stakes corporate presentation at One Horizon Center along Golf Course Road at 6:30 PM, switched your laptop bag for wooden dandiya sticks, and dashed straight to DLF Cyber Hub for the electric opening night of Navratri.
                </p>
                <p>
                  The energy was magnetic, the Falguni Pathak tracks were blasting through the open amphitheater, and your vibrant saffron-orange silk kurta was commanding genuine attention. Then, mid-spin, disaster struck: an accidental collision with a waiter carrying a sticky, marigold-infused mocktail left a bright red-orange splatter right down the front placket, instantly mixing with hours of humid Gurugram perspiration.
                </p>

                {/* Figure 2: The Incident Graphic */}
                <figure className="loom-blog-figure">
                  <div className="figure-image-wrapper">
                    <img
                      src={post.images.incident.src}
                      alt={post.images.incident.alt}
                      loading="lazy"
                      className="loom-blog-img"
                      width="700"
                      height="875"
                    />
                  </div>
                  <figcaption className="figure-caption">
                    <span className="caption-tag">FIG 2.0</span> {post.images.incident.caption}
                  </figcaption>
                </figure>

                <p>
                  Whether you are living alone in a high-rise condominium along Golf Course Road, managing a luxury co-living PG near Sector 56, or juggling tight corporate shift deadlines in Cyber City, the sinking panic hits fast: <em>How do I save this festive investment before tomorrow morning&apos;s meetings or the next garba night?</em>
                </p>
              </section>

              {/* Section: The Fatal First-Aid Trap */}
              <section className="loom-blog-section" id="the-fatal-trap">
                <div className="section-title-wrap">
                  <span className="section-eyebrow">CRITICAL WARNING</span>
                  <h2 className="section-title">The Trap: Why Home Wipes &amp; Local Dhobis Destroy Silk</h2>
                </div>
                <p>
                  When a sticky spill hits fine silk, human instinct immediately urges you to grab a wet dining napkin, scrub vigorously at the table, or toss the garment into a bucket wash with regular household detergent when you get home.
                </p>
                <div className="warning-callout-box">
                  <span className="warning-callout-icon">⚠️</span>
                  <div>
                    <strong>STOP. Do NOT rub the stain or use tap water.</strong> Here is the exact science behind why standard DIY remedies permanently destroy luxury festive textiles:
                  </div>
                </div>

                {/* Figure 3: Don't Rub Graphic */}
                <figure className="loom-blog-figure">
                  <div className="figure-image-wrapper">
                    <img
                      src={post.images.dontRub.src}
                      alt={post.images.dontRub.alt}
                      loading="lazy"
                      className="loom-blog-img"
                      width="700"
                      height="875"
                    />
                  </div>
                  <figcaption className="figure-caption">
                    <span className="caption-tag">FIG 3.0</span> {post.images.dontRub.caption}
                  </figcaption>
                </figure>

                <div className="checklist-cards-grid">
                  <div className="checklist-card">
                    <div className="checklist-card__header">
                      <span className="checklist-card__num">01</span>
                      <h3 className="checklist-card__title">Water &amp; Friction Fibrillation</h3>
                    </div>
                    <p className="checklist-card__desc">
                      Raw silk and Chanderi fibers swell up immediately when soaked with water. Vigorous rubbing mechanically snaps the microscopic sericin filament sheaths, causing permanent surface abrasions (fibrillation) that appear as chalky white rings. Furthermore, excessive moisture causes deep saffron and turmeric vegetable dyes to bleed uncontrollably.
                    </p>
                    <div className="checklist-verdict verdict-red">
                      <strong>The Hazard:</strong> Permanent dye displacement &amp; fuzzy white chafing marks that no dye bath can repair.
                    </div>
                  </div>

                  <div className="checklist-card">
                    <div className="checklist-card__header">
                      <span className="checklist-card__num">02</span>
                      <h3 className="checklist-card__title">The Toxic PERC Problem</h3>
                    </div>
                    <p className="checklist-card__desc">
                      Handing your garment to a cheap neighborhood dry cleaner down the street is equally hazardous. Over 80% of conventional local laundries use <strong>Perchloroethylene (PERC)</strong>—a harsh, chlorinated industrial solvent. PERC strips the natural protein oils from silk, melts the structural adhesives behind metallic zari and sequin embroidery, and turns vibrant saffron fabrics chalky and yellow.
                    </p>
                    <div className="checklist-verdict verdict-red">
                      <strong>The Hazard:</strong> Chemical burns on metallic threads, loss of fabric luster, and lingering toxic fumes.
                    </div>
                  </div>
                </div>

                {/* Figure 4: Care Label Inspection */}
                <figure className="loom-blog-figure">
                  <div className="figure-image-wrapper">
                    <img
                      src={post.images.careLabel.src}
                      alt={post.images.careLabel.alt}
                      loading="lazy"
                      className="loom-blog-img"
                      width="700"
                      height="875"
                    />
                  </div>
                  <figcaption className="figure-caption">
                    <span className="caption-tag">FIG 4.0</span> {post.images.careLabel.caption}
                  </figcaption>
                </figure>
              </section>

              {/* Section: Loomshine Catalyst for Recovery */}
              <section className="loom-blog-section" id="recovery-catalyst">
                <div className="section-title-wrap">
                  <span className="section-eyebrow">THE LOOMSHINE PROTOCOL</span>
                  <h2 className="section-title">Loomshine: Your Garment&apos;s Catalyst for Recovery</h2>
                </div>
                <p>
                  At Loomshine, we treat your festive wardrobe like <strong>investment art</strong>, never routine laundry. Located right in the heart of MG Road at <strong>Central Arcade Market</strong>, our studio was engineered specifically for discerning Gurugram professionals who cannot afford ruined clothing.
                </p>
                <p>
                  Here is our clinical 3-stage protocol to rescue stained saffron silk without compromising weave, metallic borders, or color luminosity:
                </p>

                {/* Figure 5: PERC-Free Care */}
                <figure className="loom-blog-figure">
                  <div className="figure-image-wrapper">
                    <img
                      src={post.images.percFree.src}
                      alt={post.images.percFree.alt}
                      loading="lazy"
                      className="loom-blog-img"
                      width="700"
                      height="875"
                    />
                  </div>
                  <figcaption className="figure-caption">
                    <span className="caption-tag">FIG 5.0</span> {post.images.percFree.caption}
                  </figcaption>
                </figure>

                <div className="solution-steps-list">
                  <div className="solution-step-card">
                    <div className="step-num-badge">STEP 1</div>
                    <div className="step-content">
                      <h3 className="step-title">100% PERC-Free Hydrocarbon Bio-Cleaning</h3>
                      <p className="step-text">
                        We completely ban harsh industrial chlorinated chemicals. Instead, our dermatologically safe, eco-friendly hydrocarbon bio-solvents gently lift sticky organic mocktail sugars, natural botanical food colors, and deep sweat salts while sealing in the fabric&apos;s original luminous sheen.
                      </p>
                    </div>
                  </div>

                  <div className="solution-step-card">
                    <div className="step-num-badge">STEP 2</div>
                    <div className="step-content">
                      <h3 className="step-title">Targeted Ultrasonic Spot Extraction</h3>
                      <p className="step-text">
                        Our master textile fabricators inspect every stain point under calibrated daylight lamps. Using localized pH-balanced botanical spotting agents and microscopic suction tables, we isolate and dissolve acidic pigments without wetting adjacent silk threads—guaranteeing zero color ring marks.
                      </p>
                    </div>
                  </div>

                  <div className="solution-step-card">
                    <div className="step-num-badge">STEP 3</div>
                    <div className="step-content">
                      <h3 className="step-title">Zero-Contact German Steam Finishing</h3>
                      <p className="step-text">
                        No heavy domestic irons scorching your delicate festive embroidery or flattening hand-pleated silhouettes. Our German vacuum steam finishing technology relaxes individual silk fibers from within, bestowing your outfit with that crisp, off-the-rack boutique drape.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Figure 6: Spot Care & German Steam Finishing */}
                <figure className="loom-blog-figure">
                  <div className="figure-image-wrapper">
                    <img
                      src={post.images.spotCareFinishing.src}
                      alt={post.images.spotCareFinishing.alt}
                      loading="lazy"
                      className="loom-blog-img"
                      width="700"
                      height="875"
                    />
                  </div>
                  <figcaption className="figure-caption">
                    <span className="caption-tag">FIG 6.0</span> {post.images.spotCareFinishing.caption}
                  </figcaption>
                </figure>
              </section>

              {/* Interactive Silk Triage Advisor */}
              <section className="loom-blog-section loom-interactive-triage">
                <div className="section-title-wrap">
                  <span className="section-eyebrow">DIAGNOSTIC ADVISOR</span>
                  <h2 className="section-title">Emergency Festive Silk Triage</h2>
                  <p className="section-subtext">Select your garment condition to review the immediate laboratory recovery advice:</p>
                </div>

                <div className="triage-controls">
                  <div className="triage-group">
                    <label className="triage-label">1. What happened to your festive outfit?</label>
                    <div className="triage-buttons">
                      <button
                        type="button"
                        className={`triage-btn ${selectedIncident === 'mocktail' ? 'active' : ''}`}
                        onClick={() => setSelectedIncident('mocktail')}
                      >
                        Sticky Mocktail / Fruit Drink Splash
                      </button>
                      <button
                        type="button"
                        className={`triage-btn ${selectedIncident === 'sweat' ? 'active' : ''}`}
                        onClick={() => setSelectedIncident('sweat')}
                      >
                        Heavy Perspiration / Salt Rings
                      </button>
                      <button
                        type="button"
                        className={`triage-btn ${selectedIncident === 'mixed' ? 'active' : ''}`}
                        onClick={() => setSelectedIncident('mixed')}
                      >
                        Mocktail + Sweat Mixed Splatter
                      </button>
                    </div>
                  </div>

                  <div className="triage-group">
                    <label className="triage-label">2. What is your garment&apos;s fabric weave?</label>
                    <div className="triage-buttons">
                      <button
                        type="button"
                        className={`triage-btn ${selectedFabric === 'raw-silk' ? 'active' : ''}`}
                        onClick={() => setSelectedFabric('raw-silk')}
                      >
                        Pure Raw / Tussar Saffron Silk
                      </button>
                      <button
                        type="button"
                        className={`triage-btn ${selectedFabric === 'chanderi-zari' ? 'active' : ''}`}
                        onClick={() => setSelectedFabric('chanderi-zari')}
                      >
                        Chanderi / Banarasi Zari Silk
                      </button>
                      <button
                        type="button"
                        className={`triage-btn ${selectedFabric === 'designer-blend' ? 'active' : ''}`}
                        onClick={() => setSelectedFabric('designer-blend')}
                      >
                        Mulberry / Art Silk Blend
                      </button>
                    </div>
                  </div>
                </div>

                <div className="triage-result-card">
                  <div className="triage-result-header">
                    <span className="triage-status-pill">{advice.status}</span>
                  </div>
                  <div className="triage-result-step">
                    <strong>Immediate First-Aid Step:</strong> {advice.immediateStep}
                  </div>
                  <div className="triage-result-loom">
                    <strong>Loomshine Studio Protocol:</strong> {advice.loomshineSolution}
                  </div>
                  <div className="triage-result-action">
                    <a
                      href={emergencyWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="triage-whatsapp-btn"
                    >
                      <span>💬 Request 30-Min Doorstep Valet via WhatsApp</span>
                    </a>
                  </div>
                </div>
              </section>

              {/* Section: Doorstep Valet Pickup Across Gurugram */}
              <section className="loom-blog-section" id="doorstep-valet">
                <div className="section-title-wrap">
                  <span className="section-eyebrow">FAST-TRACK LOGISTICS</span>
                  <h2 className="section-title">Skip the Traffic: 30-Minute Valet Pickup Across Gurugram</h2>
                </div>
                <p>
                  You don&apos;t need to burn your precious lunch break or spend an hour navigating notorious MG Road traffic jams just to drop off stained festival wear.
                </p>
                <p>
                  Whether you are working late at <strong>Cyber City</strong>, residing in <strong>DLF Phase 1–5</strong>, or resting inside a high-rise condominium along <strong>Golf Course Road</strong> or <strong>Golf Course Extension</strong>, simply drop your GPS location pin. Our professional garment valet will arrive at your office reception desk or residential apartment gate in <strong>30 minutes flat</strong>.
                </p>

                {/* Figure 7: Express Valet Route */}
                <figure className="loom-blog-figure">
                  <div className="figure-image-wrapper">
                    <img
                      src={post.images.expressValet.src}
                      alt={post.images.expressValet.alt}
                      loading="lazy"
                      className="loom-blog-img"
                      width="700"
                      height="875"
                    />
                  </div>
                  <figcaption className="figure-caption">
                    <span className="caption-tag">FIG 7.0</span> {post.images.expressValet.caption}
                  </figcaption>
                </figure>

                <div className="coverage-pills-wrap">
                  <span className="coverage-pill">📍 DLF Cyber Hub &amp; Cyber City</span>
                  <span className="coverage-pill">📍 One Horizon Center &amp; Golf Course Rd</span>
                  <span className="coverage-pill">📍 Central Arcade Market, MG Road</span>
                  <span className="coverage-pill">📍 DLF Phase 1, 2, 3, 4 &amp; 5</span>
                  <span className="coverage-pill">📍 Sector 54, 56 &amp; Golf Course Ext</span>
                  <span className="coverage-pill">📍 Sohna Road &amp; Nirvana Country</span>
                </div>
              </section>

              {/* Festive Promo Offer Section */}
              <section className="loom-blog-section" id="festive-promo">
                <div className="section-title-wrap">
                  <span className="section-eyebrow">EXCLUSIVE PROMOTION</span>
                  <h2 className="section-title">Festive Order Boost: Free German Steam Press</h2>
                </div>
                <p>
                  To make your Navratri and Diwali celebrations effortless, Loomshine is offering an exclusive festive garment care boost:
                </p>

                {/* Figure 8: Festive Promo Banner */}
                <figure className="loom-blog-figure">
                  <div className="figure-image-wrapper">
                    <img
                      src={post.images.festiveOffer.src}
                      alt={post.images.festiveOffer.alt}
                      loading="lazy"
                      className="loom-blog-img"
                      width="700"
                      height="875"
                    />
                  </div>
                  <figcaption className="figure-caption">
                    <span className="caption-tag">FIG 8.0</span> {post.images.festiveOffer.caption}
                  </figcaption>
                </figure>

                <div className="festive-promo-box">
                  <div className="promo-badge-tag">LIMITED NAVRATRI OFFER</div>
                  <h3 className="promo-box-title">Get a Complimentary German Steam Press</h3>
                  <p className="promo-box-desc">
                    Book your first order over <strong>₹499</strong> and receive a complimentary calibrated German Steam Press on your highest-value festive kurta, sherwani, or lehenga.
                  </p>

                  <div className="promo-code-container">
                    <span className="promo-code-label">Use Coupon Code:</span>
                    <div className="promo-code-badge">
                      <span className="promo-code-text">{post.promoCode || 'FESTIVEFRESH'}</span>
                      <button
                        type="button"
                        onClick={handleCopyPromo}
                        className="promo-copy-btn"
                        aria-label="Copy promo code"
                      >
                        {copiedPromo ? 'Copied! 🎉' : 'Copy Code'}
                      </button>
                    </div>
                  </div>

                  <div className="promo-cta-actions">
                    <Button
                      href="#book-pickup"
                      variant="primary"
                      size="lg"
                      className="promo-book-btn"
                    >
                      Book 30-Min Doorstep Valet Now →
                    </Button>
                    <a
                      href={emergencyWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="promo-whatsapp-btn"
                    >
                      💬 WhatsApp Us: +91 9205366606
                    </a>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="loom-blog-section loom-faq-section" id="faq">
                <div className="section-title-wrap">
                  <span className="section-eyebrow">EXPERT QUESTIONS</span>
                  <h2 className="section-title">Frequently Asked Questions</h2>
                  <p className="section-subtext">Direct answers from our textile restoration specialists:</p>
                </div>

                <div className="loom-faq-list">
                  {post.faqs.map((faq, index) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div
                        key={index}
                        className={`loom-faq-item ${isOpen ? 'open' : ''}`}
                      >
                        <button
                          type="button"
                          className="faq-question-btn"
                          onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                          aria-expanded={isOpen}
                        >
                          <span className="faq-q-text">{faq.question}</span>
                          <span className="faq-q-icon">{isOpen ? '−' : '+'}</span>
                        </button>
                        {isOpen && (
                          <div className="faq-answer-body">
                            <p>{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

            </main>

            {/* Right Sticky Sidebar */}
            <aside className="loom-blog-sidebar" aria-label="Sidebar Actions">
              {/* Emergency Pickup Card */}
              <div className="sidebar-card emergency-pickup-card">
                <div className="card-badge">30-MIN VALET DISPATCH</div>
                <h3 className="card-title">Stains Don&apos;t Wait.<br />Neither Do We.</h3>
                <p className="card-desc">
                  Mocktail sugars and perspiration salts oxidize rapidly. Dispatch our express Gurugram valet directly to your home or office.
                </p>
                <Button
                  href="#book-pickup"
                  variant="primary"
                  size="md"
                  className="sidebar-cta-btn"
                >
                  Schedule Express Pickup
                </Button>
                <a
                  href={emergencyWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sidebar-whatsapp-link"
                >
                  <span>💬 WhatsApp +91 9205366606</span>
                </a>
              </div>

              {/* Promo Code Card */}
              <div className="sidebar-card promo-sidebar-card">
                <span className="promo-tag">PROMO CODE</span>
                <div className="promo-val">{post.promoCode || 'FESTIVEFRESH'}</div>
                <p className="promo-text">
                  Complimentary German steam press on orders over ₹499.
                </p>
                <button
                  type="button"
                  onClick={handleCopyPromo}
                  className="sidebar-copy-btn"
                >
                  {copiedPromo ? 'Code Copied! ✓' : 'Click to Copy Code'}
                </button>
              </div>

              {/* Direct Studio Contact Card */}
              <div className="sidebar-card contact-card">
                <h3 className="card-title">Loomshine Studio</h3>
                <p className="contact-address">
                  <strong>Flagship Studio:</strong><br />
                  Shop No. 262, First Floor,<br />
                  Central Arcade Market, MG Road,<br />
                  Gurugram, Haryana 122002
                </p>
                <div className="contact-numbers">
                  <div>📞 <a href="tel:+919205366606">+91 9205366606</a></div>
                  <div>📞 <a href="tel:+918877286066">+91 88772 86066</a></div>
                  <div>🌐 <a href="https://www.loomshinedrycleaners.com" target="_blank" rel="noopener noreferrer">loomshinedrycleaners.com</a></div>
                </div>
              </div>

              {/* Share Card */}
              <div className="sidebar-card share-card">
                <h4 className="share-title">Share Garment First-Aid</h4>
                <div className="share-buttons-row">
                  <button
                    type="button"
                    onClick={() => handleShare('whatsapp')}
                    className="share-icon-btn whatsapp-share"
                    aria-label="Share on WhatsApp"
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShare('twitter')}
                    className="share-icon-btn twitter-share"
                    aria-label="Share on X"
                  >
                    Twitter / X
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShare('copy')}
                    className="share-icon-btn copy-share"
                    aria-label="Copy Article Link"
                  >
                    {copiedLink ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </article>
  );
};

export default CyberHubSilkRescuePost;
