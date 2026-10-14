import React, { useState } from 'react';
import './MdxComponents.css';

/**
 * Callout alert box for warnings, tips, key takeaways
 */
export const Callout = ({ type = 'info', title, children }) => {
  const icons = {
    warning: '⚠️',
    danger: '🛑',
    tip: '💡',
    info: 'ℹ️'
  };

  return (
    <div className={`loom-mdx-callout loom-mdx-callout--${type}`}>
      <span className="loom-mdx-callout__icon">{icons[type] || 'ℹ️'}</span>
      <div className="loom-mdx-callout__body">
        {title && <div className="loom-mdx-callout__title">{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
};

/**
 * Step by step interactive/formatted guide
 */
export const StepByStep = ({ steps = [] }) => {
  return (
    <div className="loom-mdx-steps">
      {steps.map((step, idx) => (
        <div key={idx} className="loom-mdx-step-card">
          <div className="loom-mdx-step-number">{idx + 1}</div>
          <div className="loom-mdx-step-content">
            <h4>{step.title}</h4>
            <p>{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Interactive FAQ Accordion for MDX articles
 */
export const FaqAccordion = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="loom-mdx-accordion">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="loom-mdx-accordion__item">
            <button
              type="button"
              className="loom-mdx-accordion__header"
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <span>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div className="loom-mdx-accordion__body">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/**
 * High-conversion Doorstep Valet Call to Action Box
 */
export const DoorstepValetCTA = ({
  title = "Need Immediate Fabric Emergency First-Aid?",
  desc = "Our certified textile specialists offer 30-minute doorstep collection across Golf Course Road, DLF Phase 1–5, Cyber City, and Sector 56.",
  promoCode = "FESTIVEFRESH",
  buttonText = "Book Doorstep Valet Pickup"
}) => {
  const emergencyWhatsAppUrl = `https://wa.me/919205366606?text=${encodeURIComponent(
    'Hi Loomshine Gurugram, I am reading your garment care guide and need urgent doorstep pickup.'
  )}`;

  return (
    <div className="loom-mdx-valet-cta">
      <span className="loom-mdx-valet-cta__eyebrow">Gurugram Emergency Valet</span>
      <h3 className="loom-mdx-valet-cta__title">{title}</h3>
      <p className="loom-mdx-valet-cta__desc">{desc}</p>
      {promoCode && (
        <div style={{ marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.85rem', color: '#EAF2F7', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Exclusive Reader Promo: <strong style={{ color: '#C5A880' }}>{promoCode}</strong> (15% Off First Pickup)
          </span>
        </div>
      )}
      <div className="loom-mdx-valet-cta__actions">
        <a href="#/book-pickup" className="loom-mdx-valet-cta__btn-primary">
          {buttonText} →
        </a>
        <a href={emergencyWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="loom-mdx-valet-cta__btn-secondary">
          💬 Instant WhatsApp Valet
        </a>
      </div>
    </div>
  );
};

/**
 * Formatted Image with Caption
 */
export const BlogImage = ({ src, alt, caption }) => {
  return (
    <figure className="loom-mdx-image-wrapper">
      <img src={src} alt={alt || caption || 'Loomshine Blog Image'} className="loom-mdx-image" loading="lazy" />
      {caption && <figcaption className="loom-mdx-caption">{caption}</figcaption>}
    </figure>
  );
};

/**
 * Interactive Garment Triage Advisor (Stain & Shrinkage First Aid)
 */
export const GarmentTriageAdvisor = () => {
  const [selectedIncident, setSelectedIncident] = useState('wash');
  const [selectedFabric, setSelectedFabric] = useState('silk');

  const adviceMatrix = {
    wash: {
      wool: {
        status: 'Reversible (High Success Rate)',
        immediateStep: 'Gently lay flat on a dry towel. DO NOT wring, hang on a wire hanger, or tumble dry.',
        solution: 'Loomshine botanical fiber relaxer soak + calibrated German vacuum steam tensioning recovers shrank knitwear to original dimensions.'
      },
      silk: {
        status: 'Restorable (Act Quickly)',
        immediateStep: 'Keep away from direct sunlight and heaters. Blot gently between two dry cotton towels.',
        solution: 'Hydrocarbon bio-rinse to re-align natural sericin proteins and dissolve water halos without fiber surface friction.'
      },
      blazer: {
        status: 'Structure Restorable',
        immediateStep: 'Do NOT iron with high domestic heat while damp. Avoid pressure over lapel canvas.',
        solution: 'Internal chest-canvas reconstruction with calibrated vacuum steam tables to recover the 3D tailored chest silhouette.'
      }
    },
    stain: {
      wool: {
        status: 'Extractable (Tannin / Oil Protocol)',
        immediateStep: 'Blot immediately with dry white tissue. Never rub with table napkins or add salt.',
        solution: 'Ultrasonic spot-suction removes wine, grease, and turmeric oils without breaking fine wool scales.'
      },
      silk: {
        status: '100% Extractable (If No Heat Applied)',
        immediateStep: 'Dab gently with a clean micro-fiber cloth. Do NOT apply water or club soda on silk.',
        solution: 'Targeted organic bio-solvent dissolution removes pigment halos without dye migration or watermark edges.'
      },
      blazer: {
        status: 'Extractable with Zero Ringing',
        immediateStep: 'Brush away loose residue gently. Avoid supermarket spot spray removers.',
        solution: 'Specialist vacuum spotting arm gently pulls stains through the garment into an exhaust filter.'
      }
    }
  };

  const currentAdvice = adviceMatrix[selectedIncident][selectedFabric];

  return (
    <div style={{
      margin: '2.5rem 0',
      background: '#F8F7F3',
      border: '1px solid #E8ECEF',
      borderRadius: '12px',
      padding: '1.75rem 1.5rem',
      boxShadow: '0 4px 20px rgba(7, 26, 51, 0.04)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '1.4rem' }}>🩺</span>
        <h4 style={{ margin: 0, fontFamily: 'var(--font-heading, serif)', fontSize: '1.5rem', color: '#071A33' }}>
          Interactive Garment Triage Advisor
        </h4>
      </div>
      <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.95rem', color: '#5A6E85' }}>
        Select your garment mishap below to see instant first-aid steps and Loomshine professional restoration protocol.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#071A33', marginBottom: '0.35rem' }}>
            What Happened?
          </label>
          <select
            value={selectedIncident}
            onChange={(e) => setSelectedIncident(e.target.value)}
            style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF' }}
          >
            <option value="wash">Accidental Machine Wash / Shrinkage</option>
            <option value="stain">Festive / Dinner Stain (Curry, Wine, Coffee)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#071A33', marginBottom: '0.35rem' }}>
            Garment Fabric
          </label>
          <select
            value={selectedFabric}
            onChange={(e) => setSelectedFabric(e.target.value)}
            style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF' }}
          >
            <option value="silk">Pure Silk / Raw Silk / Organza</option>
            <option value="wool">Wool / Cashmere / Pashmina Knitwear</option>
            <option value="blazer">Tailored Blazer / Suit Jacket</option>
          </select>
        </div>
      </div>

      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '4px', background: '#DCFCE7', color: '#166534', textTransform: 'uppercase' }}>
            {currentAdvice.status}
          </span>
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <strong style={{ color: '#991B1B', display: 'block', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
            ⚡ Immediate Home Step (First 30 Mins):
          </strong>
          <span style={{ fontSize: '0.95rem', color: '#334155' }}>{currentAdvice.immediateStep}</span>
        </div>
        <div>
          <strong style={{ color: '#071A33', display: 'block', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
            ✨ Loomshine Laboratory Protocol:
          </strong>
          <span style={{ fontSize: '0.95rem', color: '#334155' }}>{currentAdvice.solution}</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Standard MDX Component Mappings
 */
export const mdxComponents = {
  Callout,
  StepByStep,
  FaqAccordion,
  DoorstepValetCTA,
  BlogImage,
  GarmentTriageAdvisor,
  img: (props) => <BlogImage {...props} />
};

export default mdxComponents;
