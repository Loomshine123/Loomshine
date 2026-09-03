import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import { testimonialsData } from '../data/testimonials';
import './TestimonialsSection.css';

export const TestimonialsSection = () => {
  return (
    <section className="section loom-testimonials-section" id="testimonials">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="CLIENT TESTIMONIALS"
          title="TRUSTED WITH THE CLOTHES THAT MATTER."
          subtitle="Read sample feedback from clients who trust Loomshine for regular dry cleaning, executive shirts, and delicate heirlooms."
        />

        <div className="loom-testimonial-grid">
          {testimonialsData.map((item) => (
            <div key={item.id} className="loom-testimonial-card">
              <span className="loom-testimonial-tag">{item.category}</span>
              <p className="loom-testimonial-quote">"{item.quote}"</p>
              <div>
                <div className="loom-testimonial-author">{item.author}</div>
                <div className="loom-testimonial-title">{item.title} — {item.location}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
