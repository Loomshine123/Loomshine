import { useState } from 'react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Image from '../components/common/Image';
import { checkPincodeAvailability } from '../utils/mockApi';
import './HeroSection.css';

export const HeroSection = () => {
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [pinStatus, setPinStatus] = useState(null);

  const handlePincodeSubmit = async (e) => {
    e.preventDefault();
    if (!pincode) return;

    setLoading(true);
    const res = await checkPincodeAvailability(pincode);
    setPinStatus(res);
    setLoading(false);
  };

  return (
    <>
      <section className="loom-hero-section" id="hero">
        <Container>
          <div className="loom-hero-grid">
            <div className="loom-hero__content">
              <p className="loom-hero__eyebrow">LOOMSHINE - Professional Garment Care</p>

              <h1 className="loom-hero__headline">
                <span>Your Clothes.</span>
                <span>Our Craft.</span>
              </h1>

              <p className="loom-hero__subtext">
                Professional laundry and dry cleaning, carefully handled and delivered to your doorstep.
              </p>

              <div className="loom-hero__cta-group">
                <Button href="#/contact" variant="dark" size="lg">
                  Book a Pickup +
                </Button>
                <Button href="#/services" variant="dark-outline" size="lg">
                  Explore Services +
                </Button>
              </div>

              <form className="loom-hero-availability" onSubmit={handlePincodeSubmit}>
                <span className="loom-hero-availability__label">Check Service Availability</span>
                <Input
                  theme="dark"
                  type="text"
                  placeholder="Enter PIN Code"
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value);
                    if (pinStatus) setPinStatus(null);
                  }}
                  error={pinStatus?.error ? pinStatus.message : undefined}
                  successMessage={pinStatus?.isAvailable ? pinStatus.message : undefined}
                  helperText={pinStatus && !pinStatus.isAvailable && !pinStatus.error ? pinStatus.message : undefined}
                  actionButton={
                    <Button
                      type="submit"
                      variant="text"
                      size="sm"
                      disabled={loading || !pincode}
                    >
                      {loading ? 'Checking...' : 'Check Availability +'}
                    </Button>
                  }
                />
              </form>
            </div>

            <div className="loom-hero__media">
              <Image
                src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=90"
                alt="White pressed garments hanging in a premium laundry studio"
                aspectRatio="4-5"
              />
              <span className="loom-hero__media-label">LOOMSHINE Laundry & Dry Cleaning</span>
            </div>
          </div>
        </Container>
      </section>

      <div className="loom-hero-process-strip">
        <Container>
          <div className="loom-hero-process">
            <span>Doorstep Pickup</span>
            <span>Professional Cleaning</span>
            <span>Reliable Delivery</span>
          </div>
        </Container>
      </div>

      <div className="loom-trust-strip">
        <Container>
          <div className="loom-trust-grid">
            <div className="loom-trust-item">
              <span className="loom-trust-item__icon">+</span>
              <span>Professional Cleaning</span>
            </div>
            <div className="loom-trust-item">
              <span className="loom-trust-item__icon">+</span>
              <span>Doorstep Pickup</span>
            </div>
            <div className="loom-trust-item">
              <span className="loom-trust-item__icon">+</span>
              <span>Quality Checked</span>
            </div>
            <a href="#/track-order" className="loom-trust-item" style={{ textDecoration: 'none' }}>
              <span className="loom-trust-item__icon">+</span>
              <span>Order Tracking</span>
            </a>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HeroSection;
