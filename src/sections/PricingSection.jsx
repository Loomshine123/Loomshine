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
          <Button href="#/pricing" variant="text" size="md">
            View all prices +
          </Button>
        </div>

        <div className="loom-pricing-table">
          {pricingData.categories.map((cat) => (
            <a
              key={cat.id}
              href={`#/pricing?service=${cat.serviceSlug || 'dry-cleaning'}`}
              className="loom-price-row"
            >
              <div className="loom-price-row__service">{cat.name}</div>
              <div className="loom-price-row__unit">{cat.unit}</div>
              <div className="loom-price-row__value">Starting from {cat.startingPrice}</div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PricingSection;
