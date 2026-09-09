import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Image from '../components/common/Image';
import laundryServiceImage from '../assets/laundry-service-clean.jpg';
import './BrandPromiseSection.css';

const PILLARS = [
  {
    title: 'Fabric-first care',
    desc: 'Each garment is treated according to its fibre and finish.'
  },
  {
    title: 'Doorstep convenience',
    desc: 'Pickup and delivery on a schedule that suits you.'
  },
  {
    title: 'Quality control',
    desc: 'Every order is checked before it leaves our facility.'
  },
  {
    title: 'Transparent service',
    desc: 'Clear pricing and honest updates at every stage.'
  }
];

export const BrandPromiseSection = () => {
  return (
    <section className="section loom-promise-section" id="about">
      <Container>
        <div className="loom-promise-grid">
          {/* Left Photograph */}
          <div className="loom-promise__media">
            <Image
              src={laundryServiceImage}
              alt="Professional laundry care and doorstep handling"
              aspectRatio="4-5"
              hoverZoom
            />
          </div>

          {/* Right Content */}
          <div>
            {/* Official LOOMSHINE Logo - mid-page brand centrepiece */}
            <div style={{ marginBottom: '24px' }}>
              <img
                src="/logoloom.png"
                alt="LOOMSHINE Dry Cleaning & Laundry"
                style={{ height: '70px', width: 'auto', display: 'block', objectFit: 'contain', mixBlendMode: 'multiply' }}
              />
            </div>

            <SectionHeading
              eyebrow="THE LOOMSHINE PROMISE"
              title="WE DON'T JUST CLEAN CLOTHES. WE CARE FOR THEM."
              subtitle="Every garment deserves the right process, the right attention and the right finish."
            />

            <div className="loom-promise-features">
              {PILLARS.map((pillar) => (
                <div key={pillar.title} className="loom-feature-item">
                  <h4 className="loom-feature-item__title">{pillar.title}</h4>
                  <p className="loom-feature-item__desc">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BrandPromiseSection;
