import Button from '../common/Button';
import './MobileMenu.css';

export const MobileMenu = ({ isOpen, onClose, navLinks, onOpenAuth }) => {
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
              <span style={{ fontSize: '18px', color: '#C5A059' }}>+</span>
            </a>
          </div>
        ))}
      </nav>

      <div className="loom-mobile-actions">
        <Button
          href="#signup"
          variant="dark"
          size="lg"
          fullWidth
          onClick={(e) => {
            onClose();
            if (onOpenAuth) {
              e.preventDefault();
              onOpenAuth('signup');
            }
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
