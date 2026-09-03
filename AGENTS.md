# AGENTS.md — Loomshine Frontend Engineering Guidelines

Welcome to the **Loomshine** codebase. As an engineer or automated agent working on this project, you must adhere strictly to the following guidelines and rules.

---

## 1. Core Rule

> **"Understand the existing project before modifying it."**

- Always inspect existing code, CSS tokens, assets, and component structure before implementing changes.
- Do not rewrite working code unnecessarily.
- Do not introduce unnecessary third-party dependencies (e.g., heavy UI libraries, redundant animation packages) when standard React and CSS satisfy the requirements.
- Do not invent unconfirmed business or product decisions. Use clear placeholders (e.g., `₹XX`, sample contacts) for unconfirmed client details.

---

## 2. React & Architecture Rules

1. **Framework & Stack**: React 19 + Vite + Vanilla CSS / CSS Variables.
2. **Component Separation**:
   - Reusable primitives live in `src/components/common/`.
   - Domain-specific components live under `src/components/[domain]/` (e.g., `services/`, `pricing/`, `tracking/`, `testimonials/`, `business/`, `navigation/`).
   - Page-level sections live in `src/sections/`.
   - Layout wrappers live in `src/layouts/`.
   - Page components live in `src/pages/`.
3. **Data-Driven Content**:
   - Never hardcode repeated list content inside JSX.
   - Store content in structured modules inside `src/data/` (`services.js`, `pricing.js`, `testimonials.js`, `fabrics.js`, `businessServices.js`).
4. **Backend Separation**:
   - Phase 1 focuses strictly on frontend presentation and client-side state interactions.
   - Do NOT fake production backend responses or pretend mock data is live backend data.
   - Keep data retrieval inside abstract service handlers or mock utility functions so real API endpoints can be connected later.

---

## 3. Responsive Design Rules

- **Mobile First & Responsive Quality**: Ensure flawless rendering at breakpoints: 375px, 390px, 430px, 480px, 768px, 1024px, 1280px, 1440px, 1920px.
- **No Horizontal Scroll**: Guard against unwanted overflow using `max-width: 100%` and flex/grid controls.
- **Fluid Layouts**: Use CSS Grid and Flexbox with consistent design tokens for spacing and containers.

---

## 4. Design & Aesthetics Rules

- **Brand Aesthetic**: Editorial, luxury, minimal, sophisticated, clean, spacious.
- **Primary Palette**:
  - Deep Navy: `#071A33`
  - Off-White: `#F8F7F3`
  - Pure White: `#FFFFFF`
  - Soft Blue-Grey: `#EAF2F7`
  - Dark Text: `#071A33`
  - Muted Text: `#5A6E85`
- **Typography**: Editorial display serif for headlines (`Cormorant Garamond` / high-contrast serif or `Plus Jakarta Sans`) and clean sans-serif (`Inter` / `Plus Jakarta Sans`) for body, labels, forms, and navigation.
- **Uppercase Usage**: Use uppercase primarily for eyebrow labels, badge tags, and primary section headers when visually appropriate. Avoid all-caps body text.

---

## 5. Accessibility (a11y) & SEO Rules

- **Semantic HTML**: Use proper `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<button>`, and `<a>` elements.
- **Buttons vs Links**: Do NOT use `<div>` or `<span>` for click targets. Use `<button>` for actions and `<a>` for navigation.
- **Form Controls**: Every form input must have an associated `<label>` or `aria-label`, placeholder, and error message container.
- **SEO Foundations**: Page title tags must be descriptive (e.g., `Loomshine | Premium Laundry & Dry Cleaning Services`). Include meta descriptions and structured heading hierarchies (`<h1>` -> `<h2>` -> `<h3>`).

---

## 6. Animation Rules

- Keep animations minimal, smooth, and purposeful (fade-ins, subtle transform shifts, hover elevation).
- Standard transition duration: `200ms` to `400ms` with `cubic-bezier(0.16, 1, 0.3, 1)`.
- Avoid distracting loop animations, spinning icons, or heavy parallax scrolling.

---

## 7. Development Workflow

- Follow the sequential task list in `docs/TASKS.md`.
- Inspect and verify each task locally before moving to the next.
- Test at desktop and mobile viewport sizes.
- Report task completion with details on files created, modified, functionality tested, and responsive behavior.
