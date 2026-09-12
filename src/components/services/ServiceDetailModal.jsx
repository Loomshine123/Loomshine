import { useEffect } from "react";
import "./ServiceDetailModal.css";

export default function ServiceDetailModal({ service, isOpen, onClose }) {
  // Close on Escape key & lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  const handleBookNow = () => {
    onClose();
    window.location.hash = service?.slug ? `#/contact?service=${service.slug}` : "#/contact";
  };

  const handleViewPricing = () => {
    onClose();
    window.location.hash = "#/pricing";
  };

  return (
    <div className="service-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="service-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* CLOSE BUTTON */}
        <button
          type="button"
          className="service-modal-close-btn"
          onClick={onClose}
          aria-label="Close service details"
        >
          ✕
        </button>

        <div className="service-modal-layout">
          {/* LEFT: PICTURE */}
          <div className="service-modal-media">
            <span className="service-modal-number-badge">{service.id}</span>
            <img
              src={service.image}
              alt={service.title}
              className="service-modal-img"
            />
            {service.priceStarting && (
              <div className="service-modal-price-tag">
                <span>ESTIMATE</span>
                <strong>{service.priceStarting}</strong>
              </div>
            )}
          </div>

          {/* RIGHT: DETAILS & DESCRIPTION */}
          <div className="service-modal-content">
            <div className="service-modal-eyebrow">
              <span>{service.id}</span>
              <span className="eyebrow-separator">•</span>
              <span>LOOMSHINE SPECIALTY CARE</span>
            </div>

            <h2 className="service-modal-title">{service.title}</h2>
            {service.tagline && <p className="service-modal-tagline">{service.tagline}</p>}

            <div className="service-modal-divider" />

            {/* MAIN DESCRIPTION */}
            <div className="service-modal-desc-box">
              <h4 className="service-modal-section-title">ABOUT THIS SERVICE</h4>
              <p className="service-modal-long-desc">
                {service.longDescription || service.description}
              </p>
            </div>

            {/* SUITABLE FOR & TURNAROUND */}
            <div className="service-modal-meta-grid">
              {service.suitableFor && (
                <div className="service-modal-meta-item">
                  <span className="meta-item-label">BEST SUITED FOR</span>
                  <p className="meta-item-val">{service.suitableFor}</p>
                </div>
              )}

              {service.turnaround && (
                <div className="service-modal-meta-item">
                  <span className="meta-item-label">ESTIMATED TURNAROUND</span>
                  <p className="meta-item-val">{service.turnaround}</p>
                </div>
              )}
            </div>

            {/* WHAT'S INCLUDED / KEY HIGHLIGHTS */}
            {service.features && service.features.length > 0 && (
              <div className="service-modal-features">
                <h4 className="service-modal-section-title">WHAT'S INCLUDED</h4>
                <ul className="service-modal-features-list">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="service-modal-feature-item">
                      <span className="feature-check-icon">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="service-modal-actions">
              <button
                type="button"
                className="service-modal-primary-btn"
                onClick={handleBookNow}
              >
                <span>Book Pickup For This Service</span>
                <span>→</span>
              </button>

              <button
                type="button"
                className="service-modal-secondary-btn"
                onClick={handleViewPricing}
              >
                <span>View Price List</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
