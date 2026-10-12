# Clean URL Routing Migration Plan (SEO, AEO & GEO Optimization)

**Document Date:** October 12, 2026  
**Status:** Scheduled for Implementation  
**Project:** Loomshine Web Application (`loomshinedrycleaners.com`)  
**Target:** Eliminate `?#/` and `/#/` hash routing in favor of clean HTML5 Path Routing (`/blog/...`, `/services/...`) for maximum Google Search, AI Overviews (AEO), and Local Gurugram GEO indexing.

---

## 1. Executive Summary & Why This Matters

Currently, URLs on Loomshine use hash fragments:
- **Current URL:** `https://www.loomshinedrycleaners.com/?#/blog/dandiya-cyber-hub-saffron-silk-stain-fix`
- **Target Clean URL:** `https://www.loomshinedrycleaners.com/blog/dandiya-cyber-hub-saffron-silk-stain-fix`

### Why Hash Routing Hurts Rankings
1. **Googlebot Indexing:** By RFC specification, fragments (`#`) are client-side only. Google officially recommends against hash routing because crawlers treat them as page anchors rather than distinct indexable articles.
2. **AEO (AI Answer Engine Optimization):** Scrapers from Perplexity, ChatGPT, Claude, and Apple Intelligence use fast HTTP GET fetchers without running JavaScript runtimes. When they hit `/#/`, they drop the hash and only read the homepage.
3. **Local GEO Search (Map Pack & Citations):** Google Business Profile and local directory listings require canonical, clean URLs to associate authority with specific geographic and service pages.
4. **Social Sharing Stability:** Messy query-hash combos (`?#/`) frequently break or drop query params when shared over WhatsApp, Twitter, or LinkedIn.

---

## 2. Technical Architecture & Migration Steps

### Step 1: Server-Side SPA Fallback Rewrite (Hosting)
To ensure refreshing a deep URL like `/blog/dandiya-cyber-hub-saffron-silk-stain-fix` serves `index.html` (200 OK) instead of a 404:

- **If hosted on Vercel:** Create `vercel.json`:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
- **If hosted on Netlify / Cloudflare Pages:** Create `public/_redirects`:
  ```text
  /*    /index.html   200
  ```
- **If hosted on Apache / cPanel:** Create `public/.htaccess`:
  ```apache
  <IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
  </IfModule>
  ```
- **If hosted on Nginx:**
  ```nginx
  location / {
    try_files $uri $uri/ /index.html;
  }
  ```

---

### Step 2: Refactor Router in `src/App.jsx`

Replace `getRouteFromHash` with `getRouteFromPath(pathname, hash)` using the standard HTML5 History API (`window.location.pathname` and `window.history.pushState`):

1. **Path Mapping:**
   - `/` -> Home page
   - `/blog` -> Blog listing page
   - `/blog/:slug` -> Blog detail page (e.g. `/blog/dandiya-cyber-hub-saffron-silk-stain-fix`)
   - `/services` -> Services catalogue
   - `/services/:slug` -> Service detail page
   - `/pricing` -> Itemized pricing rate card
   - `/book-pickup` -> 30-min express valet booking
   - `/track-order` -> Live order tracking
   - `/contact` & `/about` -> Contact and About pages

2. **In-Page Anchor Handling:**
   - Preserve smooth scrolling for homepage anchor links: `/how-it-works`, `/testimonials`, `/fabric-care`, `/business`.

3. **Legacy Hash Auto-Redirect (Zero Broken Links):**
   - Add a fallback check on initialization:
     ```javascript
     if (window.location.hash.startsWith('#/')) {
       const cleanPath = window.location.hash.replace(/^#/, '');
       window.history.replaceState(null, '', cleanPath);
     }
     ```
   - This ensures existing bookmarks, old Google indexes, and WhatsApp shared links automatically redirect seamlessly to the clean path.

---

### Step 3: Update Navigation Links & Internal References

Audit and update internal links across:
- `src/components/navigation/Header.jsx` (`href="#/services"` -> `href="/services"`)
- `src/components/navigation/Footer.jsx` (`href="#/blog"` -> `href="/blog"`)
- `src/pages/BlogListingPage.jsx` (`#/blog/${slug}` -> `/blog/${slug}`)
- `src/components/blog/CyberHubSilkRescuePost.jsx` (breadcrumbs and related service links)

---

### Step 4: Update Canonical URLs & Dynamic SEO Schema

In `src/utils/seo.js`:
- Strip `/#/` from all canonical URLs:
  - `https://loomshinedrycleaners.com/blog/dandiya-cyber-hub-saffron-silk-stain-fix`
  - `https://loomshinedrycleaners.com/blog/is-dry-clean-only-outfit-ruined-how-to-save-it`
  - `https://loomshinedrycleaners.com/services/dry-cleaning`
- Update JSON-LD structured schemas (`@id`, `mainEntityOfPage`) to clean path strings.

---

### Step 5: Generate XML Sitemap & `robots.txt`

1. Create `public/sitemap.xml`:
   - List all clean priority URLs, changefreq, and priority tags.
2. Create `public/robots.txt`:
   - Reference `Sitemap: https://www.loomshinedrycleaners.com/sitemap.xml`.

---

## 3. Verification & Testing Checklist

- [ ] Direct page refresh on `/blog/dandiya-cyber-hub-saffron-silk-stain-fix` returns 200 without 404.
- [ ] Browser Back and Forward buttons navigate history properly (`popstate` listener).
- [ ] Clicking in-page anchors (`#how-it-works`, `#book-pickup`) smoothly scrolls without unexpected route transitions.
- [ ] Legacy hash URLs (`/#/blog/...` or `?#/blog/...`) automatically convert to clean paths without reload.
- [ ] Inspect `<head>` to confirm `<link rel="canonical">` and Open Graph `og:url` render clean URLs.
- [ ] Run `npm run build` to confirm zero build regressions.
