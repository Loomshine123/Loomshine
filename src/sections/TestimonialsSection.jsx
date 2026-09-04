import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import { testimonialsData } from '../data/testimonials';
import './TestimonialsSection.css';

export const TestimonialsSection = () => {
  return (
    <section className="section loom-testimonials-section" id="testimonials">
      <Container>
        <SectionHeading title="TRUSTED WITH THE CLOTHES THAT MATTER." />

        <div className="loom-testimonial-grid">
          {testimonialsData.map((item) => (
            <div key={item.id} className="loom-testimonial-card">
              <span className="loom-testimonial-mark">"</span>
              <p className="loom-testimonial-quote">{item.quote}</p>
              <div>
                <div className="loom-testimonial-author">Sample Customer</div>
                <div className="loom-testimonial-title">{item.category}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
