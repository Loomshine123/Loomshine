# Functional Requirements — Loomshine

## 1. Phase 1 (Frontend UI & Mock Services)
- Complete UI presentation, visual hierarchy, and interactive states.
- Client-side validation for PIN availability check, Order Tracking lookup, and Pickup Booking form.
- Structured mock datasets in `src/data/` representing production models.
- Abstract service handlers (`src/utils/mockApi.js`) so Phase 2 API endpoints can plug in directly.

## 2. Phase 2 (Future Backend Integration Scope)
- Real-time Pincode availability check API.
- Customer authentication & profile management.
- Live Order creation, itemized laundry cart, and scheduling API.
- Order tracking webhook & real-time order status updates.
- Payment gateway integration (Razorpay / Stripe).
- Automated SMS/WhatsApp order updates.

---

## 3. Key Interactive Component Requirements

### A. Pincode Availability Checker
- **Inputs**: 6-digit numeric Pincode.
- **States**: Default, Validating (Spinner), Serviced (Success message), Not Serviced (Polite message + notification request).
- **Mock Pincodes**: e.g., `110001`, `110020`, `400001`, `560001`, `122001` marked as serviced.

### B. Order Tracker Component
- **Inputs**: Order ID string (e.g. `TL-109283`).
- **States**: Default, Searching, Found (displays timeline stepper with current active step highlighted), Not Found (Error message).
- **Mock Status Steps**:
  1. Picked Up
  2. Cleaning
  3. Quality Check
  4. Out for Delivery
  5. Delivered

### C. Booking Flow Component (`/book-pickup`)
- Step 1: Select Service (Laundry, Dry Cleaning, Pressing, Shoe/Bag Care)
- Step 2: Select Items / Estimated Quantity
- Step 3: Select Pickup Date & Slot
- Step 4: Address Details & Contact Info
- Step 5: Order Confirmation Summary

---

## 4. Unconfirmed Content & Placeholder Policy
- Pricing numbers must be formatted with currency placeholders (e.g., `Starting from ₹XX` or structured mock parameters) until confirmed by the client.
- Phone numbers, email addresses, and specific office locations must remain clearly marked mock placeholders (`+91 00000 00000`, `hello@loomshine.com`).
- Customer testimonials must be marked as sample reviews until client approval.
