import Container from '../common/Container';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="loom-footer">
      <Container>
        {/* Top Branding Row */}
        <div className="loom-footer-top">
          <a href="#" className="loom-footer-brand" aria-label="LOOMSHINE Home">
            <img
              src="/logoloom.png"
              alt="LOOMSHINE Dry Cleaning & Laundry"
              className="loom-footer-brand__logo"
            />
          </a>
          <p style={{ maxWidth: '400px', fontSize: '14px', color: '#5A6E85' }}>
            Professional garment care with doorstep pickup and delivery.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="loom-footer-grid">
          {/* Col 1: Services */}
          <div>
            <h4 className="loom-footer-col__title">Services</h4>
            <ul className="loom-footer-col__list">
              <li><a href="#services" className="loom-footer-col__link">Laundry</a></li>
              <li><a href="#services" className="loom-footer-col__link">Dry Cleaning</a></li>
              <li><a href="#services" className="loom-footer-col__link">Pressing & Finish</a></li>
              <li><a href="#services" className="loom-footer-col__link">Shoe & Bag Care</a></li>
            </ul>
          </div>

          {/* Col 2: Company */}
          <div>
            <h4 className="loom-footer-col__title">Company</h4>
            <ul className="loom-footer-col__list">
              <li><a href="#about" className="loom-footer-col__link">About Us</a></li>
              <li><a href="#how-it-works" className="loom-footer-col__link">How It Works</a></li>
              <li><a href="#/pricing" className="loom-footer-col__link">Pricing Rates</a></li>
              <li><a href="#business" className="loom-footer-col__link">Business B2B</a></li>
              <li><a href="#/contact" className="loom-footer-col__link">Contact</a></li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div>
            <h4 className="loom-footer-col__title">Support</h4>
            <ul className="loom-footer-col__list">
              <li><a href="#faqs" className="loom-footer-col__link">FAQs</a></li>
              <li><a href="#/track-order" className="loom-footer-col__link">Track Order</a></li>
              <li><a href="#fabrics" className="loom-footer-col__link">Care Guide</a></li>
              <li><a href="#help" className="loom-footer-col__link">Help Center</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & HQ */}
          <div>
            <h4 className="loom-footer-col__title">Contact & HQ</h4>
            <ul className="loom-footer-col__list">
              <li style={{ color: '#4A5D73', fontSize: '13px', lineHeight: '1.45' }}>
                4th Floor, BPTP Centra One, Sector 61, Golf Course Ext. Road, Gurugram, Haryana 122102, India
              </li>
              <li style={{ color: '#4A5D73', fontSize: '13px', marginTop: '4px' }}>Phone: +91 00000 00000</li>
              <li style={{ color: '#4A5D73', fontSize: '13px' }}>Email: hello@loomshine.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="loom-footer-bottom">
          <div>
            Copyright 2026 LOOMSHINE Dry Cleaning & Laundry. All rights reserved.
          </div>
          <div className="loom-footer-legal-links">
            <a href="#privacy" className="loom-footer-col__link">Privacy Policy</a>
            <a href="#terms" className="loom-footer-col__link">Terms & Conditions</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
