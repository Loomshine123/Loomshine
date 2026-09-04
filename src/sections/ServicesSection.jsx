import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import ServiceCard from '../components/services/ServiceCard';
import { servicesData } from '../data/services';
import './ServicesSection.css';

export const ServicesSection = () => {
  return (
    <section className="section loom-services-section" id="services">
      <Container>
        <div className="loom-services-header-split">
          <SectionHeading
            title="Care for every kind of clothing."
          />
          <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: 'var(--space-8)' }}>
            From everyday essentials to delicate garments, every item receives the care it deserves.
          </p>
        </div>

        <div className="loom-services-grid">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              number={service.id}
              title={service.title}
              description={service.description}
              image={service.image}
              priceStarting={service.priceStarting}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ServicesSection;
