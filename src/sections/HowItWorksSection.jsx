import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import './HowItWorksSection.css';

const STEPS = [
  {
    num: '01',
    title: 'Book',
    desc: 'Choose your service and pickup time.'
  },
  {
    num: '02',
    title: 'Pickup',
    desc: 'We collect your clothes from your doorstep.'
  },
  {
    num: '03',
    title: 'Clean',
    desc: 'Our professionals clean each garment appropriately.'
  },
  {
    num: '04',
    title: 'Deliver',
    desc: 'Fresh garments return to your doorstep.'
  }
];

export const HowItWorksSection = () => {
  return (
    <section className="section loom-how-section" id="how-it-works">
      <Container>
        <SectionHeading
          theme="dark"
          eyebrow="HOW IT WORKS"
          title="FROM YOUR DOORSTEP TO READY-TO-WEAR."
        />

        <div className="loom-how-grid">
          {STEPS.map((step) => (
            <div key={step.num} className="loom-step-card">
              <span className="loom-step-card__num">{step.num}</span>
              <h3 className="loom-step-card__title">{step.title}</h3>
              <p className="loom-step-card__desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorksSection;
