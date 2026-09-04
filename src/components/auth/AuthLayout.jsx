import React from 'react';
import './AuthLayout.css';

export const AuthLayout = ({ children, onBackToHome }) => {
  return (
    <div className="loom-auth-layout">
      {/* Left Panel: Luxury Editorial Hero */}
      <div className="loom-auth-hero">
        <div className="loom-auth-hero__overlay" />
        <div className="loom-auth-hero__content">
          {/* Official LOOMSHINE Transparent Logo */}
          <div className="loom-auth-brand">
            <a href="#" onClick={(e) => { e.preventDefault(); onBackToHome?.(); }} aria-label="Return to LOOMSHINE home">
              <img
                src="/logoloom-transparent-light.png"
                alt="LOOMSHINE Dry Cleaning & Laundry"
                className="loom-auth-brand__logo"
              />
            </a>
          </div>

          <div className="loom-auth-hero__body">
            <div className="loom-auth-hero__eyebrow">
              <span className="loom-auth-hero__eyebrow-line" />
              <span>PROFESSIONAL GARMENT CARE</span>
            </div>

            <h1 className="loom-auth-hero__heading">
              YOUR CLOTHES.
              <span className="loom-auth-hero__highlight"> OUR CRAFT.</span>
            </h1>

            <p className="loom-auth-hero__description">
              Sign in to book a pickup, follow every stage of your order and keep your wardrobe in the hands of people who treat fabric with respect.
            </p>
          </div>

          {/* Bottom Features */}
          <div className="loom-auth-hero__footer">
            <div className="loom-auth-feature-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" rx="2" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <span>DOORSTEP PICKUP</span>
            </div>
            <div className="loom-auth-feature-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v3m0 12v3M3 12h3m12 0h3m-3.5-6.5l-2 2m-7 7l-2 2m0-11l2 2m7 7l2 2" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              <span>PROFESSIONAL CLEANING</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Form Panel */}
      <div className="loom-auth-panel">
        <header className="loom-auth-panel__header">
          <button
            type="button"
            className="loom-auth-back-btn"
            onClick={onBackToHome}
            aria-label="Back to website"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to website</span>
          </button>
        </header>

        <main className="loom-auth-panel__main">
          {children}
        </main>

        <footer className="loom-auth-panel__footer">
          <p>© 2026 LOOMSHINE CLEANING</p>
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;
