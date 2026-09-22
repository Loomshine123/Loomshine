/**
 * SEO, AEO & GEO Manager Utility
 * Dynamically updates document titles, meta descriptions, canonical links, and Open Graph metadata
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
};

export const ROUTE_SEO_MAP = {
  home: {
    title: "Best Laundry & Dry Cleaning Near Me in Gurugram | Loomshine",
    description: "Top-rated organic dry cleaning & doorstep laundry service near you in Gurugram. 30-minute pickup across MG Road, DLF Phase 1–5, Golf Course Road & Cyber City.",
    keywords: "laundry near me, dry cleaning near me, laundry service Gurgaon, dry cleaners in Gurugram, best dry cleaners Gurgaon"
  },
  services: {
    title: "Organic Dry Cleaning & Laundry Services in Gurugram | Loomshine",
    description: "Explore Loomshine's garment care services: Organic Dry Cleaning, Vacuum Steam Pressing, Wash & Fold, Shoe & Leather Bag Care with doorstep pickup in Gurgaon.",
    keywords: "organic dry cleaning Gurgaon, steam press near me, shoe restoration Gurugram, leather cleaning MG Road"
  },
  pricing: {
    title: "Transparent Laundry & Dry Cleaning Rates Gurugram | Loomshine",
    description: "View itemized pricing for laundry and dry cleaning in Gurgaon. Wash & Fold at ₹79/KG, Shirts at ₹99, 2-Piece Suits at ₹349. Zero hidden charges.",
    keywords: "dry cleaning rates Gurgaon, laundry price per kg Gurugram, suit dry cleaning cost MG Road"
  },
  "book-pickup": {
    title: "Book 30-Minute Doorstep Laundry Pickup in Gurugram | Loomshine",
    description: "Schedule instant 30-minute doorstep pickup for dry cleaning and laundry across MG Road, DLF Phase 1-5 & Golf Course Road.",
    keywords: "book laundry pickup Gurgaon, online dry cleaning pickup Gurugram, 30 min doorstep valet"
  },
  about: {
    title: "About Loomshine | Premier Eco-Friendly Dry Cleaning Studio in Gurgaon",
    description: "Discover Loomshine's craft: Hydrocarbon organic solvents, anti-bacterial bio-cleaning, and luxury garment preservation based at Central Arcade Market, MG Road.",
    keywords: "about Loomshine, luxury laundry studio Gurugram, eco dry cleaner MG Road"
  },
  contact: {
    title: "Contact Loomshine Garment Care | Central Arcade Market, MG Road, Gurugram",
    description: "Get in touch with Loomshine Concierge. Visit Shop No. 262, Central Arcade Market, MG Road or call +91-7877161550 for instant support.",
    keywords: "Loomshine address, dry cleaners Central Arcade Market, contact laundry Gurgaon"
  }
};

export const applyRouteSEO = (pageName) => {
  const metaData = ROUTE_SEO_MAP[pageName] || ROUTE_SEO_MAP.home;
  updatePageSEO({
    ...metaData,
    canonicalUrl: `https://loomshinedrycleaners.com/#/${pageName === 'home' ? '' : pageName}`
  });
};

