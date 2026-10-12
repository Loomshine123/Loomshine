/**
 * SEO, AEO & GEO Manager Utility
 * Dynamically updates document titles, meta descriptions, canonical links, Open Graph metadata,
 * and JSON-LD structured schemas for search and AI answer engines.
 */

export const updatePageSEO = ({
  title,
  description,
  canonicalUrl = 'https://loomshinedrycleaners.com/',
  keywords,
  ogImage = 'https://loomshinedrycleaners.com/logoloom.png'
}) => {
  if (typeof document === 'undefined') return;

  // Update Page Title
  if (title) {
    document.title = title;

    // Update OG & Twitter Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);
  }

  // Update Meta Description
  if (description) {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', description);
  }

  // Update Keywords
  if (keywords) {
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.setAttribute('content', keywords);
  }

  // Update Canonical Link
  const canonicalTag = document.querySelector('link[rel="canonical"]');
  if (canonicalTag && canonicalUrl) {
    canonicalTag.setAttribute('href', canonicalUrl);
  }

  // Update OG & Twitter Image
  if (ogImage) {
    const ogImgTag = document.querySelector('meta[property="og:image"]');
    if (ogImgTag) ogImgTag.setAttribute('content', ogImage);
    const twImgTag = document.querySelector('meta[name="twitter:image"]');
    if (twImgTag) twImgTag.setAttribute('content', ogImage);
  }
};

