import { useState, useEffect } from 'react';
import Container from '../common/Container';
import Button from '../common/Button';
import MobileMenu from './MobileMenu';
import ServiceDropdown from './ServiceDropdown';
import './Header.css';

const NAV_LINKS = [
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'About', href: '#about' },
  { name: 'Business', href: '#business' },
  { name: 'Track Order', href: '#track-order' }
];

export const Header = ({ onOpenAuth, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    if (href === '#home') {
      if (currentPage !== 'home') {
        e.preventDefault();
        window.location.hash = 'home';
      }
    } else if (currentPage === 'track-order' && href !== '#track-order') {
      e.preventDefault();
      window.location.hash = href;
    }
  };

  const handleLogoClick = (e) => {
    if (currentPage !== 'home') {
      e.preventDefault();
      window.location.hash = 'home';
    }
  };

  return (
    <>
      <header className={`loom-header ${isScrolled ? 'loom-header--scrolled' : ''}`}>
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
                    className={`loom-nav-link ${currentPage === 'home' ? 'loom-nav-link--active' : ''}`}
                    onClick={(e) => handleNavClick(e, '#home')}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <ServiceDropdown />
                </li>
                {NAV_LINKS.map((link) => {
                  const isTrackActive = currentPage === 'track-order' && link.href === '#track-order';
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className={`loom-nav-link ${isTrackActive ? 'loom-nav-link--active' : ''}`}
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
              <a
                href="#login"
                className="loom-header__login-link"
                onClick={(e) => {
                  if (onOpenAuth) {
                    e.preventDefault();
                    onOpenAuth('login');
                  }
                }}
              >
                Login
              </a>
              <Button
                href="#signup"
                variant="primary"
                size="sm"
                onClick={(e) => {
                  if (onOpenAuth) {
                    e.preventDefault();
                    onOpenAuth('signup');
                  }
                }}
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
        onOpenAuth={onOpenAuth}
      />
    </>
  );
};

export default Header;
