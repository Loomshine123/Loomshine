import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import './BusinessServicesSection.css';

const INDUSTRIES = [
  'Hotels',
  'Salons',
  'Corporate Offices',
  'Restaurants',
  'Spas',
  'Hospitality'
];

export const BusinessServicesSection = () => {
  return (
    <section className="section loom-b2b-section" id="business">
      <Container>
        <div className="loom-b2b-grid">
          {/* Left Content */}
          <div>
            <SectionHeading
              eyebrow="COMMERCIAL SOLUTIONS"
              title="Professional garment care for your business."
              subtitle="Reliable, high-capacity laundry and dry cleaning tailored to hotels, salons, fine dining, and corporate client standards."
            />
            <Button href="#contact" variant="primary" size="lg">
              Explore business services →
            </Button>
          </div>

          {/* Right Plain Text List */}
          <div className="loom-b2b-list">
            {INDUSTRIES.map((industry) => (
              <div key={industry} className="loom-b2b-item">
                <span style={{ color: '#C5A059', fontSize: '14px' }}>◆</span>
                <span>{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BusinessServicesSection;
