import Container from '../components/common/Container';
import Button from '../components/common/Button';
import './FinalCTASection.css';

export const FinalCTASection = () => {
  return (
    <section className="section loom-cta-section" id="book-pickup">
      <Container>
        <div className="loom-cta-box">
          <h2 className="loom-cta-headline">
            Your laundry. Our responsibility.
          </h2>
          <p className="loom-cta-subtext">
            Book your pickup and let Loomshine take care of the rest.
          </p>

          <div className="loom-cta-buttons">
            <Button href="#book-pickup" variant="dark" size="lg">
              Book a Pickup →
            </Button>
            <Button href="#/services" variant="dark-outline" size="lg">
              View Services →
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FinalCTASection;
