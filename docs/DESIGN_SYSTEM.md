# Design System — Loomshine

The Loomshine design system is crafted to deliver a luxury editorial aesthetic, balancing deep dark navy structural sections with clean off-white canvas areas.

---

## 1. Color Palette

```css
:root {
  /* Brand Core Colors */
  --color-navy: #071A33;
  --color-navy-dark: #041021;
  --color-navy-light: #0D2444;
  
  --color-off-white: #F8F7F3;
  --color-white: #FFFFFF;
  --color-light-blue: #EAF2F7;
  --color-border-light: #E2E8F0;
  --color-border-dark: rgba(255, 255, 255, 0.12);
  
  /* Text Colors */
  --color-text-primary: #071A33;
  --color-text-secondary: #5A6E85;
  --color-text-muted: #8C9BAE;
  --color-text-inverse: #FFFFFF;
  --color-text-inverse-muted: #A0AEC0;

  /* Accent Colors */
  --color-accent-gold: #C5A059;
  --color-accent-gold-light: #DFBE7B;
  --color-success: #2E7D32;
  --color-error: #D32F2F;

  /* Elevation & Shadows */
  --shadow-sm: 0 2px 8px rgba(7, 26, 51, 0.04);
  --shadow-md: 0 8px 24px rgba(7, 26, 51, 0.08);
  --shadow-lg: 0 16px 40px rgba(7, 26, 51, 0.12);
  --shadow-navy: 0 20px 50px rgba(4, 16, 33, 0.3);
}
```

---

## 2. Typography

- **Display & Headline Font**: `Playfair Display` / `Cormorant Garamond` (Editorial Serif) or crisp high-contrast headings.
- **Body & Interface Font**: `Plus Jakarta Sans` / `Inter` (Modern geometric sans-serif).

```css
:root {
  --font-serif: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* Typography Scale */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-md: 1.125rem;   /* 18px */
  --font-size-lg: 1.25rem;    /* 20px */
  --font-size-xl: 1.5rem;     /* 24px */
  --font-size-2xl: 2rem;      /* 32px */
  --font-size-3xl: 2.5rem;    /* 40px */
  --font-size-4xl: 3.5rem;    /* 56px */
  --font-size-5xl: 4.5rem;    /* 72px */
}
```

---

## 3. Spacing Scale

Base multiplier unit: `8px`.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `8px` | Tight gaps, internal padding |
| `--space-2` | `16px` | Card internal padding, button padding |
| `--space-3` | `24px` | Card gaps, standard padding |
| `--space-4` | `32px` | Sub-section spacing |
| `--space-6` | `48px` | Section grid gaps |
| `--space-8` | `64px` | Medium section padding |
| `--space-10` | `80px` | Standard section vertical padding |
| `--space-12` | `96px` | Large section vertical padding |
| `--space-15` | `120px` | Hero and major dark section padding |
| `--space-20` | `160px` | Deep editorial spacing |

---

## 4. Grid & Container Layout

- **Max Container Width**: `1280px` (with `1440px` max boundary).
- **Responsive Breakpoints**:
  - `Mobile`: `<= 480px`
  - `Tablet`: `481px - 768px`
  - `Small Desktop`: `769px - 1024px`
  - `Desktop`: `1025px - 1440px`
  - `Large Desktop`: `1441px+`

---

## 5. Imagery & Card Aesthetics

- **Aspect Ratios**: 4:5 editorial vertical cards, 16:9 hero background imagery, 1:1 square detail features.
- **Card Styling**: Subtle borders (`1px solid var(--color-border-light)`), backdrop blur for overlays, high-contrast imagery with soft overlay vignettes.

---

## 6. Micro-Interactions & Transitions

- **Hover States**: Slight upward translate (`translateY(-4px)`), smooth shadow expansion (`var(--shadow-md)`), button background fill transitions.
- **Timing Function**: `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);`.
