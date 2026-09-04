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
          <SectionHeading title="Professional care. Clear pricing." />
          <Button href="#book-pickup" variant="text" size="md">
            View all prices +
          </Button>
        </div>

        <div className="loom-pricing-table">
          {pricingData.categories.map((cat) => (
            <div key={cat.id} className="loom-price-row">
              <div className="loom-price-row__service">{cat.name}</div>
              <div className="loom-price-row__unit">{cat.unit}</div>
              <div className="loom-price-row__value">Starting from {cat.startingPrice}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PricingSection;
