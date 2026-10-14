# Loomshine MDX Blog System

Welcome to the Loomshine MDX blog pipeline! Just like CTS, you can now write rich, SEO-optimized blog posts in standard `.mdx` files.

## How to Add a New Blog Post (3 Steps)

### Step 1: Create a `.mdx` file in `src/content/blogs/`
Name it according to your slug, e.g.:
`src/content/blogs/how-to-wash-pashmina-shawls.mdx`

### Step 2: Add Frontmatter at the top
```yaml
---
id: "how-to-wash-pashmina-shawls"
slug: "how-to-wash-pashmina-shawls"
title: "How to Wash and Store Authentic Kashmiri Pashmina"
seoTitle: "Kashmiri Pashmina Care & Washing Guide | Loomshine Gurugram"
metaDescription: "Learn how to preserve the softness of pure cashmere and pashmina without shrinkage or moth damage."
keywords: "pashmina dry cleaning gurugram, cashmere care tips, wash wool shawl"
publishedDate: "2026-10-14"
category: "Fabric Care"
readingTime: "4 min read"
featuredImage: "/blog/pg-white-chaniya-choli-rescue/navratri-ep2-white-chaniya-choli-hero.jpg"
promoCode: "FESTIVEFRESH"
author:
  name: "Loomshine Master Fabricators"
  role: "Textile Care & Festivewear Specialists"
  location: "Central Arcade Market, MG Road, Gurugram"
---
```

### Step 3: Write Markdown and Embed Custom Components
You can write normal markdown (`#`, `##`, `*`, `**`, lists, links) and freely embed interactive Loomshine components:

```jsx
import { Callout, StepByStep, FaqAccordion, DoorstepValetCTA, GarmentTriageAdvisor, BlogImage } from '../../components/blog/MdxComponents.jsx';

# Your Heading

Your paragraph here with **bold** or *italic* text.

<Callout type="warning" title="Watch Out!">
  Never wring or twist pure pashmina fibers!
</Callout>

<StepByStep steps={[
  { title: "Lukewarm Soak", desc: "Use PH-neutral botanical wool wash." },
  { title: "Dry Flat", desc: "Roll between dry towels." }
]} />

<FaqAccordion items={[
  { q: "Can I iron pashmina?", a: "Only indirect calibrated vacuum steam." }
]} />

<DoorstepValetCTA promoCode="FESTIVEFRESH" />
```

### Automatic Features:
- ✅ **Auto-Routing**: Automatically gets a live URL at `#/blog/your-slug`
- ✅ **Auto-Listing**: Automatically listed on `#/blog` with reading time, author, and category badge
- ✅ **SEO & Schema.org**: Breadcrumbs, JSON-LD Article microdata, and meta tags are automatically generated
