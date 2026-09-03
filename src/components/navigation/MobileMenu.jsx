import Button from '../common/Button';
import './MobileMenu.css';

export const MobileMenu = ({ isOpen, onClose, navLinks }) => {
  return (
    <div className={`loom-mobile-overlay ${isOpen ? 'loom-mobile-overlay--open' : ''}`}>
      <nav className="loom-mobile-nav">
        {navLinks.map((link) => (
          <div key={link.name} className="loom-mobile-nav__item">
            <a
              href={link.href}
              className="loom-mobile-nav__link"
              onClick={onClose}
            >
              <span>{link.name}</span>
              <span style={{ fontSize: '18px', color: '#C5A059' }}>→</span>
            </a>
          </div>
        ))}
      </nav>

      <div className="loom-mobile-actions">
        <Button href="#book-pickup" variant="dark" size="lg" fullWidth onClick={onClose}>
          Book a Pickup →
        </Button>
        <Button href="#login" variant="dark-outline" size="lg" fullWidth onClick={onClose}>
          Customer Login
        </Button>
      </div>
    </div>
  );
};

export default MobileMenu;
