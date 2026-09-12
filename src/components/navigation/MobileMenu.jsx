import Button from '../common/Button';
import './MobileMenu.css';
import { useState } from 'react';
import services from "../../data/servicesData";

export const MobileMenu = ({ isOpen, onClose, navLinks, onOpenAuth }) => {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <div className={`loom-mobile-overlay ${isOpen ? 'loom-mobile-overlay--open' : ''}`}>
      <nav className="loom-mobile-nav">
        <div className="loom-mobile-nav__item">
          <button
            className="loom-mobile-nav__link"
            onClick={() => setServicesOpen((s) => !s)}
            aria-expanded={servicesOpen}
          >
            <span>Services</span>
            <span style={{ fontSize: '18px', color: '#C5A059' }}>{servicesOpen ? '−' : '+'}</span>
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
              <span style={{ fontSize: '18px', color: '#C5A059' }}>+</span>
            </a>
          </div>
        ))}
      </nav>

      <div className="loom-mobile-actions">
        <Button
          href="#book-pickup"
          variant="dark"
          size="lg"
          fullWidth
          onClick={() => {
            onClose();
            window.location.hash = '#book-pickup';
          }}
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
