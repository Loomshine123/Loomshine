import { useState, useEffect } from 'react';
import Container from '../components/common/Container';
import { trackOrderById } from '../utils/mockApi';
import './TrackOrderPage.css';

// SVG Icons for Timeline Steps
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ActiveCheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const TruckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const STEP_ICONS = {
  '01': <CheckIcon />,
  '02': <CheckIcon />,
  '03': <ActiveCheckIcon />,
  '04': <TruckIcon />,
  '05': <HomeIcon />
};

export const TrackOrderPage = ({ initialOrderId = 'TL-482917' }) => {
  const [orderInput, setOrderInput] = useState(initialOrderId);
  const [loading, setLoading] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const fetchOrder = async (idToSearch) => {
    setLoading(true);
    setErrorMsg('');
    const res = await trackOrderById(idToSearch);
    if (res.found) {
      setTrackedOrder(res.order);
    } else {
      setTrackedOrder(null);
      setErrorMsg(res.error || 'Order not found.');
    }
    setLoading(false);
  };

  useEffect(() => {
    // Check URL parameters or initial ID
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id') || initialOrderId;
    if (idFromUrl) {
      setOrderInput(idFromUrl);
      fetchOrder(idFromUrl);
    }
  }, [initialOrderId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderInput.trim()) return;
    fetchOrder(orderInput.trim());

    // Update URL hash state without full page refresh
    const cleanId = orderInput.trim().toUpperCase();
    if (window.history.pushState) {
      const newUrl = `${window.location.pathname}#track-order?id=${cleanId}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
    }
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}${window.location.pathname}#track-order?id=${orderInput}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="track-page">
      {/* Dark Navy Hero Section */}
      <section className="track-hero" id="track-order">
        <Container>
          <div className="track-hero__grid">
            <div className="track-hero__content">
              <h1 className="track-hero__title">
                KNOW WHERE YOUR ORDER IS.
              </h1>
              <p className="track-hero__desc">
                From doorstep pickup to ready-to-wear delivery — follow every stage of your garment's care in real time.
              </p>

              <form onSubmit={handleSubmit} className="track-search">
                <label htmlFor="track-order-input" className="track-search__label">
                  ORDER ID
                </label>
                <div className="track-search__input-wrapper">
                  <input
                    id="track-order-input"
                    type="text"
                    className={`track-search__input ${errorMsg ? 'track-search__input--error' : ''}`}
                    placeholder="TL-482917"
                    value={orderInput}
                    onChange={(e) => {
                      setOrderInput(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    aria-label="Order ID input"
                  />
                  <button
                    type="submit"
                    className="track-search__btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>SEARCHING...</span>
                    ) : (
                      <>
                        <span>TRACK</span>
                        <ArrowRightIcon />
                      </>
                    )}
                  </button>
                </div>

                {errorMsg && (
                  <div className="track-search__error-box">
                    <p>{errorMsg}</p>
                    <div className="track-search__quick-suggestions">
                      <span>Try sample: </span>
                      <button
                        type="button"
                        onClick={() => {
                          setOrderInput('TL-482917');
                          fetchOrder('TL-482917');
                        }}
                      >
                        TL-482917
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div className="track-hero__image-container">
              <div className="track-hero__image-frame">
                <img
                  src="/folded-shirts-hero.png"
                  alt="Neatly pressed folded luxury garments stack"
                  className="track-hero__image"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Live Status & Timeline Section */}
      <section className="track-live-section">
        <Container>
          {trackedOrder ? (
            <div className="track-live__grid">
              {/* Left Column: Live Status Header & Summary Card */}
              <div className="track-live__info">
                <span className="track-live__eyebrow">LIVE STATUS</span>
                <h2 className="track-live__heading">
                  YOUR CLOTHES. OUR CRAFT.
                </h2>
                <p className="track-live__subtext">
                  Every order is checked against its care plan before moving to the next stage. Updates appear here the moment they happen.
                </p>

                {/* Order Summary Card */}
                <div className="track-summary-card">
                  <h3 className="track-summary-card__title">ORDER SUMMARY</h3>

                  <dl className="track-summary-list">
                    <div className="track-summary-row">
                      <dt>Order</dt>
                      <dd className="track-summary-val--bold">{trackedOrder.orderId}</dd>
                    </div>
                    <div className="track-summary-row">
                      <dt>Service</dt>
                      <dd>{trackedOrder.service}</dd>
                    </div>
                    <div className="track-summary-row">
                      <dt>Items</dt>
                      <dd className="track-summary-val--bold">{trackedOrder.itemCount}</dd>
                    </div>
                    <div className="track-summary-row">
                      <dt>Pickup</dt>
                      <dd>{trackedOrder.pickupDate}</dd>
                    </div>
                    <div className="track-summary-row">
                      <dt>Address</dt>
                      <dd className="track-summary-val--bold">{trackedOrder.address}</dd>
                    </div>
                  </dl>

                  <div className="track-summary-est">
                    <span className="track-summary-est__label">ESTIMATED DELIVERY</span>
                    <span className="track-summary-est__val">{trackedOrder.estimatedDelivery}</span>
                  </div>

                  <div className="track-summary-actions">
                    <button
                      type="button"
                      className="track-btn-secondary"
                      onClick={handleCopyLink}
                    >
                      {copied ? 'Link Copied!' : 'Share Order Status'}
                    </button>
                    <a
                      href="https://wa.me/919999999999?text=Hi%20Loomshine,%20I%20have%20a%20question%20regarding%20my%20order%20"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="track-btn-secondary track-btn-secondary--help"
                    >
                      Need Support?
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: 5-Step Stepper Timeline */}
              <div className="track-timeline">
                <div className="track-timeline__line" />

                {trackedOrder.steps.map((step, index) => {
                  const isCompleted = step.status === 'completed' || index < trackedOrder.currentStepIndex;
                  const isActive = step.status === 'active' || index === trackedOrder.currentStepIndex;
                  const isPending = !isCompleted && !isActive;

                  let nodeClass = 'track-step__node--pending';
                  if (isCompleted) nodeClass = 'track-step__node--completed';
                  if (isActive) nodeClass = 'track-step__node--active';

                  return (
                    <div
                      key={step.code || index}
                      className={`track-step ${isActive ? 'track-step--active' : ''} ${isCompleted ? 'track-step--completed' : ''}`}
                    >
                      <div className={`track-step__node ${nodeClass}`}>
                        {isCompleted && <CheckIcon />}
                        {isActive && <ActiveCheckIcon />}
                        {isPending && (STEP_ICONS[step.code] || <HomeIcon />)}
                      </div>

                      <div className="track-step__content">
                        <div className="track-step__header">
                          <span className="track-step__code">{step.code || `0${index + 1}`}</span>
                          <h4 className="track-step__label">{step.label}</h4>
                        </div>
                        <span className="track-step__date">{step.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="track-empty-state">
              <p>Enter your Order ID above to view live tracking details.</p>
            </div>
          )}
        </Container>
      </section>

      {/* Feature Highlights Section (Soft Blue-Grey #EAF2F7) */}
      <section className="track-features">
        <Container>
          <div className="track-features__grid">
            <div className="track-feature-item">
              <div className="track-feature-item__bar" />
              <h3 className="track-feature-item__title">FABRIC-FIRST CARE</h3>
              <p className="track-feature-item__desc">
                Each garment is treated according to its fibre and finish.
              </p>
            </div>

            <div className="track-feature-item">
              <div className="track-feature-item__bar" />
              <h3 className="track-feature-item__title">QUALITY CONTROL</h3>
              <p className="track-feature-item__desc">
                Every order is checked before it leaves our facility.
              </p>
            </div>

            <div className="track-feature-item">
              <div className="track-feature-item__bar" />
              <h3 className="track-feature-item__title">TRANSPARENT UPDATES</h3>
              <p className="track-feature-item__desc">
                Honest status at every stage — no surprises, no silence.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default TrackOrderPage;
