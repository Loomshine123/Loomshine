import { useState, useEffect } from 'react';
import Container from '../common/Container';
import Button from '../common/Button';
import MobileMenu from './MobileMenu';
import ServiceDropdown from './ServiceDropdown';
import { useCart } from '../../context/CartContext';
import './Header.css';

const NAV_LINKS = [
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Pricing', href: '#/pricing' },
  { name: 'About', href: '#/about' },
  { name: 'Business', href: '#business' },
  { name: 'Track Order', href: '#/track-order' }
];

export const Header = ({ currentPage, currentSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    } else {
      window.location.hash = href;
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('#home');
    } else {
      window.location.hash = '#home';
    }
  };

  return (
    <>
      <header className={`loom-header ${isScrolled ? 'loom-header--scrolled' : ''} ${mobileOpen ? 'loom-header--mobile-open' : ''}`}>

        <Container fluid>
          <div className="loom-header__nav-container">
            {/* Official LOOMSHINE Logo */}
            <a
              href="#home"
              className="loom-brand"
              aria-label="LOOMSHINE Home"
              onClick={handleLogoClick}
            >
              <img
                src="/logoloom.png"
                alt="LOOMSHINE Dry Cleaning & Laundry"
                className="loom-brand__logo"
              />
            </a>

            {/* Desktop Navigation */}
            <nav aria-label="Primary navigation">
              <ul className="loom-nav-list">
                <li>
                  <a
                    href="#home"
                    className={`loom-nav-link ${currentPage === 'home' && !currentSection ? 'loom-nav-link--active' : ''}`}
                    onClick={(e) => handleNavClick(e, '#home')}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <ServiceDropdown />
                </li>
                {NAV_LINKS.map((link) => {
                  const isLinkActive =
                    (currentPage === 'track-order' &&
                      (link.href === '#/track-order' || link.href === '#track-order')) ||
                    (currentPage === 'pricing' && link.href === '#/pricing') ||
                    (currentPage === 'about' && (link.href === '#/about' || link.href === '#about')) ||
                    (currentPage === 'home' && currentSection === 'how-it-works' && link.href.includes('how-it-works')) ||
                    (currentPage === 'home' && currentSection === 'business' && link.href.includes('business'));
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className={`loom-nav-link ${isLinkActive ? 'loom-nav-link--active' : ''}`}
                        onClick={(e) => handleNavClick(e, link.href)}
                      >
                        {link.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Header Right Actions */}
            <div className="loom-header__actions">
              {/* Bag / Cart Link */}
              <a
                href="#/cart"
                className={`loom-header__cart-link ${currentPage === 'cart' ? 'loom-header__cart-link--active' : ''}`}
                onClick={(e) => handleNavClick(e, '#/cart')}
                aria-label={`Garment bag, ${totalItems} items`}
                title="View Garment Bag"
              >
                <svg className="loom-cart-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span className="loom-cart-label">BAG</span>
                {totalItems > 0 && (
                  <span className="loom-cart-badge">{totalItems}</span>
                )}
              </a>

              <Button
                href="#/contact"
                variant="primary"
                size="sm"
                onClick={(e) => handleNavClick(e, '#/contact')}
              >
                Book a Pickup
              </Button>

              <button
                type="button"
                className={`loom-hamburger ${mobileOpen ? 'loom-hamburger--active' : ''}`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                <span className="loom-hamburger__line" />
                <span className="loom-hamburger__line" />
                <span className="loom-hamburger__line" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={NAV_LINKS}
        onNavigate={onNavigate}
      />
    </>
  );
};

export default Header;
