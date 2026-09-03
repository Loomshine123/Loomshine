import { useState } from 'react';
import Container from '../components/common/Container';
import Eyebrow from '../components/common/Eyebrow';
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
            {/* Left Content */}
            <div className="loom-hero__content">
              <Eyebrow variant="gold">
                THE LOOM — PROFESSIONAL GARMENT CARE
              </Eyebrow>

              <h1 className="loom-hero__headline">
                <span className="loom-hero__headline-white">YOUR CLOTHES.</span>
                <span className="loom-hero__headline-blue">OUR CRAFT.</span>
              </h1>

              <p className="loom-hero__subtext">
                Professional laundry and dry cleaning, carefully handled and delivered to your doorstep.
              </p>

              <div className="loom-hero__cta-group">
                <Button href="#book-pickup" variant="primary" size="lg">
                  Book a Pickup →
                </Button>
                <Button href="#services" variant="dark-outline" size="lg">
                  Explore Services →
                </Button>
              </div>

              {/* Floating Service Availability Checker Card */}
              <div className="loom-hero-floating-card">
                <div className="loom-hero-floating-card__title">
                  <span style={{ color: '#1E68D7' }}>📍</span>
                  <span>CHECK SERVICE AVAILABILITY</span>
                </div>
                <form onSubmit={handlePincodeSubmit}>
                  <Input
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
                        variant="primary"
                        size="sm"
                        disabled={loading || !pincode}
                      >
                        {loading ? 'Checking...' : 'Check Availability →'}
                      </Button>
                    }
                  />
                </form>
              </div>
            </div>

            {/* Right Photography */}
            <div className="loom-hero__media">
              <Image
                src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80"
                alt="Hung pressed garments on rail"
                aspectRatio="4-5"
                overlay
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Badges Strip */}
      <div className="loom-trust-strip">
        <Container>
          <div className="loom-trust-grid">
            <div className="loom-trust-item">
              <span className="loom-trust-item__icon">✦</span>
              <span>Professional Cleaning</span>
            </div>
            <div className="loom-trust-item">
              <span className="loom-trust-item__icon">🚚</span>
              <span>Doorstep Pickup</span>
            </div>
            <div className="loom-trust-item">
              <span className="loom-trust-item__icon">✓</span>
              <span>Quality Checked</span>
            </div>
            <div className="loom-trust-item">
              <span className="loom-trust-item__icon">📍</span>
              <span>Order Tracking</span>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HeroSection;