export const ROUTE_SEO_MAP = {
  home: {
    title: "Best Laundry & Dry Cleaning Near Me in Gurugram | Loomshine",
    description: "Top-rated organic dry cleaning & doorstep laundry service near you in Gurugram. 30-minute pickup across MG Road, DLF Phase 1–5, Golf Course Road & Cyber City.",
    keywords: "laundry near me, dry cleaning near me, laundry service Gurgaon, dry cleaners in Gurugram, best dry cleaners Gurgaon",
    ogImage: "https://loomshinedrycleaners.com/logoloom.png"
  },
  services: {
    title: "Organic Dry Cleaning & Laundry Services in Gurugram | Loomshine",
    description: "Explore Loomshine's garment care services: Organic Dry Cleaning, Vacuum Steam Pressing, Wash & Fold, Shoe & Leather Bag Care with doorstep pickup in Gurgaon.",
    keywords: "organic dry cleaning Gurgaon, steam press near me, shoe restoration Gurugram, leather cleaning MG Road",
    ogImage: "https://loomshinedrycleaners.com/logoloom.png"
  },
  pricing: {
    title: "Transparent Laundry & Dry Cleaning Rates Gurugram | Loomshine",
    description: "View itemized pricing for laundry and dry cleaning in Gurgaon. Wash & Fold at ₹79/KG, Shirts at ₹99, 2-Piece Suits at ₹349. Zero hidden charges.",
    keywords: "dry cleaning rates Gurgaon, laundry price per kg Gurugram, suit dry cleaning cost MG Road",
    ogImage: "https://loomshinedrycleaners.com/logoloom.png"
  },
  "book-pickup": {
    title: "Book 30-Minute Doorstep Laundry Pickup in Gurugram | Loomshine",
    description: "Schedule instant 30-minute doorstep pickup for dry cleaning and laundry across MG Road, DLF Phase 1-5 & Golf Course Road.",
    keywords: "book laundry pickup Gurgaon, online dry cleaning pickup Gurugram, 30 min doorstep valet",
    ogImage: "https://loomshinedrycleaners.com/logoloom.png"
  },
  about: {
    title: "About Loomshine | Premier Eco-Friendly Dry Cleaning Studio in Gurgaon",
    description: "Discover Loomshine's craft: Hydrocarbon organic solvents, anti-bacterial bio-cleaning, and luxury garment preservation based at Central Arcade Market, MG Road.",
    keywords: "about Loomshine, luxury laundry studio Gurugram, eco dry cleaner MG Road",
    ogImage: "https://loomshinedrycleaners.com/logoloom.png"
  },
  contact: {
    title: "Contact Loomshine Garment Care | Central Arcade Market, MG Road, Gurugram",
    description: "Get in touch with Loomshine Concierge. Visit Shop No. 262, Central Arcade Market, MG Road or call +918877286066 for instant support.",
    keywords: "Loomshine address, dry cleaners Central Arcade Market, contact laundry Gurgaon",
    ogImage: "https://loomshinedrycleaners.com/logoloom.png"
  },
  blog: {
    title: "Fabric Intelligence & Garment Care Guides | Loomshine Gurugram",
    description: "Read expert garment care guides, emergency stain first-aid, and organic dry cleaning insights from Loomshine textile care specialists in Gurugram.",
    keywords: "dry cleaning blog Gurgaon, garment care guides, silk stain removal, wool shrinkage fix Gurugram",
    ogImage: "https://loomshinedrycleaners.com/blog/dry-clean-only-guide/damage-checklist.jpg"
  },
  "is-dry-clean-only-outfit-ruined-how-to-save-it": {
    title: 'Is Your "Dry Clean Only" Outfit Truly Ruined? (And How to Save It) | Loomshine Gurugram',
    description: "Pulled silk, wool, or a designer lehenga out of the wash? Spilled wine in Cyber City? Don't panic: 90% of dry-clean-only garments can be saved within 30 minutes with our Gurugram emergency rescue guide.",
    keywords: "is dry clean only ruined, save shrunk wool blazer, wine stain on silk dress Cyber City, accidentally washed dry clean only lehenga, dry cleaning near me Gurugram, Loomshine dry cleaners MG Road, emergency dry cleaning Golf Course Road DLF, organic hydrocarbon dry cleaning Gurgaon",
    ogImage: "https://loomshinedrycleaners.com/blog/dry-clean-only-guide/damage-checklist.jpg"
  },
  "dandiya-cyber-hub-saffron-silk-stain-fix": {
    title: "How to Save a Stained Saffron Silk Kurta After Cyber Hub Dandiya Night | Loomshine Gurugram",
    description: "Marigold mocktail and sweat disaster on your saffron silk kurta at DLF Cyber Hub garba? Don't rub or bucket wash! Discover Loomshine's 100% PERC-free bio-cleaning, spot extraction & 30-min Gurugram valet pickup.",
    keywords: "silk dry cleaning Gurugram, mocktail stain on silk kurta, dandiya night outfit stain Cyber Hub, sweat stains raw silk Chanderi, PERC free dry cleaners MG Road, dry cleaning pickup DLF Cyber City, Central Arcade Market laundry, luxury festivewear dry cleaner Gurgaon, save stained saffron kurta, German steam press Gurgaon",
    ogImage: "https://loomshinedrycleaners.com/blog/cyber-hub-saffron-silk/dandiya-cyber-hub-saffron-silk-hero.jpg"
  }
};

/**
 * Inject dynamic JSON-LD Structured Data Schema for Blog & Emergency Rescue Guides
 */
