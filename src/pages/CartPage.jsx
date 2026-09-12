import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import '../styles/CartPage.css';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalAmount } = useCart();

  useEffect(() => {
    document.title = `Cart (${totalItems}) | LOOMSHINE Luxury Garment Care`;
    window.scrollTo(0, 0);
  }, [totalItems]);

  return (
    <main className="loom-cart-page">
      {/* CART HERO HEADER */}
      <section className="cart-hero-strip">
        <Container>
          <div className="cart-hero-content">
            <span className="cart-eyebrow">YOUR GARMENT BAG</span>
            <h1 className="cart-title">REVIEW YOUR ITEMS</h1>
            <p className="cart-desc">
              Check your selected garments and quantities before booking doorstep pickup.
            </p>
          </div>
        </Container>
      </section>

      <section className="cart-main-section">
        <Container>
          {cart.length === 0 ? (
            /* EMPTY CART STATE */
            <div className="cart-empty-state">
              <div className="cart-empty-icon">✦</div>
              <h2 className="cart-empty-title">Your garment bag is empty</h2>
              <p className="cart-empty-text">
                Explore our dry cleaning catalogue or individual service rates to select items for doorstep care.
              </p>
              <div className="cart-empty-actions">
                <Button href="#/services/dry-cleaning/catalogue" variant="primary" size="md">
                  Explore Dry Cleaning Catalogue →
                </Button>
                <Button href="#/pricing" variant="secondary" size="md">
                  View Rate Lists →
                </Button>
                <Button href="#/contact" variant="text" size="md">
                  Book Custom Pickup Without Items →
                </Button>
              </div>
            </div>
          ) : (
            /* ACTIVE CART GRID */
            <div className="cart-layout-grid">
              {/* LEFT: ITEMS LIST */}
              <div className="cart-items-container">
                <div className="cart-items-header">
                  <h3>
                    Selected Garments <span>({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                  </h3>
                  <button
                    type="button"
                    className="cart-clear-btn"
                    onClick={clearCart}
                    title="Empty all items in cart"
                  >
                    Clear Bag
                  </button>
                </div>

                <div className="cart-items-list">
                  {cart.map((item) => {
                    const itemTotal = (item.price || 0) * (item.quantity || 1);

                    return (
                      <article className="cart-item-row" key={item.id}>
                        {/* ITEM IMAGE */}
                        <div className="cart-item-media">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="cart-item-img"
                              loading="lazy"
                            />
                          ) : (
                            <div className="cart-item-placeholder">✦</div>
                          )}
                        </div>

                        {/* ITEM DETAILS */}
                        <div className="cart-item-info">
                          <span className="cart-item-category">{item.category || item.service}</span>
                          <h4 className="cart-item-title">{item.name}</h4>
                          <span className="cart-item-rate">
                            ₹{item.price} <small>{item.unit}</small>
                          </span>
                        </div>

                        {/* QUANTITY CONTROLS */}
                        <div className="cart-item-quantity-box">
                          <button
                            type="button"
                            className="qty-btn qty-btn--minus"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            −
                          </button>
                          <span className="qty-val">{item.quantity || 1}</span>
                          <button
                            type="button"
                            className="qty-btn qty-btn--plus"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            +
                          </button>
                        </div>

                        {/* ITEM TOTAL */}
                        <div className="cart-item-subtotal">
                          <span className="subtotal-label">Total</span>
                          <strong className="subtotal-amount">₹{itemTotal}</strong>
                        </div>

                        {/* REMOVE BUTTON */}
                        <button
                          type="button"
                          className="cart-item-remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name} from bag`}
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </article>
                    );
                  })}
                </div>

                {/* BOTTOM ACTIONS */}
                <div className="cart-continue-strip">
                  <a href="#/services/dry-cleaning/catalogue" className="cart-continue-link">
                    ← Add More Dry Cleaning Items
                  </a>
                  <a href="#/pricing" className="cart-continue-link">
                    Browse Other Service Rates →
                  </a>
                </div>
              </div>

              {/* RIGHT: ORDER SUMMARY SIDEBAR */}
              <aside className="cart-summary-sidebar">
                <div className="cart-summary-card">
                  <h3 className="summary-card-title">PICKUP SUMMARY</h3>

                  <div className="summary-breakdown-row">
                    <span>Garments Selected</span>
                    <strong>{totalItems} items</strong>
                  </div>

                  <div className="summary-breakdown-row">
                    <span>Estimated Subtotal</span>
                    <strong>₹{totalAmount}</strong>
                  </div>

                  <div className="summary-breakdown-row">
                    <span>Doorstep Pickup & Delivery</span>
                    <span className="badge-free">FREE</span>
                  </div>

                  <div className="summary-breakdown-row">
                    <span>Custom Inspection & Tagging</span>
                    <span className="badge-included">INCLUDED</span>
                  </div>

                  <div className="summary-divider" />

                  <div className="summary-total-row">
                    <span>Estimated Total</span>
                    <strong>₹{totalAmount}</strong>
                  </div>

                  <p className="summary-pricing-note">
                    *Final pricing is verified upon physical inspection based on delicate fabric needs and custom care tags.
                  </p>

                  <div className="summary-actions">
                    <Button
                      href="#/contact"
                      variant="primary"
                      size="lg"
                      fullWidth
                    >
                      Proceed to Book Pickup →
                    </Button>
                  </div>

                  <div className="summary-guarantees">
                    <div className="guarantee-item">
                      <span className="guarantee-icon">✓</span>
                      <span>30-minute doorstep valet arrival in Gurugram</span>
                    </div>
                    <div className="guarantee-item">
                      <span className="guarantee-icon">✓</span>
                      <span>No pre-payment required; pay upon delivery</span>
                    </div>
                    <div className="guarantee-item">
                      <span className="guarantee-icon">✓</span>
                      <span>Live status updates on your order</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </Container>
      </section>

      {/* MOBILE STICKY BOTTOM CHECKOUT BAR (Visible on mobile screens <= 768px) */}
      {cart.length > 0 && (
        <aside className="cart-mobile-sticky-bar" aria-label="Mobile Quick Checkout">
          <div className="cart-mobile-sticky-info">
            <span className="cart-mobile-sticky-count">
              {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'} · ESTIMATED
            </span>
            <strong className="cart-mobile-sticky-total">₹{totalAmount}</strong>
          </div>
          <Button
            href="#/contact"
            variant="primary"
            size="md"
            className="cart-mobile-sticky-btn"
          >
            Book Pickup →
          </Button>
        </aside>
      )}
    </main>
  );
}
