import { useState } from 'react';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { trackOrderById } from '../utils/mockApi';
import './OrderTrackingSection.css';

const DEFAULT_STEPS = [
  { label: 'Picked Up', date: 'Sep 01, 10:30 AM', completed: true },
  { label: 'Cleaning', date: 'Sep 02, 02:15 PM', completed: true },
  { label: 'Quality Check', date: 'Sep 03, 11:00 AM', active: true },
  { label: 'Out for Delivery', date: 'Est. Sep 04', completed: false },
  { label: 'Delivered', date: 'Est. Sep 04', completed: false }
];

export const OrderTrackingSection = () => {
  const [orderIdInput, setOrderIdInput] = useState('TL-1001');
  const [loading, setLoading] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const result = await trackOrderById(orderIdInput);
    if (result.found) {
      setTrackedOrder(result.order);
    } else {
      setErrorMsg(result.error);
    }
    setLoading(false);
  };

  const stepsToRender = trackedOrder ? trackedOrder.steps : DEFAULT_STEPS;

  return (
    <section className="section loom-track-section" id="track-order">
      <Container>
        <div className="loom-track-grid">
          {/* Left Form */}
          <div>
            <SectionHeading
              theme="dark"
              eyebrow="ORDER TRACKING"
              title="KNOW WHERE YOUR ORDER IS."
              subtitle="Enter your Order ID to view real-time garment status from pickup to final delivery."
            />

            <div className="loom-track-form-box">
              <form onSubmit={handleTrackSubmit}>
                <Input
                  theme="dark"
                  label="Order ID"
                  placeholder="TL-000000"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  error={errorMsg}
                  actionButton={
                    <Button type="submit" variant="dark" size="sm" disabled={loading}>
                      {loading ? 'Searching...' : 'Track →'}
                    </Button>
                  }
                />
              </form>
              <p style={{ marginTop: '12px', fontSize: '12px', color: '#8395A7' }}>
                Enter an order ID to see live status. Example status shown on the right (Try "TL-1001" or "TL-1002").
              </p>
            </div>
          </div>

          {/* Right Stepper Timeline */}
          <div>
            <div style={{ marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '12px' }}>
              <span style={{ fontSize: '12px', color: '#C5A059', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                LIVE GARMENT TIMELINE — {trackedOrder ? trackedOrder.orderId : 'TL-1001 (DEMO)'}
              </span>
              {trackedOrder && (
                <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: '20px', color: '#FFF', marginTop: '4px' }}>
                  {trackedOrder.service} ({trackedOrder.itemCount} items)
                </h4>
              )}
            </div>

            <div className="loom-stepper">
              {stepsToRender.map((step, idx) => {
                const isCompleted = step.completed;
                const isActive = step.active;

                return (
                  <div
                    key={step.label}
                    className={`loom-stepper-item ${isCompleted ? 'loom-stepper-item--completed' : ''} ${isActive ? 'loom-stepper-item--active' : ''}`}
                  >
                    <div className="loom-stepper-circle">
                      {isCompleted ? '✓' : idx + 1}
                    </div>
                    <div>
                      <div className="loom-stepper-label">{step.label}</div>
                      <div className="loom-stepper-date">{step.date}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OrderTrackingSection;
