# Component Architecture — Loomshine

```
src/
├── assets/                  # Centralized visual assets and vector graphics
│   └── images/
├── components/
│   ├── common/              # Reusable core primitives
│   │   ├── Button.jsx
│   │   ├── Container.jsx
│   │   ├── SectionHeading.jsx
│   │   ├── Eyebrow.jsx
│   │   ├── Image.jsx
│   │   └── Input.jsx
│   ├── navigation/          # Header, Mobile Menu & Footer
│   │   ├── Header.jsx
│   │   ├── MobileMenu.jsx
│   │   └── Footer.jsx
│   ├── services/            # Service cards & grid
│   │   ├── ServiceCard.jsx
│   │   └── ServiceGrid.jsx
│   ├── process/             # Timeline & process steps
│   │   ├── ProcessStep.jsx
│   │   └── ProcessTimeline.jsx
│   ├── pricing/             # Pricing table & row items
│   │   ├── PricingRow.jsx
│   │   └── PricingTable.jsx
│   ├── tracking/            # Tracking form & visual timeline
│   │   ├── TrackingForm.jsx
│   │   ├── TrackingTimeline.jsx
│   │   └── TrackingStatus.jsx
│   ├── testimonials/        # Client reviews & cards
│   │   ├── TestimonialCard.jsx
│   │   └── TestimonialGrid.jsx
│   └── business/            # B2B service grid & cards
│       ├── BusinessServiceCard.jsx
│       └── BusinessServiceGrid.jsx
├── sections/                # Top-level page sections for Homepage
│   ├── HeroSection.jsx
│   ├── ServiceIntroSection.jsx
│   ├── ServicesSection.jsx
│   ├── HowItWorksSection.jsx
│   ├── BrandPromiseSection.jsx
│   ├── FabricCareSection.jsx
│   ├── PricingSection.jsx
│   ├── OrderTrackingSection.jsx
│   ├── TestimonialsSection.jsx
│   ├── BusinessServicesSection.jsx
│   └── FinalCTASection.jsx
├── layouts/                 # Page wrappers
│   └── MainLayout.jsx
├── pages/                   # Route views
│   ├── Home.jsx
│   ├── Services.jsx
│   ├── HowItWorks.jsx
│   ├── Pricing.jsx
│   ├── About.jsx
│   ├── Business.jsx
│   ├── TrackOrder.jsx
│   ├── Contact.jsx
│   ├── Login.jsx
│   └── BookPickup.jsx
├── data/                    # Data sources (Separated content layer)
│   ├── services.js
│   ├── pricing.js
│   ├── testimonials.js
│   ├── fabrics.js
│   └── businessServices.js
├── hooks/                   # Custom React hooks (e.g. usePincodeCheck, useOrderTracker)
├── utils/                   # Helpers, formatters, validator functions
└── index.css                # Master CSS design system tokens and reset
```

---

## Component Guidelines
1. **Component Purity**: Components must receive data via props rather than importing raw datasets inside low-level primitives.
2. **Prop Validation & Fallbacks**: Components should gracefully handle empty or loading prop states without throwing runtime errors.
3. **Accessibility Attributes**: Interactive elements must include appropriate `aria-label`, `role`, and keyboard handler bindings.
