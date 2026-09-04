import { useState } from 'react';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { trackOrderById } from '../utils/mockApi';
import './OrderTrackingSection.css';

const DEFAULT_STEPS = ['Picked Up', 'Cleaning', 'Quality Check', 'Out For Delivery', 'Delivered'];

export const OrderTrackingSection = () => {
  const [orderIdInput, setOrderIdInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const result = await trackOrderById(orderIdInput || 'TL-1001');
    if (result.found) {
      setTrackedOrder(result.order);
    } else {
      setErrorMsg(result.error);
    }
    setLoading(false);
  };

  const stepsToRender = trackedOrder ? trackedOrder.steps.map((step) => step.label) : DEFAULT_STEPS;

  return (
    <section className="section loom-track-section" id="track-order">
      <Container>
        <div className="loom-track-grid">
          <div>
            <SectionHeading
              theme="dark"
              eyebrow="ORDER TRACKING"
              title="KNOW WHERE YOUR ORDER IS."
            />

            <form onSubmit={handleTrackSubmit} className="loom-track-form-box">
              <Input
                theme="dark"
                label="Order ID"
                placeholder="TL-000000"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                error={errorMsg}
                actionButton={
                  <Button type="submit" variant="text" size="sm" disabled={loading}>
                    {loading ? 'Searching...' : 'Track +'}
                  </Button>
                }
              />
            </form>
          </div>

          <div className="loom-track-list">
            {stepsToRender.map((step, idx) => (
              <div key={step} className="loom-track-row">
                <span>{idx + 1}</span>
                <strong>{step}</strong>
                <em>-</em>
              </div>
            ))}
            <p>Enter an order ID to see live status. Example status shown above.</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OrderTrackingSection;
