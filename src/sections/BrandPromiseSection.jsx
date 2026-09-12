import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Image from '../components/common/Image';
import Button from '../components/common/Button';
import laundryServiceImage from '../assets/laundry-service-clean.jpg';
import './BrandPromiseSection.css';

const PILLARS = [
  {
    tag: 'VIP TREATMENT & PRECISION',
    title: 'Expert Garment Care',
    desc: "Our specialists don't just wash; they revive. We understand exact fabric needs, ensuring your expensive office wear and delicate couture are handled with 100% precision and care."
  },
  {
    tag: 'ECO-FRIENDLY & HYGIENIC',
    title: 'Advanced Cleaning Process',
    desc: 'Say goodbye to tough stains. We use eco-friendly, premium detergents and modern machines to deliver hygienically clean, odor-free, and perfectly pressed clothes every single time.'
  },
  {
    tag: 'SPEED & RELIABILITY',
    title: 'Convenient Doorstep Service',
    desc: 'Why step out? Schedule a pickup in 30 seconds. Our valet reaches your Gurugram address in exactly 30 minutes, and we deliver your fresh clothes back the very same day.'
  }
];

export const BrandPromiseSection = () => {
  return (
    <section className="section loom-promise-section" id="brand-promise">
      <Container>
        <div className="loom-promise-grid">
          {/* Left Photograph */}
          <div className="loom-promise__media">
            <Image
              src={laundryServiceImage}
              alt="Professional laundry care and doorstep handling in Gurgaon"
              aspectRatio="4-5"
              hoverZoom
            />
          </div>

          {/* Right Content */}
          <div>
            {/* Official LOOMSHINE Logo - mid-page brand centrepiece */}
            <div style={{ marginBottom: '20px' }}>
              <img
                src="/logoloom.png"
                alt="LOOMSHINE Dry Cleaning & Laundry"
                style={{ height: '65px', width: 'auto', display: 'block', objectFit: 'contain', mixBlendMode: 'multiply' }}
              />
            </div>

            <SectionHeading
              eyebrow="ABOUT LOOMSHINE • GURUGRAM"
              title="PROFESSIONAL LAUNDRY CARE, DELIVERED TO YOUR DOOR."
              subtitle="Experience the Best Laundry Service in Gurgaon. Delivered to Your Door."
            />

            <p className="loom-promise-lead">
              At <strong>LOOMSHINE</strong>, we turn your laundry day into free time. As Gurugram’s most trusted experts, we simplify your routine with our premium dry cleaning and quick wash laundry service. From our 30-minute instant pickup to same-day delivery, your garments get the VIP treatment they deserve.
            </p>

            <div className="loom-promise-features">
              {PILLARS.map((pillar) => (
                <div key={pillar.title} className="loom-feature-item">
                  <span className="loom-feature-item__tag">{pillar.tag}</span>
                  <h4 className="loom-feature-item__title">{pillar.title}</h4>
                  <p className="loom-feature-item__desc">{pillar.desc}</p>
                </div>
              ))}
            </div>

            <div className="loom-promise-actions">
              <Button href="#/contact" variant="primary" size="md">
                Book 30-Min Pickup +
              </Button>
              <Button href="#/about" variant="dark-outline" size="md">
                Read Full Story & About Us →
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BrandPromiseSection;
