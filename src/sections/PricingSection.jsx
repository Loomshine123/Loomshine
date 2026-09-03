import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import { pricingData } from '../data/pricing';
import './PricingSection.css';

export const PricingSection = () => {
  return (
    <section className="section loom-pricing-section" id="pricing">
      <Container>
        <div className="loom-pricing-header-row">
          <SectionHeading
            eyebrow="TRANSPARENT RATES"
            title="Professional care. Clear pricing."
            subtitle="No hidden fees or unexpected charges. Transparent rates for every garment."
          />
          <Button href="#book-pickup" variant="text" size="md">
            View all prices →
          </Button>
        </div>

        <div className="loom-pricing-table">
          {pricingData.categories.map((cat) => (
            <div key={cat.id} className="loom-price-row">
              <div className="loom-price-row__service">
                {cat.name.split(' per ')[0]}
              </div>
              <div className="loom-price-row__unit">
                {cat.unit}
              </div>
              <div className="loom-price-row__value">
                Starting from {cat.startingPrice}
              </div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: '16px', fontSize: '13px', color: '#7A8C9E', textAlign: 'center' }}>
          * {pricingData.note}
        </p>
      </Container>
    </section>
  );
};

export default PricingSection;