export const injectBlogSchema = (slug = 'is-dry-clean-only-outfit-ruined-how-to-save-it') => {
  if (typeof document === 'undefined') return;

  let scriptEl = document.getElementById('loom-blog-ld-json');
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'loom-blog-ld-json';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  if (slug === 'dandiya-cyber-hub-saffron-silk-stain-fix') {
    const silkPostSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "@id": "https://loomshinedrycleaners.com/#/blog/dandiya-cyber-hub-saffron-silk-stain-fix#article",
          "headline": "Dandiya Night in Cyber Hub Got Messy? How to Fix a Saffron Silk Outfit After a Sweat & Mocktail Disaster",
          "alternativeHeadline": "Emergency Festive Garment First-Aid: Saving Raw Silk & Chanderi from Stains and Harsh PERC Cleaners in Gurugram",
          "description": "Marigold mocktail and sweat disaster on your saffron silk kurta at DLF Cyber Hub garba? Don't rub or bucket wash! Discover Loomshine's 100% PERC-free bio-cleaning, spot extraction & 30-min Gurugram valet pickup.",
          "image": [
            "https://loomshinedrycleaners.com/blog/cyber-hub-saffron-silk/dandiya-cyber-hub-saffron-silk-hero.jpg",
            "https://loomshinedrycleaners.com/blog/cyber-hub-saffron-silk/one-horizon-to-cyber-hub-garba-incident.jpg",
            "https://loomshinedrycleaners.com/blog/cyber-hub-saffron-silk/dont-rub-silk-stain-warning.jpg",
            "https://loomshinedrycleaners.com/blog/cyber-hub-saffron-silk/delicate-silk-care-label-inspection.jpg",
            "https://loomshinedrycleaners.com/blog/cyber-hub-saffron-silk/perc-free-festivewear-cleaning.jpg",
            "https://loomshinedrycleaners.com/blog/cyber-hub-saffron-silk/spot-care-controlled-steam-finishing.jpg",
            "https://loomshinedrycleaners.com/blog/cyber-hub-saffron-silk/gurugram-30min-doorstep-valet-pickup.jpg",
            "https://loomshinedrycleaners.com/blog/cyber-hub-saffron-silk/festivefresh-promo-offer.jpg"
          ],
          "datePublished": "2026-10-12T09:00:00+05:30",
          "dateModified": "2026-10-12T09:00:00+05:30",
          "author": {
            "@type": "Organization",
            "name": "Loomshine Master Fabricators",
            "url": "https://loomshinedrycleaners.com/"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Loomshine Luxury Garment Care",
            "logo": {
              "@type": "ImageObject",
              "url": "https://loomshinedrycleaners.com/logoloom.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://loomshinedrycleaners.com/#/blog/dandiya-cyber-hub-saffron-silk-stain-fix"
          },
          "keywords": "silk dry cleaning Gurugram, mocktail stain on silk kurta, dandiya night outfit stain Cyber Hub, sweat stains raw silk, PERC free dry cleaners MG Road, Central Arcade Market laundry",
          "articleSection": "Festivewear Restoration",
          "inLanguage": "en-IN"
        },
        {
          "@type": "HowTo",
          "@id": "https://loomshinedrycleaners.com/#/blog/dandiya-cyber-hub-saffron-silk-stain-fix#howto",
          "name": "How to Save a Saffron Silk Kurta from Mocktail and Sweat Stains After Dandiya Night",
          "description": "Critical emergency steps to rescue pure raw silk or Chanderi festive garments without dye bleeding or fiber abrasions.",
          "totalTime": "PT30M",
          "step": [
            {
              "@type": "HowToStep",
              "position": 1,
              "name": "Blot Gently with a Dry White Tissue",
              "text": "Never rub or scrub the stain. Friction abrades delicate silk filaments (fibrillation) and leaves permanent fuzzy white rings. Simply dab to absorb excess mocktail liquid."
            },
            {
              "@type": "HowToStep",
              "position": 2,
              "name": "Keep Away from Tap Water and Home Detergents",
              "text": "Raw silk fibers swell when saturated with water, causing vibrant saffron, turmeric, and orange dyes to bleed instantly. Avoid bucket washing or baby wipes."
            },
            {
              "@type": "HowToStep",
              "position": 3,
              "name": "Reject Conventional PERC Dry Cleaners",
              "text": "Avoid neighborhood cleaners that use harsh Perchloroethylene (PERC), which melts embroidery adhesive, yellows saffron colors, and strips silk proteins."
            },
            {
              "@type": "HowToStep",
              "position": 4,
              "name": "Book Loomshine 30-Minute Doorstep Express Valet",
              "text": "Schedule doorstep pickup from Cyber City, Golf Course Road, DLF Phase 1–5, or MG Road for 100% PERC-free hydrocarbon bio-cleaning and German steam finishing."
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://loomshinedrycleaners.com/#/blog/dandiya-cyber-hub-saffron-silk-stain-fix#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How do I remove a sticky mocktail or fruit drink stain from a silk kurta?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Immediately blot the spill with a clean, dry white tissue to absorb excess liquid. NEVER rub the fabric or use a wet wipe, as water causes raw silk fibers to swell and dyes to bleed. Send it for professional hydrocarbon bio-solvent extraction."
              }
            },
            {
              "@type": "Question",
              "name": "Why does sweat combined with mocktail stains damage saffron and orange silk?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Perspiration contains acidic salts and urea that weaken delicate sericin proteins in silk. When mixed with acidic sugars from marigold mocktails, it chemically destabilizes natural saffron pigments, causing permanent discoloration if not bio-neutralized."
              }
            },
            {
              "@type": "Question",
              "name": "What is the danger of taking festive silk wear to local neighborhood dry cleaners?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most traditional neighborhood cleaners use Perchloroethylene (PERC)—a harsh industrial solvent that strips natural silk proteins, dissolves embroidery adhesives, and yellows bright festive colors over time."
              }
            },
            {
              "@type": "Question",
              "name": "How does Loomshine clean delicate silk without water or harsh chemicals?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Loomshine uses 100% PERC-free hydrocarbon bio-solvents with targeted spot extraction and zero-contact German vacuum steam finishing, ensuring vibrant color retention and a crisp boutique drape."
              }
            },
            {
              "@type": "Question",
              "name": "How quickly can Loomshine pick up garments across Cyber Hub, Golf Course Road, and DLF?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Loomshine provides an express 30-minute doorstep valet across Cyber City, DLF Phase 1–5, One Horizon Center, Golf Course Road, and Sector 56. Contact +91 9205366606 to schedule."
              }
            }
          ]
        },
        {
          "@type": "DryCleaningOrLaundromat",
          "@id": "https://loomshinedrycleaners.com/#store",
          "name": "Loomshine Dry Cleaners & Garment Care Studio",
          "image": "https://loomshinedrycleaners.com/logoloom.png",
          "telephone": "+919205366606",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Shop No. 262, First Floor, Central Arcade Market, MG Road",
            "addressLocality": "Gurugram",
            "addressRegion": "Haryana",
            "postalCode": "122002",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "28.4815",
            "longitude": "77.0863"
          },
          "openingHours": "Mo-Su 09:00-21:00",
          "priceRange": "₹₹"
        }
      ]
    };
    scriptEl.textContent = JSON.stringify(silkPostSchema, null, 2);
    return;
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": "https://loomshinedrycleaners.com/#/blog/is-dry-clean-only-outfit-ruined-how-to-save-it#article",
        "headline": "Is Your 'Dry Clean Only' Outfit Truly Ruined? (And How to Save It)",
        "alternativeHeadline": "The 30-Minute Garment Emergency Rescue Guide for Shrunk Wool, Limp Blazers, and Cyber City Wine Stains",
        "description": "In 90% of cases, an accidentally washed or stained dry-clean-only outfit is not ruined. Follow the 3-second damage checklist, avoid 2 critical mistakes, and use Gurugram's 30-minute express organic pickup.",
        "image": [
          "https://loomshinedrycleaners.com/blog/dry-clean-only-guide/damage-checklist.jpg",
          "https://loomshinedrycleaners.com/blog/dry-clean-only-guide/mistake-1-rubbing-wet-napkin.jpg",
          "https://loomshinedrycleaners.com/blog/dry-clean-only-guide/mistake-2-ironing-damp-spot.jpg",
          "https://loomshinedrycleaners.com/blog/dry-clean-only-guide/gurugram-30min-express-pickup.jpg",
          "https://loomshinedrycleaners.com/blog/dry-clean-only-guide/save-your-favorite-garment-cta.jpg"
        ],
        "datePublished": "2026-10-06T09:00:00+05:30",
        "dateModified": "2026-10-06T09:00:00+05:30",
        "author": {
          "@type": "Organization",
          "name": "Loomshine Master Fabricators",
          "url": "https://loomshinedrycleaners.com/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Loomshine Luxury Garment Care",
          "logo": {
            "@type": "ImageObject",
            "url": "https://loomshinedrycleaners.com/logoloom.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://loomshinedrycleaners.com/#/blog/is-dry-clean-only-outfit-ruined-how-to-save-it"
        },
        "keywords": "dry cleaning emergency, save shrunk wool, wine stain silk Cyber City, organic dry cleaner Gurugram",
        "articleSection": "Garment Emergency Care"
      },
      {
        "@type": "HowTo",
        "@id": "https://loomshinedrycleaners.com/#/blog/is-dry-clean-only-outfit-ruined-how-to-save-it#howto",
        "name": "How to Save an Accidentally Washed or Stained 'Dry Clean Only' Garment",
        "description": "Critical first-aid steps to take in the first 30 minutes when a dry-clean-only garment is washed or stained.",
        "totalTime": "PT30M",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Assess Damage with the 3-Second Checklist",
            "text": "Identify whether the garment is shrunk (wool/cashmere cuticles contracted), limp (chest canvas structure lost), or stained (wine/oil/food on silk or wool)."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Avoid Mistake #1: Never Rub with a Wet Napkin",
            "text": "Blot gently with a clean dry tissue. Friction from rubbing crushes silk and wool fibers, leaving permanent fuzzy white patches."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Avoid Mistake #2: Never Iron Over the Damp Spot",
            "text": "Keep heat sources away. Direct domestic iron heat permanently bakes wine, oil, and food stains into the core of the thread fibers."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Schedule 30-Minute Express Doorstep Valet Pickup",
            "text": "Contact Loomshine Gurugram via website or WhatsApp (+91 9205366606) for organic hydrocarbon bio-solvent extraction and German steam reshaping."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://loomshinedrycleaners.com/#/blog/is-dry-clean-only-outfit-ruined-how-to-save-it#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is a 'Dry Clean Only' garment ruined forever if I washed it at home?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In 90% of cases, no. Natural fibers constrict in water, and jacket canvases collapse, but professional botanical fiber relaxers and calibrated German vacuum steam tensioning can fully restore the garment to its original silhouette."
            }
          },
          {
            "@type": "Question",
            "name": "What should I do if I spill wine or gravy on silk at dinner in Cyber City?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Do not rub with a wet restaurant napkin. Gently blot with a dry napkin to absorb excess liquid. Do not apply heat, and request Loomshine's 30-minute doorstep valet across Cyber City, DLF, or Golf Course Road for bio-solvent extraction."
            }
          },
          {
            "@type": "Question",
            "name": "Why does rubbing a stain with a wet cloth ruin silk or wool?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Rubbing causes microscopic fiber fibrillation, physically abrading the natural yarn cuticles. This leaves permanent chalky white patches that cannot be removed by subsequent cleaning."
            }
          },
          {
            "@type": "Question",
            "name": "Why is ironing over a damp stain so dangerous?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Direct iron heat polymerizes oils and tannins and coagulates proteins directly into the core fibers, setting the stain permanently."
            }
          },
          {
            "@type": "Question",
            "name": "Where can I get emergency organic dry cleaning in Gurugram?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Loomshine provides 30-minute express doorstep pickup across Golf Course Road, DLF Phase 1–5, Cyber City, and Sohna Road. Flagship studio: Shop No. 262, First Floor, Central Arcade Market, MG Road, Gurugram. Helpline: +91 9205366606 / +91 8877286066."
            }
          }
        ]
      }
    ]
  };

  scriptEl.textContent = JSON.stringify(blogSchema, null, 2);
};

export const applyRouteSEO = (pageName, slug) => {
  if (pageName === 'blogDetail' || (slug && ROUTE_SEO_MAP[slug])) {
    const currentSlug = slug || 'dandiya-cyber-hub-saffron-silk-stain-fix';
    const metaData = ROUTE_SEO_MAP[currentSlug] || ROUTE_SEO_MAP['is-dry-clean-only-outfit-ruined-how-to-save-it'];
    updatePageSEO({
      ...metaData,
      canonicalUrl: `https://loomshinedrycleaners.com/#/blog/${currentSlug}`
    });
    injectBlogSchema(currentSlug);
    return;
  }

  // Remove article schema if navigating to other pages
  const scriptEl = document.getElementById('loom-blog-ld-json');
  if (scriptEl) {
    scriptEl.remove();
  }

  const metaData = ROUTE_SEO_MAP[pageName] || ROUTE_SEO_MAP.home;
  updatePageSEO({
    ...metaData,
    canonicalUrl: `https://loomshinedrycleaners.com/#/${pageName === 'home' ? '' : pageName}`
  });
};
