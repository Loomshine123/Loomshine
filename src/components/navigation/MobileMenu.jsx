import { useState } from 'react';
import Button from '../common/Button';
import { useCart } from '../../context/CartContext';
import services from "../../data/servicesData";
import './MobileMenu.css';

export const MobileMenu = ({ isOpen, onClose, navLinks, onNavigate }) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const { totalItems } = useCart();

  const handleAction = (e, href) => {
    if (e && e.preventDefault) e.preventDefault();
    onClose();
    if (onNavigate) {
      onNavigate(href);
    } else {
      window.location.hash = href;
      window.scrollTo(0, 0);
    }
  };

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
                  onClick={(e) => handleAction(e, `#/services/${s.slug}`)}
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
              onClick={(e) => handleAction(e, link.href)}
            >
              <span>{link.name}</span>
              <span style={{ fontSize: '18px', color: '#C5A059' }}>+</span>
            </a>
          </div>
        ))}
      </nav>

      <div className="loom-mobile-actions">
        <Button
          href="#/contact"
          variant="dark"
          size="lg"
          fullWidth
          onClick={(e) => handleAction(e, '#/contact')}
        >
          Book a Pickup
        </Button>
        <Button
          href="#/cart"
          variant="dark-outline"
          size="lg"
          fullWidth
          onClick={(e) => handleAction(e, '#/cart')}
        >
          View Garment Bag {totalItems > 0 ? `(${totalItems})` : ''}
        </Button>
      </div>
    </div>
  );
};

export default MobileMenu;
