import React, { useState, useEffect } from 'react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { BLOG_POSTS } from '../data/blogPosts';
import './BlogPostPage.css';

export const BlogPostPage = ({ slug = 'is-dry-clean-only-outfit-ruined-how-to-save-it' }) => {
  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [selectedIncident, setSelectedIncident] = useState('wash');
  const [selectedFabric, setSelectedFabric] = useState('silk');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Dynamic Triage Advisor based on user garment condition
  const getTriageAdvice = () => {
    if (selectedIncident === 'wash') {
      if (selectedFabric === 'wool') {
        return {
          status: 'Reversible (High Success Rate)',
          immediateStep: 'Gently lay flat on a dry towel. DO NOT wring, hang on a wire hanger, or tumble dry.',
          loomshineSolution: 'Loomshine botanical fiber relaxer soak + calibrated German steam tensioning restores shrank yarn to its original dimensions.'
        };
      }
      if (selectedFabric === 'silk') {
        return {
          status: 'Restorable (Act Quickly)',
          immediateStep: 'Keep away from direct sunlight and radiators. Blot gently between two dry cotton towels.',
          loomshineSolution: 'Organic hydrocarbon bio-rinse to re-align natural sericin proteins and eliminate water watermarks without fiber abrasion.'
        };
      }
      return {
        status: 'Structure Restorable',
        immediateStep: 'Do NOT attempt to iron dry while wet. Avoid high-heat domestic pressing.',
        loomshineSolution: 'Internal chest-canvas reconstruction using German calibrated vacuum steam tables to recover garment silhouette.'
      };
    } else {
      return {
        status: '100% Extractable (If No Heat Applied)',
        immediateStep: 'Blot immediately with dry white tissue. NEVER rub with a wet dining napkin or apply salt.',
        loomshineSolution: 'Targeted bio-solvent ultrasonic extraction dissolves tannins, sugars, and oils before they oxidize into thread fibers.'
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

  const emergencyWhatsAppUrl = `https://wa.me/919205366606?text=${encodeURIComponent(
    'Hi Loomshine Gurugram, I have an urgent garment care / stain emergency and need a 30-minute doorstep pickup.'
  )}`;

  return (
    <article className="loom-blog-page" itemScope itemType="https://schema.org/BlogPosting">
      {/* Dynamic Microdata Meta Elements for Search Engines */}
      <meta itemProp="headline" content={post.title} />
      <meta itemProp="datePublished" content={post.publishedDate} />
      <meta itemProp="dateModified" content={post.modifiedDate} />
      <meta itemProp="image" content={post.images.damageChecklist.src} />
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
                <span itemProp="name">Garment Emergency Rescue</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          <div className="loom-blog-hero__badge">
            <span className="badge-tag">EMERGENCY GARMENT FIRST-AID</span>
            <span className="badge-geo">GURUGRAM VALET ADVISORY</span>
          </div>

          <h1 className="loom-blog-hero__title" itemProp="name">
            Is Your &ldquo;Dry Clean Only&rdquo; Outfit Truly Ruined? <span className="title-accent">(And How to Save It)</span>
          </h1>

          <p className="loom-blog-hero__subtitle" itemProp="description">
            Pulled silk, wool, or a designer lehenga out of the wash—or spilled wine at dinner in Cyber City? Don&apos;t panic: 90% of delicate garments can be fully restored if you handle the damage correctly in the first 30 minutes.
          </p>

          <div className="loom-blog-hero__meta" itemProp="author" itemScope itemType="https://schema.org/Person">
            <div className="meta-author-avatar">
              <span>LS</span>
            </div>
            <div className="meta-author-info">
              <span className="meta-author-name" itemProp="name">Loomshine Textile Care Specialists</span>
              <span className="meta-author-sub">Flagship Studio • Central Arcade Market, MG Road, Gurugram</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-pill">
              <span className="meta-icon">⏱</span>
              <span>4 min read</span>
            </div>
            <div className="meta-pill">
              <span className="meta-icon">📍</span>
              <span>30-Min Doorstep Valet</span>
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
              
              {/* AEO / AI Executive Answer Box */}
              <section className="loom-aeo-summary-box" aria-label="AI Search Quick Answer">
                <div className="aeo-summary-header">
                  <span className="aeo-icon">💡</span>
                  <span className="aeo-title">QUICK ANSWER FOR AI & EMERGENCY SEARCH</span>
                </div>
                <p className="aeo-answer-text">
                  <strong>Is it ruined forever? In 90% of cases, NO.</strong> Shrunk wool can be un-shrunk using professional botanical fiber relaxers; limp jackets can be re-structured using calibrated steam tensioning; and fresh wine or oil stains are <strong>100% extractable</strong> with hydrocarbon bio-solvents—provided you <strong>never rub with a wet napkin</strong> and <strong>never apply direct iron heat</strong> in the first 30 minutes.
                </p>
                <div className="aeo-badges">
                  <span className="aeo-tag">✔ 90% Reversal Rate</span>
                  <span className="aeo-tag">✔ Zero-PERC Bio-Solvents</span>
                  <span className="aeo-tag">✔ 30-Min Gurugram Doorstep Valet</span>
                </div>
              </section>

              {/* The Panic Moment Section */}
              <section className="loom-blog-section">
                <p className="lead-paragraph">
                  You just pulled a silk blouse, wool blazer, or heirloom designer lehenga out of the wash—or spilled red wine on it during a celebratory dinner at Cyber City or Golf Course Road. It looks shrunken, limp, discolored, or heavily splotched. Your immediate sinking thought: <em>&ldquo;Is it ruined forever?&rdquo;</em>
                </p>
                <p>
                  Take a breath. <strong>In 90% of cases, the garment is completely salvageable.</strong> Modern luxury textiles are resilient, but their internal physics require delicate chemistry. What happens in the <strong>first 30 minutes</strong> determines whether your outfit returns to pristine showroom elegance or suffers irreversible fabric damage.
                </p>
              </section>

              {/* Section 1: The 3-Second Damage Checklist */}
              <section className="loom-blog-section" id="damage-checklist">
                <div className="section-title-wrap">
                  <span className="section-eyebrow">DIAGNOSTIC PROTOCOL</span>
                  <h2 className="section-title">The 3-Second Damage Checklist</h2>
                </div>
                <p>
                  Before you attempt any DIY remedy or give in to despair, assess your garment against these three primary textile conditions:
                </p>

                {/* Photo 1: Damage Checklist Graphic */}
                <figure className="loom-blog-figure">
                  <div className="figure-image-wrapper">
                    <img
                      src={post.images.damageChecklist.src}
                      alt={post.images.damageChecklist.alt}
                      loading="eager"
                      className="loom-blog-img"
                      width="700"
                      height="875"
                    />
                  </div>
                  <figcaption className="figure-caption">
                    <span className="caption-tag">FIG 1.0</span> {post.images.damageChecklist.caption}
                  </figcaption>
                </figure>

                <div className="checklist-cards-grid">
                  <div className="checklist-card">
                    <div className="checklist-card__header">
                      <span className="checklist-card__num">01</span>
                      <h3 className="checklist-card__title">Shrunk or Warped?</h3>
                    </div>
                    <p className="checklist-card__desc">
                      Natural animal fibers like pure wool, cashmere, and merino have microscopic scale-like cuticles. When immersed in turbulent water, these scales interlock and contract.
                    </p>
                    <div className="checklist-verdict verdict-green">
                      <strong>Verdict:</strong> Fully Reversible with professional fiber relaxers and graduated blocking.
                    </div>
                  </div>

                  <div className="checklist-card">
                    <div className="checklist-card__header">
                      <span className="checklist-card__num">02</span>
                      <h3 className="checklist-card__title">Limp &amp; Wrinkled?</h3>
                    </div>
                    <p className="checklist-card__desc">
                      Structured blazers, sherwanis, and coats contain floating chest horsehair canvas and thermo-fused interlinings that collapse when submerged in standard washing machine drums.
                    </p>
                    <div className="checklist-verdict verdict-green">
                      <strong>Verdict:</strong> Restorable with precision vacuum steam tensioning and multi-zone reshaping.
                    </div>
                  </div>

                  <div className="checklist-card">
                    <div className="checklist-card__header">
                      <span className="checklist-card__num">03</span>
                      <h3 className="checklist-card__title">Fresh Wine, Oil, or Food Stain?</h3>
                    </div>
                    <p className="checklist-card__desc">
                      Spills of red wine, butter gravies, or espresso sitting on silk, georgette, or pashmina have not yet chemically bonded to the inner yarn core—as long as no heat has been applied.
                    </p>
                    <div className="checklist-verdict verdict-green">
                      <strong>Verdict:</strong> 100% extractable with organic hydrocarbon bio-solvents.
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: 2 Big Mistakes That ACTUALLY Ruin Clothes */}
              <section className="loom-blog-section" id="critical-mistakes">
                <div className="section-title-wrap">
                  <span className="section-eyebrow">CRITICAL WARNING</span>
                  <h2 className="section-title">2 Big Mistakes That ACTUALLY Ruin Clothes</h2>
                </div>
                <p>
                  Most delicate garments are not ruined by the initial wash or spill—they are ruined by well-intentioned but disastrous emergency reactions at restaurant tables and laundry rooms:
                </p>

                {/* Mistake #1 Card & Photo */}
                <div className="mistake-block">
                  <div className="mistake-header">
                    <span className="mistake-cross">✕</span>
                    <h3 className="mistake-title">Mistake #1: Rubbing with a Wet Napkin</h3>
                  </div>

                  <figure className="loom-blog-figure">
                    <div className="figure-image-wrapper">
                      <img
                        src={post.images.mistake1.src}
                        alt={post.images.mistake1.alt}
                        loading="lazy"
                        className="loom-blog-img"
                        width="700"
                        height="875"
                      />
                    </div>
                    <figcaption className="figure-caption">
                      <span className="caption-tag">FIG 2.0</span> {post.images.mistake1.caption}
                    </figcaption>
                  </figure>

                  <div className="mistake-details">
                    <div className="mistake-point">
                      <strong>The Microscopic Risk:</strong> Wet friction breaks and crushes fragile silk filaments and fine wool fibers. This creates microscopic surface abrasion known as <em>fibrillation</em>, leaving permanent fuzzy white rings that no dry cleaner can re-dye.
                    </div>
                    <div className="mistake-protip">
                      <strong>Pro Emergency Tip:</strong> Always blot gently with a clean, dry paper napkin or tissue. Never rub, scrub, or twist the fabric!
                    </div>
                  </div>
                </div>

                {/* Mistake #2 Card & Photo */}
                <div className="mistake-block">
                  <div className="mistake-header">
                    <span className="mistake-cross">✕</span>
                    <h3 className="mistake-title">Mistake #2: Ironing Over the Damp Spot</h3>
                  </div>

                  <figure className="loom-blog-figure">
                    <div className="figure-image-wrapper">
                      <img
                        src={post.images.mistake2.src}
                        alt={post.images.mistake2.alt}
                        loading="lazy"
                        className="loom-blog-img"
                        width="700"
                        height="875"
                      />
                    </div>
                    <figcaption className="figure-caption">
                      <span className="caption-tag">FIG 3.0</span> {post.images.mistake2.caption}
                    </figcaption>
                  </figure>

                  <div className="mistake-details">
                    <div className="mistake-point">
                      <strong>The Thermal Danger:</strong> Applying direct heat from a domestic flat iron to a damp wine, coffee, or oil stain bakes the pigment and denatures the proteins directly into the molecular core of the threads.
                    </div>
                    <div className="mistake-protip golden-rule">
                      <strong>The Golden Rule:</strong> Never apply heat until the stain pigment is professionally extracted with bio-solvents!
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Interactive Triage First-Aid Advisor */}
              <section className="loom-blog-section loom-interactive-triage">
                <div className="section-title-wrap">
                  <span className="section-eyebrow">INTERACTIVE AID</span>
                  <h2 className="section-title">Emergency Garment First-Aid Advisor</h2>
                  <p className="section-subtext">Select your situation to receive immediate safe handling steps:</p>
                </div>

                <div className="triage-controls">
                  <div className="triage-group">
                    <label className="triage-label">1. What happened?</label>
                    <div className="triage-buttons">
                      <button
                        type="button"
                        className={`triage-btn ${selectedIncident === 'wash' ? 'active' : ''}`}
                        onClick={() => setSelectedIncident('wash')}
                      >
                        Accidentally Washed at Home
                      </button>
                      <button
                        type="button"
                        className={`triage-btn ${selectedIncident === 'stain' ? 'active' : ''}`}
                        onClick={() => setSelectedIncident('stain')}
                      >
                        Fresh Wine, Oil or Food Spill
                      </button>
                    </div>
                  </div>

                  <div className="triage-group">
                    <label className="triage-label">2. What fabric?</label>
                    <div className="triage-buttons">
                      <button
                        type="button"
                        className={`triage-btn ${selectedFabric === 'silk' ? 'active' : ''}`}
                        onClick={() => setSelectedFabric('silk')}
                      >
                        Pure Silk / Satin / Chiffon
                      </button>
                      <button
                        type="button"
                        className={`triage-btn ${selectedFabric === 'wool' ? 'active' : ''}`}
                        onClick={() => setSelectedFabric('wool')}
                      >
                        Wool / Cashmere Knitwear
                      </button>
                      <button
                        type="button"
                        className={`triage-btn ${selectedFabric === 'suit' ? 'active' : ''}`}
                        onClick={() => setSelectedFabric('suit')}
                      >
                        Structured Blazer / Lehenga
                      </button>
                    </div>
                  </div>
                </div>

                <div className="triage-result-card">
                  <div className="triage-result-header">
                    <span className="triage-status-pill">{advice.status}</span>
                    <span className="triage-timeframe">Immediate 30-Minute Window</span>
                  </div>
                  <div className="triage-result-body">
                    <div className="result-step">
                      <strong>Immediate Action:</strong> {advice.immediateStep}
                    </div>
                    <div className="result-step result-loomshine">
                      <strong>Loomshine Studio Treatment:</strong> {advice.loomshineSolution}
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4: How LOOMSHINE Restores Your Garments in Gurugram */}
              <section className="loom-blog-section" id="how-loomshine-restores">
                <div className="section-title-wrap">
                  <span className="section-eyebrow">PROFESSIONAL RESTORATION</span>
                  <h2 className="section-title">How LOOMSHINE Restores Your Garments in Gurugram</h2>
                </div>
                <p>
                  When home remedies can do more harm than good, LOOMSHINE brings hospital-grade European textile restoration directly to your residence or corporate office across Gurugram:
                </p>

                {/* Photo 3: Gurugram 30-Min Doorstep Map */}
                <figure className="loom-blog-figure">
                  <div className="figure-image-wrapper">
                    <img
                      src={post.images.expressPickup.src}
                      alt={post.images.expressPickup.alt}
                      loading="lazy"
                      className="loom-blog-img"
                      width="700"
                      height="875"
                    />
                  </div>
                  <figcaption className="figure-caption">
                    <span className="caption-tag">FIG 4.0</span> {post.images.expressPickup.caption}
                  </figcaption>
                </figure>

                <div className="restoration-features">
                  <div className="feature-item">
                    <div className="feature-icon">⚡</div>
                    <div className="feature-content">
                      <h3 className="feature-title">30-Minute Express Doorstep Pickup</h3>
                      <p className="feature-desc">
                        Don&apos;t let stains sit and oxidize in Gurgaon&apos;s heat. Our dedicated logistics valet reaches your building across <strong>Golf Course Road, DLF Phase 1–5, Cyber City, MG Road, or Sohna Road in just 30 minutes</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">🌿</div>
                    <div className="feature-content">
                      <h3 className="feature-title">100% Organic Hydrocarbon Bio-Solvents (PERC-Free)</h3>
                      <p className="feature-desc">
                        Unlike conventional neighbourhood dry cleaners using toxic perchloroethylene (PERC), our bio-solvents dissolve wine, grease, and complex sugars gently. Natural dyes remain vibrant, gold zari stays untarnished, and clothes emerge silky soft with zero chemical smell.
                      </p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">💨</div>
                    <div className="feature-content">
                      <h3 className="feature-title">German Steam Reshaping &amp; Tensioning</h3>
                      <p className="feature-desc">
                        Our calibrated steam form-finishers restore suit lapels, trousers, pashminas, and structured lehengas to their exact initial cut without seam impression or unwanted fabric shine.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: Save Your Favorite Garment Today CTA */}
              <section className="loom-blog-section loom-cta-highlight" id="save-garment-cta">
                <figure className="loom-blog-figure">
                  <div className="figure-image-wrapper">
                    <img
                      src={post.images.ctaGraphic.src}
                      alt={post.images.ctaGraphic.alt}
                      loading="lazy"
                      className="loom-blog-img"
                      width="700"
                      height="875"
                    />
                  </div>
                  <figcaption className="figure-caption">
                    <span className="caption-tag">FIG 5.0</span> {post.images.ctaGraphic.caption}
                  </figcaption>
                </figure>

                <div className="cta-action-box">
                  <h3 className="cta-action-title">Save Your Favorite Garment Today</h3>
                  <p className="cta-action-subtitle">
                    Don&apos;t risk permanent fiber damage with guesswork. Let Gurugram&apos;s organic garment specialists inspect, treat, and restore your prized wardrobe.
                  </p>

                  <div className="cta-action-buttons">
                    <Button
                      href="#book-pickup"
                      variant="primary"
                      size="lg"
                      className="cta-btn-pickup"
                    >
                      📅 Schedule 30-Sec Pickup Online
                    </Button>
                    <a
                      href={emergencyWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-btn-whatsapp"
                    >
                      💬 WhatsApp Emergency Valet
                    </a>
                  </div>

                  <div className="cta-contact-grid">
                    <div className="cta-contact-pill">
                      <span className="pill-label">Direct Lines:</span>
                      <a href="tel:+919205366606" className="pill-link">+91 9205366606</a>
                      <span className="pill-sep">•</span>
                      <a href="tel:+918877286066" className="pill-link">+91 8877286066</a>
                    </div>
                    <div className="cta-contact-pill">
                      <span className="pill-label">Flagship Studio:</span>
                      <span className="pill-text">Shop No. 262, 1st Floor, Central Arcade Market, MG Road, Gurugram</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6: Comprehensive AEO FAQ Accordion */}
              <section className="loom-blog-section" id="faq-guide" itemScope itemType="https://schema.org/FAQPage">
                <div className="section-title-wrap">
                  <span className="section-eyebrow">VOICE &amp; SEARCH INTELLIGENCE</span>
                  <h2 className="section-title">Frequently Asked Questions</h2>
                </div>

                <div className="loom-blog-faq-list">
                  {post.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
                        itemScope
                        itemProp="mainEntity"
                        itemType="https://schema.org/Question"
                      >
                        <button
                          type="button"
                          className="faq-question-btn"
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          aria-expanded={isOpen}
                        >
                          <span className="faq-q-text" itemProp="name">{faq.question}</span>
                          <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                        </button>
                        {isOpen && (
                          <div
                            className="faq-answer-content"
                            itemScope
                            itemProp="acceptedAnswer"
                            itemType="https://schema.org/Answer"
                          >
                            <p itemProp="text">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Section 7: Gurugram Geo Entity Map & Hub Coverage */}
              <section className="loom-blog-section loom-geo-coverage-box">
                <div className="geo-header">
                  <span className="geo-icon">📍</span>
                  <h3 className="geo-title">Gurugram 30-Minute Doorstep Coverage Areas</h3>
                </div>
                <p className="geo-description">
                  Our emergency stain recovery valets service all major luxury residential complexes and corporate hubs across Gurgaon:
                </p>
                <div className="geo-tags-wrap">
                  {post.geoCoverage.map((area, i) => (
                    <span key={i} className="geo-locality-tag">{area}</span>
                  ))}
                </div>
              </section>

              {/* Social Share & Article Footer */}
              <div className="loom-blog-footer-share">
                <span className="share-title">Share this Garment Emergency Guide:</span>
                <div className="share-buttons">
                  <button type="button" onClick={() => handleShare('whatsapp')} className="share-btn share-wa">
                    WhatsApp
                  </button>
                  <button type="button" onClick={() => handleShare('twitter')} className="share-btn share-tw">
                    X / Twitter
                  </button>
                  <button type="button" onClick={() => handleShare('copy')} className="share-btn share-copy">
                    {copiedLink ? 'Copied ✓' : 'Copy Link'}
                  </button>
                </div>
              </div>

            </main>

            {/* Right Sticky Sidebar */}
            <aside className="loom-blog-sidebar">
              {/* Quick Valet Dispatch Widget */}
              <div className="sidebar-card sidebar-card--action">
                <span className="sidebar-card__tag">30-MIN VALET PICKUP</span>
                <h4 className="sidebar-card__title">Stains Won&apos;t Wait</h4>
                <p className="sidebar-card__desc">
                  Have an emergency wine spill or washed wool blazer in Gurugram? Our valet arrives in 30 minutes.
                </p>
                <Button
                  href="#book-pickup"
                  variant="primary"
                  size="md"
                  fullWidth
                >
                  Book Instant Pickup
                </Button>
                <a
                  href="tel:+919205366606"
                  className="sidebar-call-link"
                >
                  📞 Call +91 9205366606
                </a>
              </div>

              {/* Quick Table of Contents */}
              <div className="sidebar-card">
                <h4 className="sidebar-card__title">Table of Contents</h4>
                <ul className="sidebar-toc">
                  <li><a href="#damage-checklist">1. The 3-Second Damage Checklist</a></li>
                  <li><a href="#critical-mistakes">2. 2 Mistakes That Ruin Clothes</a></li>
                  <li><a href="#how-loomshine-restores">3. How Loomshine Restores in Gurugram</a></li>
                  <li><a href="#save-garment-cta">4. Save Your Favorite Garment Today</a></li>
                  <li><a href="#faq-guide">5. Frequently Asked Questions</a></li>
                </ul>
              </div>

              {/* Studio Info Card */}
              <div className="sidebar-card sidebar-card--studio">
                <h4 className="sidebar-card__title">Loomshine Studio</h4>
                <p className="studio-address">
                  <strong>Shop No. 262, First Floor</strong><br />
                  Central Arcade Market, MG Road<br />
                  Gurugram, Haryana 122002
                </p>
                <p className="studio-hours">
                  Open 7 Days: 9:00 AM – 8:00 PM
                </p>
                <a
                  href="https://maps.google.com/maps?q=Central%20Arcade%20Market%2C%20MG%20Road%2C%20Gurugram%2C%20Haryana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="studio-map-btn"
                >
                  Get Studio Directions ↗
                </a>
              </div>

              {/* Related Services Links */}
              <div className="sidebar-card">
                <h4 className="sidebar-card__title">Related Garment Care</h4>
                <ul className="sidebar-services-list">
                  <li><a href="#/services/dry-cleaning">Organic Dry Cleaning →</a></li>
                  <li><a href="#/services/steam-pressing">Vacuum Steam Pressing →</a></li>
                  <li><a href="#/services/shoe-and-leather">Shoe &amp; Leather Bag Care →</a></li>
                  <li><a href="#/pricing">View Itemized Rate Card →</a></li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </article>
  );
};

export default BlogPostPage;
