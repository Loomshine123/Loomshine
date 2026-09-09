import Button from '../common/Button';
import './MobileMenu.css';
import { useState } from 'react';
import services from "../../data/servicesData";

export const MobileMenu = ({ isOpen, onClose, navLinks, onOpenAuth }) => {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <div
      className={`loom-mobile-overlay ${isOpen ? 'loom-mobile-overlay--open' : ''}`}
      aria-hidden={!isOpen}
    >
      <nav className="loom-mobile-nav" aria-label="Mobile navigation">
        <div className="loom-mobile-nav__item">
          <button
            type="button"
            className="loom-mobile-nav__link loom-mobile-nav__btn"
            onClick={() => setServicesOpen((s) => !s)}
            aria-expanded={servicesOpen}
          >
            <span>Services</span>
            <span className="loom-mobile-nav__icon">{servicesOpen ? '−' : '+'}</span>
          </button>

          {servicesOpen && (
            <div className="loom-mobile-submenu">
              {services.map((s) => (
                <a
                  key={s.slug}
                  href={`#/services/${s.slug}`}
                  className="loom-mobile-submenu__link"
                  onClick={onClose}
                >
                  {s.name}
                </a>
              ))}
            </div>
          )}
        </div>

        {navLinks.map((link) => (
          <div key={link.name} className="loom-mobile-nav__item">
            <a
              href={link.href}
              className="loom-mobile-nav__link"
              onClick={onClose}
            >
              <span>{link.name}</span>
              <span className="loom-mobile-nav__icon">+</span>
            </a>
          </div>
        ))}
      </nav>

      <div className="loom-mobile-actions">
        <Button
          href="#/contact"
          variant="primary"
          size="lg"
          fullWidth
          onClick={onClose}
        >
          Book a Pickup
        </Button>
        <Button
          href="#login"
          variant="dark-outline"
          size="lg"
          fullWidth
          onClick={(e) => {
            onClose();
            if (onOpenAuth) {
              e.preventDefault();
              onOpenAuth('login');
            }
          }}
        >
          Customer Login
        </Button>
      </div>
    </div>
  );
};

export default MobileMenu;

