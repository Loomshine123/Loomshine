import React, { useState, useRef } from 'react';
import Container from '../common/Container';
import Button from '../common/Button';
import '../../pages/BlogPostPage.css';
import './PGWhiteEthnicRescuePost.css';

export const PGWhiteEthnicRescuePost = ({ post }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedFabric, setSelectedFabric] = useState('mulmul-cotton');
  const [selectedProblem, setSelectedProblem] = useState('yellow-collar');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('sector-56');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPromo, setCopiedPromo] = useState(false);

  // Touch swipe support for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Carousel slide metadata for interactive walkthrough
  const carouselSlides = [
    {
      img: post.images.hero.src,
      title: "Episode 2: The PG Student's Nightmare",
      desc: "Getting your white chaniya choli ready for Kanya Pujan in two hours without a washing machine!",
      tag: "EPISODE 2 • COVER"
    },
    {
      img: post.images.yellowCollar.src,
      title: "Last Monsoon's Wash = This Year's Yellow Collar",
      desc: "Sorting your closet in a Gurugram PG and finding your crisp whites turned dull, grey, or yellowed.",
      tag: "THE WARDROBE SHOCK"
    },
    {
      img: post.images.dullWhites.src,
      title: "Why Whites Can Look Dull & Dingy",
      desc: "High-TDS mineral deposits, detergent residues, and oxidized body sebum trap a dingy yellow cast inside fibers.",
      tag: "SCIENCE OF DULLNESS"
    },
    {
      img: post.images.bleachWarning.src,
      title: "Don't Reach for Chlorine Bleach!",
      desc: "Strong bleach aggressively weakens delicate cotton or rayon and reacts with hard water to permanently scorch fabric yellow.",
      tag: "CRITICAL WARNING"
    },
    {
      img: post.images.fabricFirst.src,
      title: "A Fabric-First Approach to Whites",
      desc: "Oxygen-based mineral neutralizers lift stubborn calcium deposits and organic discoloration safely without fiber erosion.",
      tag: "LOOMSHINE SCIENCE"
    },
    {
      img: post.images.steamFinishing.src,
      title: "Freshly Cared For. Ready to Wear.",
      desc: "Pressurized German steam finishing sanitizes at 99.9% and releases deep creases for a crisp boutique drape.",
      tag: "PRECISION STEAM"
    },
    {
      img: post.images.pgPickup.src,
      title: "No Machine? No Drying Balcony? No Problem.",
      desc: "Dedicated 30-minute doorstep valet pickup right from your PG gate across DLF Phase 3, Sector 56, and Sector 28.",
      tag: "EXPRESS PG VALET"
    },
    {
      img: post.images.festiveOffer.src,
      title: "Get Your Festive Whites Ready",
      desc: "Use code FESTIVEFRESH for a complimentary German steam press on your highest-value piece for orders over ₹499.",
      tag: "FESTIVE BOOST"
    }
  ];

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      // Swiped left -> Next
      setActiveSlide((prev) => (prev < carouselSlides.length - 1 ? prev + 1 : 0));
    } else if (distance < -50) {
      // Swiped right -> Prev
      setActiveSlide((prev) => (prev > 0 ? prev - 1 : carouselSlides.length - 1));
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Dynamic Triage Advisor based on fabric & white garment problem
  const getTriageAdvice = () => {
    if (selectedFabric === 'mulmul-cotton' || selectedFabric === 'chikankari') {
      if (selectedProblem === 'yellow-collar') {
        return {
          status: '100% Reversible with Oxygen Bio-Lift',
          warning: 'DO NOT pour household chlorine bleach (Ala) or scrub with stiff brushes. Bleach reacts with neck sebum and hard-water iron to leave a permanent orange-yellow scorch.',
          loomshineSolution: 'Loomshine active oxygen de-yellowing soak dissolves oxidized sebum and lifts collar mineral scaling without degrading delicate embroidery threads.'
        };
      }
      if (selectedProblem === 'grey-haze') {
        return {
          status: 'Full Luminosity Restoration',
          warning: 'Avoid repeat bucket washing with cold Gurugram tap water. High mineral TDS coats cotton in microscopic calcium scale, turning pristine white into murky grey.',
          loomshineSolution: 'Hydro-mineral descaling bath neutralizes trapped calcium carbonate followed by optical bio-brighteners that restore true white reflection.'
        };
      }
      return {
        status: 'Safe Stain Extraction',
        warning: 'Never apply hot iron over damp stains. Heat sets tannin and pigment deep into the cellulose core.',
        loomshineSolution: 'Targeted pH-calibrated ultrasonic spot extraction lifts food, sindoor, or tea pigments without bleeding or fabric thinning.'
      };
    } else if (selectedFabric === 'rayon-blend') {
      return {
        status: 'Delicate Fiber Recovery Required',
        warning: 'Rayon loses up to 50% tensile strength when wet. Bleach or vigorous bucket wringing will cause tears at the seamlines and armholes.',
        loomshineSolution: 'Zero-tension botanical bio-cleaning followed by vacuum steam table relaxing preserves silhouette and drape integrity.'
      };
    } else {
      return {
        status: 'High Care / Precious Festivewear',
        warning: 'Do NOT immerse in detergent water. Water tarnishes silver/gold zari embroidery and loosens adhesive under mirrors and sequins.',
        loomshineSolution: '100% PERC-free hydrocarbon organic dry clean preserves metallic threads and mirror backing while clarifying the white fabric base.'
      };
    }
  };

  const advice = getTriageAdvice();

  // Gurugram Neighborhood Valet Data
  const neighborhoodData = {
    'sector-56': {
      name: 'Sector 56 & Sector 54',
      eta: '20–25 Min Pickup',
      coverage: 'Kendriya Vihar, Devinder Vihar, Sector 56 Huda Market, Golf Course Ext PGs',
      message: 'Hi Loomshine Gurugram, I am in a PG in Sector 56 and need urgent pickup for my white ethnic wear before Kanya Pujan tomorrow.'
    },
    'sector-28': {
      name: 'Sector 28 & Galleria',
      eta: '15–20 Min Dispatch',
      coverage: 'Silver Oaks, Galleria Market vicinity, Sector 28 co-living, DLF Phase 1/4 borders',
      message: 'Hi Loomshine Gurugram, I am near Sector 28 / Galleria and need an urgent 30-min pickup for my white kurta / chaniya choli.'
    },
    'dlf-phase-3': {
      name: 'DLF Phase 3 & Cyber City',
      eta: '25–30 Min Pickup',
      coverage: 'DLF Phase 3 V-Block, Pink Town House, CoHo, Stanza Living, Udyog Vihar',
      message: 'Hi Loomshine Gurugram, I am living in a PG in DLF Phase 3 near Cyber City. Need urgent doorstep valet for my white ethnic outfit.'
    },
    'sushant-lok': {
      name: 'Sushant Lok & Sec 43',
      eta: '15–20 Min Dispatch',
      coverage: 'Sushant Lok 1, Vyapar Kendra, Sector 43 HUDA metro zone, Paras Hospital corridor',
      message: 'Hi Loomshine Gurugram, I am in Sushant Lok 1 / Sector 43. Need urgent valet pickup for festive white wear restoration.'
    },
    'central-arcade': {
      name: 'Central Arcade Studio',
      eta: 'Walk-In Drop-off',
      coverage: 'Shop No. 262, First Floor, Central Arcade Market, MG Road (Opposite Sahara Mall)',
      message: 'Hi Loomshine Gurugram, I am bringing my white chaniya choli directly to your Central Arcade MG Road studio for express care.'
    }
  };

  const currentArea = neighborhoodData[selectedNeighborhood] || neighborhoodData['sector-56'];

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

  const emergencyWhatsAppUrl = `https://wa.me/919205366606?text=${encodeURIComponent(currentArea.message)}`;

  return (
    <article className="loom-blog-page" itemScope itemType="https://schema.org/BlogPosting">
      {/* Microdata Meta Elements */}
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
                <span itemProp="name">PG Whites Kanya Pujan Rescue</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          <div className="loom-blog-hero__badge">
            <span className="badge-tag">EPISODE 2 • 9 DAYS OF NAVRATRI</span>
            <span className="badge-geo">GURUGRAM PG RESIDENT ADVISORY</span>
          </div>

          <h1 className="loom-blog-hero__title" itemProp="name">
            The PG Student&apos;s Nightmare:{' '}
            <span className="title-accent">Getting Your White Chaniya Choli Kanya-Pujan Ready in 2 Hours</span>
          </h1>

          <p className="loom-blog-hero__subtitle" itemProp="description">
            It&apos;s late evening in your Sector 28 or Sector 56 PG. Tomorrow morning is Kanya Pujan, and the white Kurta or traditional Chaniya Choli you planned to wear is dull, greyish, and stained with last monsoon&apos;s yellow collar. No washing machine? No drying balcony? Here is your exact Gurugram emergency rescue guide.
          </p>

          <div className="loom-blog-hero__meta" itemProp="author" itemScope itemType="https://schema.org/Person">
            <div className="meta-author-avatar">
              <span>LS</span>
            </div>
            <div className="meta-author-info">
              <span className="meta-author-name" itemProp="name">Loomshine Master Fabricators</span>
              <span className="meta-author-sub">Central Arcade Market, MG Road, Gurugram</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-pill">
              <span className="meta-icon">⏱</span>
              <span>4 min read</span>
            </div>
            <div className="meta-pill">
              <span className="meta-icon">📍</span>
              <span>30-Min Doorstep PG Pickup</span>
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

              {/* INTERACTIVE CAROUSEL WALKTHROUGH */}
              <section className="loom-blog-section" id="visual-carousel-story" style={{ marginTop: 0 }}>
                <div className="section-title-wrap">
                  <span className="section-eyebrow">9 DAYS OF NAVRATRI • EPISODE 2</span>
                  <h2 className="section-title">Visual Story: 8 Steps to Save Your Whites</h2>
                  <p className="section-subtext">Swipe or click through the cards below to see why whites turn yellow and how Loomshine restores them without bleach:</p>
                </div>

                <div className="pg-carousel-walkthrough">
                  <div
                    className="pg-carousel-image-frame"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <img
                      src={carouselSlides[activeSlide].img}
                      alt={carouselSlides[activeSlide].title}
                      className="pg-carousel-img"
                    />
                    <span className="pg-carousel-badge-tag">
                      {carouselSlides[activeSlide].tag}
                    </span>
                    <span className="pg-carousel-counter-tag">
                      {activeSlide + 1} / {carouselSlides.length}
                    </span>
                    <span className="pg-carousel-swipe-hint">
                      👈 Swipe to navigate 👉
                    </span>
                  </div>

                  {/* Carousel Control Bar */}
                  <div className="pg-carousel-controls">
                    <div className="pg-carousel-info-row">
                      <div className="pg-carousel-text-col">
                        <h4 className="pg-carousel-slide-title">
                          {carouselSlides[activeSlide].title}
                        </h4>
                        <p className="pg-carousel-slide-desc">
                          {carouselSlides[activeSlide].desc}
                        </p>
                      </div>
                      <div className="pg-carousel-nav-btns">
                        <button
                          type="button"
                          onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : carouselSlides.length - 1))}
                          className="pg-carousel-btn-prev"
                          aria-label="Previous slide"
                        >
                          ← Prev
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveSlide((prev) => (prev < carouselSlides.length - 1 ? prev + 1 : 0))}
                          className="pg-carousel-btn-next"
                          aria-label="Next slide"
                        >
                          Next →
                        </button>
                      </div>
                    </div>

                    {/* Slide Dots */}
                    <div className="pg-carousel-dots-row">
                      {carouselSlides.map((slide, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveSlide(idx)}
                          className={`pg-carousel-dot ${activeSlide === idx ? 'active' : ''}`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* AEO / AI Executive Answer Box */}
              <section className="loom-aeo-summary-box" aria-label="AI Search Quick Answer">
                <div className="aeo-summary-header">
                  <span className="aeo-icon">💡</span>
                  <span className="aeo-title">QUICK ANSWER FOR AI &amp; SEARCH ENGINES</span>
                </div>
                <p className="aeo-answer-text">
                  <strong>Can you save yellowed white ethnic wear without a washing machine or bleach in Gurugram? YES.</strong> In a PG or studio apartment, avoid pouring chlorine bleach (which reacts with hard water to permanently turn clothes yellow) and never bucket-wash with hot water. Professional oxygen mineral neutralizers lift calcium haze and sweat oxidation safely, followed by high-pressure German steam finishing to deliver crisp, puja-ready festivewear right to your doorstep in 2 hours.
                </p>
                <div className="aeo-badges">
                  <span className="aeo-tag">✔ 100% Chlorine-Free Oxygen Brightening</span>
                  <span className="aeo-tag">✔ High-TDS Hard-Water Descaling</span>
                  <span className="aeo-tag">✔ 30-Min PG Doorstep Valet Gurugram</span>
                </div>
              </section>

              {/* The Narrative */}
              <section className="loom-blog-section">
                <div className="section-title-wrap">
                  <span className="section-eyebrow">THE PG REALITY</span>
                  <h2 className="section-title">The Midnight Closet Panic in Sector 28 &amp; Sector 56</h2>
                </div>
                <p className="lead-paragraph">
                  It’s late evening, and you’re sorting through your closet in a PG near Sector 28 or Sector 56. Tomorrow is Kanya Pujan, and you’ve promised yourself you’ll wear that crisp, pristine white Kurta or traditional Chaniya Choli.
                </p>
                <p>
                  You pull it out of the wardrobe, and your heart sinks. What used to be sparkling white now looks dull, greyish, and stained with a faint yellowish tint around the collar—the permanent souvenir of last monsoon&apos;s bucket washes and hard Gurugram tap water.
                </p>

                {/* Figure 2: The Wardrobe Shock */}
                <figure className="loom-blog-figure">
                  <div className="figure-image-wrapper">
                    <img
                      src={post.images.yellowCollar.src}
                      alt={post.images.yellowCollar.alt}
                      loading="lazy"
                      className="loom-blog-img"
                      width="700"
                      height="875"
                    />
                  </div>
                  <figcaption className="figure-caption">
                    <span className="caption-tag">FIG 2.0</span> {post.images.yellowCollar.caption}
                  </figcaption>
                </figure>

                <p>
                  If you’re a college student or young corporate professional living alone in a hostel or studio apartment, you probably don’t have a washing machine, a sunny drying balcony, or hours to spend hand-scrubbing whites. And throwing it into a local dhobi&apos;s harsh chemical wash right before tomorrow morning is a gamble you simply cannot afford.
                </p>
              </section>

              {/* Section: Why Whites Look Dull */}
              <section className="loom-blog-section" id="why-whites-look-dull">
                <div className="section-title-wrap">
                  <span className="section-eyebrow">TEXTILE DIAGNOSTICS</span>
                  <h2 className="section-title">Why Whites Can Look Dull &amp; Grey in Gurugram</h2>
                </div>
                <p>
                  Why do white ethnic clothes look brilliant in showroom lights but slowly turn yellow and dingy after just one season in Gurugram? The culprit is a combination of three invisible adversaries:
                </p>

                {/* Figure 3: Dull Whites Graphic */}
                <figure className="loom-blog-figure">
                  <div className="figure-image-wrapper">
                    <img
                      src={post.images.dullWhites.src}
                      alt={post.images.dullWhites.alt}
                      loading="lazy"
                      className="loom-blog-img"
                      width="700"
                      height="875"
                    />
                  </div>
                  <figcaption className="figure-caption">
                    <span className="caption-tag">FIG 3.0</span> {post.images.dullWhites.caption}
                  </figcaption>
                </figure>

                <div className="checklist-cards-grid">
                  <div className="checklist-card">
                    <h4 style={{ color: '#071A33', margin: '0 0 6px 0', fontSize: '16px' }}>1. Hard Tap Water Mineral Scale</h4>
                    <p style={{ color: '#5A6E85', fontSize: '14px', margin: 0, lineHeight: 1.55 }}>
                      Groundwater across DLF Phase 3, Sector 56, and Sector 28 has TDS levels exceeding 800–1200 ppm. Dissolved calcium and magnesium ions adhere to cotton cellulose, leaving a chalky film that scatters light into a dull grey cast.
                    </p>
                  </div>
                  <div className="checklist-card">
                    <h4 style={{ color: '#071A33', margin: '0 0 6px 0', fontSize: '16px' }}>2. Trapped Detergent Residue</h4>
                    <p style={{ color: '#5A6E85', fontSize: '14px', margin: 0, lineHeight: 1.55 }}>
                      In quick PG bucket washes without vigorous running rinses, synthetic laundry powders don&apos;t fully dissolve in hard water. Saponified surfactants bake onto the weave, attracting airborne dust.
                    </p>
                  </div>
                  <div className="checklist-card">
                    <h4 style={{ color: '#071A33', margin: '0 0 6px 0', fontSize: '16px' }}>3. Oxidized Sebum &amp; Sweat Oils</h4>
                    <p style={{ color: '#5A6E85', fontSize: '14px', margin: 0, lineHeight: 1.55 }}>
                      Body perspiration contains fatty lipids and urea. When stored in closed wardrobes post-monsoon, these trapped lipids oxidize over months, forming dark yellow bands around neck collars, cuffs, and underarms.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section: The Fatal Bleach Trap */}
              <section className="loom-blog-section" id="the-bleach-trap">
                <div className="section-title-wrap">
                  <span className="section-eyebrow">CRITICAL WARNING</span>
                  <h2 className="section-title">The Trap: Why Bleach Destroys White Fabrics</h2>
                </div>
                <p>
                  When confronted with yellowed whites, the knee-jerk reaction is to pour chlorine bleach or cheap supermarket whiteners over the fabric.
                </p>
                <div className="warning-callout-box">
                  <span className="warning-callout-icon">⛔</span>
                  <div>
                    <strong>Stop right there.</strong> Chlorine bleach is the number-one killer of delicate white festivewear. Here is why:
                  </div>
                </div>

                {/* Figure 4: Bleach Warning Graphic */}
                <figure className="loom-blog-figure">
                  <div className="figure-image-wrapper">
                    <img
                      src={post.images.bleachWarning.src}
                      alt={post.images.bleachWarning.alt}
                      loading="lazy"
                      className="loom-blog-img"
                      width="700"
                      height="875"
                    />
                  </div>
                  <figcaption className="figure-caption">
                    <span className="caption-tag">FIG 4.0</span> {post.images.bleachWarning.caption}
                  </figcaption>
                </figure>

                {/* Responsive Warning Cards */}
                <div className="pg-warning-grid">
                  <div className="pg-warning-card pg-warning-card--danger">
                    <h4>⚠️ Severe Fiber Damage</h4>
                    <p>
                      Chlorine bleach is extremely caustic (pH &gt; 11). It aggressively eats away at natural cotton, rayon, and delicate ethnic weaves, weakening threads until seams, hemlines, and trims rip apart.
                    </p>
                  </div>
                  <div className="pg-warning-card pg-warning-card--warning">
                    <h4>⚠️ The Reverse Yellowing Effect</h4>
                    <p>
                      Harsh chlorine reacts with residual skin proteins and hard-water iron minerals, chemically scorching the threads and locking in a permanent, indelible yellow tone.
                    </p>
                  </div>
                </div>

                {/* Responsive Comparison Matrix Table */}
                <div className="pg-matrix-container">
                  <div className="pg-matrix-scroll-hint">
                    👉 Scroll sideways to compare all treatments
                  </div>
                  <div className="pg-matrix-table-scroll">
                    <table className="pg-matrix-table">
                      <thead>
                        <tr style={{ background: '#071A33', color: '#FFFFFF' }}>
                          <th>Treatment Factor</th>
                          <th style={{ color: '#FEB2B2' }}>Chlorine Bleach</th>
                          <th style={{ color: '#FBD38D' }}>PG Bucket Wash</th>
                          <th style={{ color: '#9AE6B4' }}>Loomshine Oxygen Bio-Care</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: '1px solid #EDF2F7' }}>
                          <td style={{ fontWeight: '600' }}>Fiber Tensile Strength</td>
                          <td style={{ color: '#E53E3E' }}>Weakens &amp; tears threads</td>
                          <td>Normal</td>
                          <td style={{ color: '#2F855A', fontWeight: '600' }}>100% Preserved &amp; conditioned</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #EDF2F7', background: '#F7FAFC' }}>
                          <td style={{ fontWeight: '600' }}>Yellow Collar Reversal</td>
                          <td style={{ color: '#E53E3E' }}>Scorches yellow permanently</td>
                          <td style={{ color: '#DD6B20' }}>Fails to dissolve sebum</td>
                          <td style={{ color: '#2F855A', fontWeight: '600' }}>Active bio-enzymes lift yellowing</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #EDF2F7' }}>
                          <td style={{ fontWeight: '600' }}>Mineral Descaling</td>
                          <td style={{ color: '#E53E3E' }}>Zero descaling (bakes scale)</td>
                          <td style={{ color: '#DD6B20' }}>Adds more calcium deposits</td>
                          <td style={{ color: '#2F855A', fontWeight: '600' }}>Targeted chelation strips mineral haze</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #EDF2F7', background: '#F7FAFC' }}>
                          <td style={{ fontWeight: '600' }}>Mirror-Work &amp; Zari Safety</td>
                          <td style={{ color: '#E53E3E' }}>Corrodes foil &amp; dissolves glue</td>
                          <td style={{ color: '#DD6B20' }}>Water rusts metallic borders</td>
                          <td style={{ color: '#2F855A', fontWeight: '600' }}>100% safe, non-corrosive solvents</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: '600' }}>Boutique Finish &amp; Drape</td>
                          <td style={{ color: '#E53E3E' }}>Limp, crumpled, stiff</td>
                          <td>Crinkled, iron shine marks</td>
                          <td style={{ color: '#2F855A', fontWeight: '600' }}>Zero-contact German steam finish</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Section: Loomshine Professional Brightening */}
              <section className="loom-blog-section" id="loomshine-solution">
                <div className="section-title-wrap">
                  <span className="section-eyebrow">THE RESTORATION</span>
                  <h2 className="section-title">Loomshine: Professional Brightening Without Chemicals</h2>
                </div>
                <p>
                  You don&apos;t need a washing machine, messy buckets, or toxic chlorine bleach to get your whites glowing for Kanya Pujan.
                </p>
                <p>
                  At Loomshine, located centrally at Central Arcade, MG Road, we specialize in reviving tired, discolored garments for Gurugram’s independent residents:
                </p>

                {/* Figure 5: Fabric-First Graphic */}
                <figure className="loom-blog-figure">
                  <div className="figure-image-wrapper">
                    <img
                      src={post.images.fabricFirst.src}
                      alt={post.images.fabricFirst.alt}
                      loading="lazy"
                      className="loom-blog-img"
                      width="700"
                      height="875"
                    />
                  </div>
                  <figcaption className="figure-caption">
                    <span className="caption-tag">FIG 5.0</span> {post.images.fabricFirst.caption}
                  </figcaption>
                </figure>

                <div className="checklist-cards-grid">
                  <div className="checklist-card" style={{ borderLeft: '4px solid #C5A059' }}>
                    <h4 style={{ margin: '0 0 6px 0', color: '#071A33', fontSize: '17px' }}>1. Oxygen-Based Mineral Neutralizers</h4>
                    <p style={{ margin: 0, color: '#4A5568', fontSize: '14.5px', lineHeight: 1.55 }}>
                      Instead of destroying fibers with chlorine, our eco-friendly oxygen boosters lift stubborn hard-water calcium deposits and organic discoloration safely without fiber erosion.
                    </p>
                  </div>
                  <div className="checklist-card" style={{ borderLeft: '4px solid #071A33' }}>
                    <h4 style={{ margin: '0 0 6px 0', color: '#071A33', fontSize: '17px' }}>2. Deep Bio-Brightening</h4>
                    <p style={{ margin: 0, color: '#4A5568', fontSize: '14.5px', lineHeight: 1.55 }}>
                      Our bio-cleansing agents strip away invisible pollution grime, smog particles, and sweat oils accumulated from city travel, restoring original off-the-shelf brightness.
                    </p>
                  </div>
                  <div className="checklist-card" style={{ borderLeft: '4px solid #55E084' }}>
                    <h4 style={{ margin: '0 0 6px 0', color: '#071A33', fontSize: '17px' }}>3. Zero-Contact German Steam Finishing</h4>
                    <p style={{ margin: 0, color: '#4A5568', fontSize: '14.5px', lineHeight: 1.55 }}>
                      We finish your whites with pressurized, high-heat calibrated steam that kills 99.9% of bacteria, relaxes micro-creases, and leaves your outfit impeccably crisp and ready to wear.
                    </p>
                  </div>
                </div>

                {/* Figure 6: German Steam Finishing Graphic */}
                <figure className="loom-blog-figure">
                  <div className="figure-image-wrapper">
                    <img
                      src={post.images.steamFinishing.src}
                      alt={post.images.steamFinishing.alt}
                      loading="lazy"
                      className="loom-blog-img"
                      width="700"
                      height="875"
                    />
                  </div>
                  <figcaption className="figure-caption">
                    <span className="caption-tag">FIG 6.0</span> {post.images.steamFinishing.caption}
                  </figcaption>
                </figure>
              </section>

              {/* INTERACTIVE TRIAGE ADVISOR WIDGET */}
              <section className="loom-blog-section" id="triage-advisor">
                <div className="section-title-wrap">
                  <span className="section-eyebrow">DIAGNOSTIC ADVISOR</span>
                  <h2 className="section-title">Whites Emergency Triage Tool</h2>
                  <p className="section-subtext">Select your fabric &amp; issue for instant custom advice:</p>
                </div>

                <div className="pg-triage-card">
                  <div className="pg-triage-group">
                    <label className="pg-triage-label">
                      Step 1: Select Your Fabric
                    </label>
                    <div className="pg-triage-btn-group">
                      {[
                        { id: 'mulmul-cotton', label: '100% Mulmul Cotton' },
                        { id: 'chikankari', label: 'Lucknowi Chikankari' },
                        { id: 'rayon-blend', label: 'Rayon / Viscose Blend' },
                        { id: 'chanderi-zari', label: 'Chanderi / Zari Silk' }
                      ].map((fab) => (
                        <button
                          key={fab.id}
                          type="button"
                          onClick={() => setSelectedFabric(fab.id)}
                          className={`pg-pill-btn pg-pill-btn--primary ${selectedFabric === fab.id ? 'active' : ''}`}
                        >
                          {fab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pg-triage-group">
                    <label className="pg-triage-label">
                      Step 2: Select Garment Issue
                    </label>
                    <div className="pg-triage-btn-group">
                      {[
                        { id: 'yellow-collar', label: 'Yellow Collar & Sebum' },
                        { id: 'grey-haze', label: 'Dull Grey Water Haze' },
                        { id: 'stored-odor', label: 'Musty Monsoon Odor' }
                      ].map((prob) => (
                        <button
                          key={prob.id}
                          type="button"
                          onClick={() => setSelectedProblem(prob.id)}
                          className={`pg-pill-btn pg-pill-btn--accent ${selectedProblem === prob.id ? 'active' : ''}`}
                        >
                          {prob.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Result Box */}
                  <div className="pg-triage-output">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '18px' }}>🔍</span>
                      <strong style={{ fontSize: '14.5px', color: '#071A33' }}>Status: {advice.status}</strong>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '13.5px', color: '#C53030', background: '#FFF5F5', padding: '10px 12px', borderRadius: '8px' }}>
                      <strong>Warning:</strong> {advice.warning}
                    </div>
                    <div style={{ fontSize: '13.5px', color: '#276749', background: '#F0FFF4', padding: '10px 12px', borderRadius: '8px' }}>
                      <strong>Loomshine Solution:</strong> {advice.loomshineSolution}
                    </div>
                  </div>
                </div>
              </section>

              {/* Section: 30-Minute Doorstep Valet */}
              <section className="loom-blog-section" id="valet-pickup">
                <div className="section-title-wrap">
                  <span className="section-eyebrow">DOORSTEP CONVENIENCE</span>
                  <h2 className="section-title">30-Minute Doorstep Valet Across Gurugram</h2>
                </div>
                <p>
                  Whether you&apos;re studying near <strong>Sector 56</strong>, working in <strong>Cyber City</strong>, or staying in <strong>DLF Phase 3</strong>, you don&apos;t need to carry heavy laundry bags across town. Drop your location pin, and our valet will pick up your white ethnic wear right from your doorstep in 30 minutes.
                </p>

                {/* Figure 7: PG Doorstep Pickup Graphic */}
                <figure className="loom-blog-figure">
                  <div className="figure-image-wrapper">
                    <img
                      src={post.images.pgPickup.src}
                      alt={post.images.pgPickup.alt}
                      loading="lazy"
                      className="loom-blog-img"
                      width="700"
                      height="875"
                    />
                  </div>
                  <figcaption className="figure-caption">
                    <span className="caption-tag">FIG 7.0</span> {post.images.pgPickup.caption}
                  </figcaption>
                </figure>

                {/* Interactive Neighborhood Selector */}
                <div className="pg-neighborhood-box">
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '15px', color: '#071A33' }}>
                    Select Your Gurugram Neighborhood for Instant Valet Dispatch:
                  </h4>
                  <div className="pg-neighborhood-pills">
                    {Object.keys(neighborhoodData).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedNeighborhood(key)}
                        className={`pg-pill-btn pg-pill-btn--primary ${selectedNeighborhood === key ? 'active' : ''}`}
                      >
                        {neighborhoodData[key].name}
                      </button>
                    ))}
                  </div>

                  <div className="pg-neighborhood-detail">
                    <div className="pg-neighborhood-header">
                      <strong style={{ color: '#071A33', fontSize: '14.5px' }}>{currentArea.name}</strong>
                      <span style={{ background: '#E6F4EA', color: '#137333', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>
                        ⚡ {currentArea.eta}
                      </span>
                    </div>
                    <p style={{ color: '#5A6E85', fontSize: '13px', margin: '0 0 14px 0', lineHeight: 1.5 }}>
                      Covers: {currentArea.coverage}
                    </p>
                    <a
                      href={emergencyWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pg-whatsapp-cta-btn"
                    >
                      💬 Dispatch Valet to My PG via WhatsApp →
                    </a>
                  </div>
                </div>

                <div className="coverage-pills-wrap">
                  <span className="coverage-pill">📍 Sector 56 &amp; Sector 54 PGs</span>
                  <span className="coverage-pill">📍 Sector 28 &amp; Galleria Market</span>
                  <span className="coverage-pill">📍 DLF Phase 3 &amp; Cyber City</span>
                  <span className="coverage-pill">📍 Central Arcade Studio, MG Road</span>
                  <span className="coverage-pill">📍 Sushant Lok 1 &amp; Sector 43</span>
                  <span className="coverage-pill">📍 Golf Course Road Condominiums</span>
                </div>
              </section>

              {/* Festive Promo Offer Section */}
              <section className="loom-blog-section" id="festive-promo">
                <div className="section-title-wrap">
                  <span className="section-eyebrow">EXCLUSIVE PROMOTION</span>
                  <h2 className="section-title">Festive Order Boost: Free German Steam Press</h2>
                </div>
                <p>
                  To make your Kanya Pujan and Navratri festival stress-free, Loomshine is offering an exclusive festive garment care boost:
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
                    Book your first order over <strong>₹499</strong> and receive a complimentary precision German Steam Press on your highest-value festive piece (Chaniya Choli, Kurta, or Dupatta).
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

              {/* Previous / Next Episode Navigation */}
              <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', borderTop: '1px solid #E2E8F0', marginTop: '40px', flexWrap: 'wrap', gap: '16px' }}>
                <a
                  href="#/blog/dandiya-cyber-hub-saffron-silk-stain-fix"
                  style={{ textDecoration: 'none', color: '#071A33', display: 'flex', flexDirection: 'column' }}
                >
                  <span style={{ fontSize: '12px', color: '#8C6D29', fontWeight: '700', textTransform: 'uppercase' }}>← Episode 1</span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>Dandiya Night in Cyber Hub Got Messy? Saffron Silk Rescue</span>
                </a>
                <a
                  href="#/blog"
                  style={{ textDecoration: 'none', color: '#071A33', fontWeight: '700', fontSize: '13.5px', border: '1px solid #CBD5E1', padding: '8px 16px', borderRadius: '8px' }}
                >
                  All Care Guides ↗
                </a>
              </section>

            </main>

            {/* Right Sticky Sidebar */}
            <aside className="loom-blog-sidebar" aria-label="Sidebar Actions">
              {/* Emergency Pickup Card */}
              <div className="sidebar-card emergency-pickup-card">
                <div className="card-badge">30-MIN PG VALET DISPATCH</div>
                <h3 className="card-title">Kanya Pujan Tomorrow?<br />We&apos;re On It.</h3>
                <p className="card-desc">
                  Don&apos;t risk bleach or a local dhobi. Dispatch our express Gurugram doorstep valet straight to your PG gate in 30 minutes.
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
                <span className="promo-tag">FESTIVE PROMO</span>
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
                <h3 className="card-title">Loomshine Flagship Studio</h3>
                <p className="contact-address">
                  <strong>Studio Address:</strong><br />
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

export default PGWhiteEthnicRescuePost;
