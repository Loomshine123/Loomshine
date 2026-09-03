import { useState, useEffect } from 'react';
import Container from '../common/Container';
import Button from '../common/Button';
import MobileMenu from './MobileMenu';
import './Header.css';

const NAV_LINKS = [
  { name: 'Services', href: '#services' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'About', href: '#about' },
  { name: 'Business', href: '#business' },
  { name: 'Track Order', href: '#track-order' }
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`loom-header ${isScrolled ? 'loom-header--scrolled' : ''}`}>
        <Container>
          <div className="loom-header__nav-container">
            {/* Exact Unaltered Original Logo (Dark Navy + Gold) */}
            <a href="#" className="loom-brand" aria-label="Loomshine Home">
              <img
                src="/loomshine-logo-dark.png"
                alt="LoomShine Dry Cleaning & Laundry Logo"
                className="loom-brand__img"
              />
            </a>

            {/* Desktop Navigation */}
            <nav aria-label="Primary navigation">
              <ul className="loom-nav-list">
                {NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="loom-nav-link">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Header Right Actions */}
            <div className="loom-header__actions">
              <a href="#login" className="loom-header__login-link">
                Login
              </a>
              <Button href="#book-pickup" variant="primary" size="sm">
                Book a Pickup →
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
      />
    </>
  );
};

export default Header;
