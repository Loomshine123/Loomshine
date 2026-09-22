import React, { useEffect } from 'react';
import PickupBookingForm from '../components/booking/PickupBookingForm';
import '../styles/ContactPage.css';

export default function ContactPage({ initialService, initialItem }) {
  useEffect(() => {
    document.title = 'Book a Pickup | LOOMSHINE Luxury Garment Care';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="contact-page">
      {/* HERO SECTION */}
      <section className="contact-hero">
        <div className="contact-container">
          <p className="contact-eyebrow">LOOMSHINE PROFESSIONAL CARE</p>
          <h1>
            BOOK A<span> PICKUP.</span>
          </h1>
          <p className="contact-description">
            Schedule a convenient doorstep collection. Loomshine handles delicate dry cleaning, precision steam pressing, and premium laundry with guaranteed artisan care.
          </p>
        </div>
      </section>

      {/* FORM / CONCIERGE SECTION */}
      <section className="contact-form-section">
        <div className="contact-container contact-layout">
          {/* LEFT: INFO & BENEFITS */}
          <div className="contact-info">
            <span className="contact-section-label">DOORSTEP CONCIERGE</span>
            <h2>
              YOUR CLOTHES.
              <br />
              OUR CARE.
            </h2>
            <p>
              Fill in your details and our concierge will coordinate doorstep collection and safe handling.
            </p>

            <div className="contact-benefits">
              <div className="contact-benefit">
                <span>01</span>
                <div>
                  <h3>DOORSTEP PICKUP</h3>
                  <p>We collect your garments directly from your location with real-time GPS verification.</p>
                </div>
              </div>

              <div className="contact-benefit">
                <span>02</span>
                <div>
                  <h3>PROFESSIONAL CARE</h3>
                  <p>Every garment receives specialised bio-cleaning and fabric-customised finishing.</p>
                </div>
              </div>

              <div className="contact-benefit">
                <span>03</span>
                <div>
                  <h3>DOORSTEP DELIVERY</h3>
                  <p>Freshly cleaned, pressed, and hung or folded garments delivered back to your door.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: UNIFIED PICKUP BOOKING FORM */}
          <div className="contact-form-wrapper">
            <PickupBookingForm
              source="contact"
              initialService={initialService}
              initialItem={initialItem}
            />
          </div>
        </div>
      </section>
    </main>
  );
}