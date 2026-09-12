import { useState, useEffect, useRef } from "react";
import LocationPicker from "../components/common/LocationPicker";
import { useCart } from "../context/CartContext";
import { recordPickupBooking } from "../utils/mockApi";
import "../styles/ContactPage.css";

const AVAILABLE_SERVICES = [
  { id: "Wash & Fold", name: "Wash & Fold", rate: "₹79 / KG" },
  { id: "Wash & Iron", name: "Wash & Iron", rate: "₹109 / KG" },
  { id: "Steam Press", name: "Steam Press", rate: "₹49 / piece" },
  { id: "Dry Cleaning", name: "Dry Cleaning", rate: "As per item" },
  { id: "Shoe Cleaning", name: "Shoe Cleaning", rate: "From ₹399 / pair" },
  { id: "Curtain & Carpet Care", name: "Curtain & Carpet Care", rate: "Specialty" },
  { id: "Other Services", name: "Other Services", rate: "Custom request" },
];

const getTodayDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getTomorrowDateString = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatFriendlyDate = (dateStr) => {
  if (!dateStr) return "Today";
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    const diffDays = Math.round((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";

    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
};

const ALL_TIME_SLOTS = [
  {
    id: "morning",
    label: "Morning (9 AM – 12 PM)",
    value: "Morning (9 AM – 12 PM)",
    cutoffHour: 12, // Cutoff at 12:00 PM
  },
  {
    id: "afternoon",
    label: "Afternoon (12 PM – 4 PM)",
    value: "Afternoon (12 PM – 4 PM)",
    cutoffHour: 16, // Cutoff at 4:00 PM
  },
  {
    id: "evening",
    label: "Evening (4 PM – 8 PM)",
    value: "Evening (4 PM – 8 PM)",
    cutoffHour: 20, // Cutoff at 8:00 PM
  },
  {
    id: "express",
    label: "Express / Immediate Pickup",
    value: "Express / Immediate",
    cutoffHour: 20, // Cutoff at 8:00 PM
  },
];

/**
 * Filter time slots for Today based on current local clock.
 * For future dates, all 4 slots are available.
 */
const getAvailableTimeSlots = (selectedDateStr) => {
  const todayStr = getTodayDateString();
  if (!selectedDateStr || selectedDateStr > todayStr) {
    return ALL_TIME_SLOTS;
  }
  if (selectedDateStr < todayStr) {
    return [];
  }

  const now = new Date();
  const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();

  return ALL_TIME_SLOTS.filter((slot) => {
    const cutoffMinutes = slot.cutoffHour * 60;
    return currentTotalMinutes < cutoffMinutes;
  });
};

const getInitialPickupDateAndSlot = () => {
  const todayStr = getTodayDateString();
  const todaySlots = getAvailableTimeSlots(todayStr);

  if (todaySlots.length > 0) {
    return {
      date: todayStr,
      slot: todaySlots[0].value,
    };
  }

  // If all slots for today have expired, default to Tomorrow
  const tomorrowStr = getTomorrowDateString();
  return {
    date: tomorrowStr,
    slot: ALL_TIME_SLOTS[0].value,
  };
};

export default function ContactPage({ initialService, initialItem }) {
  const { cart, totalItems, totalAmount, clearCart } = useCart();
  const todayString = getTodayDateString();
  const tomorrowString = getTomorrowDateString();
  const initialSchedule = getInitialPickupDateAndSlot();

  const [submitted, setSubmitted] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Book a Pickup | LOOMSHINE Luxury Garment Care";
    window.scrollTo(0, 0);
  }, []);

  const getInitialServices = () => {
    if (!initialService) return ["Wash & Fold"];
    const s = initialService.toLowerCase();
    if (s.includes("dry") || s === "dry-cleaning") return ["Dry Cleaning"];
    if (s.includes("steam") || s.includes("press")) return ["Steam Press"];
    if (s.includes("shoe")) return ["Shoe Cleaning"];
    if (s.includes("iron")) return ["Wash & Iron"];
    if (s.includes("curtain") || s.includes("carpet")) return ["Curtain & Carpet Care"];
    if (s.includes("business") || s.includes("b2b") || s.includes("corporate") || s.includes("other")) return ["Other Services"];
    return ["Wash & Fold"];
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pickupDate: initialSchedule.date,
    pickupSlot: initialSchedule.slot,
    services: getInitialServices(), // Multi-select array
    otherServices: initialItem ? `Item: ${initialItem}` : (initialService === "business" ? "Commercial / Business Inquiry" : ""),
    flatBuilding: "",
    address: "",
    landmark: "",
    pincode: "",
    message: "",
  });

  // Keep services up to date if initialService changes
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({
        ...prev,
        services: getInitialServices(),
        otherServices: initialItem ? `Item: ${initialItem}` : (initialService === "business" ? "Commercial / Business Inquiry" : prev.otherServices),
      }));
    }
  }, [initialService, initialItem]);

  // Auto-select corresponding service chips if items are in the cart
  useEffect(() => {
    if (cart && cart.length > 0) {
      setFormData((prev) => {
        const detectedServices = new Set(prev.services);
        cart.forEach((item) => {
          const category = (item.category || '').toLowerCase();
          const service = (item.service || '').toLowerCase();
          const name = (item.name || '').toLowerCase();

          if (category.includes('dry') || service.includes('dry') || name.includes('dry')) {
            detectedServices.add('Dry Cleaning');
          }
          if (service.includes('steam') || name.includes('steam') || service.includes('press')) {
            detectedServices.add('Steam Press');
          }
          if (service.includes('shoe') || category.includes('shoe') || name.includes('shoe')) {
            detectedServices.add('Shoe Cleaning');
          }
          if (service.includes('wash') && service.includes('fold')) {
            detectedServices.add('Wash & Fold');
          }
          if (service.includes('iron')) {
            detectedServices.add('Wash & Iron');
          }
        });

        if (detectedServices.size === 0) {
          detectedServices.add('Dry Cleaning');
        }

        return {
          ...prev,
          services: Array.from(detectedServices),
        };
      });
    }
  }, [cart]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [pinnedLocation, setPinnedLocation] = useState(null);

  const dropdownRef = useRef(null);

  // Dynamic available time slots for selected pickup date and today
  const availableSlots = getAvailableTimeSlots(formData.pickupDate);
  const todayAvailableSlots = getAvailableTimeSlots(todayString);

  // Auto-sync pickupSlot whenever pickupDate changes so only currently valid slots are chosen
  useEffect(() => {
    const validSlots = getAvailableTimeSlots(formData.pickupDate);
    const isValid = validSlots.some((s) => s.value === formData.pickupSlot);
    if (!isValid) {
      setFormData((prev) => ({
        ...prev,
        pickupSlot: validSlots.length > 0 ? validSlots[0].value : "",
      }));
    }
  }, [formData.pickupDate]);

  // Close multi-select dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle service selection for multi-select
  const handleToggleService = (serviceName) => {
    setFormData((prev) => {
      const exists = prev.services.includes(serviceName);
      const updated = exists
        ? prev.services.filter((s) => s !== serviceName)
        : [...prev.services, serviceName];
      return {
        ...prev,
        services: updated,
      };
    });
  };

  // Remove tag chip
  const handleRemoveService = (e, serviceName) => {
    e.stopPropagation();
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== serviceName),
    }));
  };

  // Handle location update from LocationPicker
  const handleLocationSelect = (newPin) => {
    setPinnedLocation(newPin);
    setFormData((prev) => ({
      ...prev,
      address: newPin.address || prev.address,
      pincode: newPin.pincode || prev.pincode,
      landmark: prev.landmark ? prev.landmark : (newPin.locality || ""),
    }));
  };

  const handleClearPin = () => {
    setPinnedLocation(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.services.length === 0 && !formData.otherServices.trim() && cart.length === 0) {
      alert("Please select at least one service or select garments for pickup.");
      return;
    }

    if (availableSlots.length === 0 || !formData.pickupSlot) {
      alert("All pickup windows for the selected date have ended. Please choose Tomorrow or another date.");
      return;
    }

    setIsSubmitting(true);
    try {
      const friendlyDate = formatFriendlyDate(formData.pickupDate);
      const scheduledDateStr = `${friendlyDate} (${formData.pickupDate}) · ${formData.pickupSlot}`;

      const payload = {
        ...formData,
        friendlyDate,
        pickupDate: scheduledDateStr,
        rawPickupDate: formData.pickupDate,
        pinnedLocation,
        cartItems: [...cart],
        totalAmount,
        totalItems,
        submittedAt: new Date().toISOString(),
      };

      console.log("Submitting Pickup Request Payload:", payload);

      const result = await recordPickupBooking(payload);
      if (result && result.success) {
        setBookingResult(result.order);
        setSubmitted(true);
        clearCart();
        window.scrollTo({ top: 180, behavior: "smooth" });
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("There was an issue scheduling your pickup. Please try again or call our concierge.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      {/* HERO SECTION */}
      <section className="contact-hero">
        <div className="contact-container">
          <p className="contact-eyebrow">LOOMSHINE PROFESSIONAL CARE</p>
          <h1>
            BOOK A<span> PICKUP.</span>
          </h1>
          <p className="contact-description">
            Schedule a convenient doorstep collection. Loomshine handles delicate dry cleaning, precision steam pressing, and premium laundry with guaranteed artisan care.
          </p>
        </div>
      </section>

      {/* FORM / CONFIRMATION SECTION */}
      <section className="contact-form-section">
        <div className="contact-container contact-layout">
          {/* LEFT: INFO & BENEFITS */}
          <div className="contact-info">
            <span className="contact-section-label">DOORSTEP CONCIERGE</span>
            <h2>
              YOUR CLOTHES.
              <br />
              OUR CARE.
            </h2>
            <p>
              Fill in your details and our concierge will coordinate doorstep collection and safe handling.
            </p>

            <div className="contact-benefits">
              <div className="contact-benefit">
                <span>01</span>
                <div>
                  <h3>DOORSTEP PICKUP</h3>
                  <p>We collect your garments directly from your location with real-time GPS verification.</p>
                </div>
              </div>

              <div className="contact-benefit">
                <span>02</span>
                <div>
                  <h3>PROFESSIONAL CARE</h3>
                  <p>Every garment receives specialised bio-cleaning and fabric-customised finishing.</p>
                </div>
              </div>

              <div className="contact-benefit">
                <span>03</span>
                <div>
                  <h3>DOORSTEP DELIVERY</h3>
                  <p>Freshly cleaned, pressed, and hung or folded garments delivered back to your door.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: CONFIRMED OR PICKUP FORM */}
          {submitted && bookingResult ? (
            /* PICKUP CONFIRMED VIEW */
            <div className="pickup-confirmed-card">
              <div className="pickup-confirmed-badge">
                <span className="pickup-confirmed-icon">✓</span>
                <span>PICKUP SCHEDULED SUCCESSFULLY</span>
              </div>
              <h2 className="pickup-confirmed-title">Thank You, {bookingResult.customerName}!</h2>
              <p className="pickup-confirmed-desc">
                Your doorstep pickup request has been scheduled. Our logistics executive will arrive at your address during the selected time slot.
              </p>

              <div className="pickup-confirmed-id-box">
                <span className="pickup-confirmed-id-label">YOUR ORDER ID</span>
                <span className="pickup-confirmed-id-value">{bookingResult.orderId}</span>
                <span className="pickup-confirmed-id-hint">
                  Keep this Order ID for tracking your garment inspection, cleaning, and delivery status.
                </span>
              </div>

              <div className="pickup-confirmed-details">
                <div className="pickup-detail-row">
                  <span>Scheduled Arrival:</span>
                  <strong>{bookingResult.pickupDate}</strong>
                </div>
                <div className="pickup-detail-row">
                  <span>Service Category:</span>
                  <strong>{bookingResult.service}</strong>
                </div>
                <div className="pickup-detail-row">
                  <span>Customer Phone:</span>
                  <strong>{bookingResult.phone}</strong>
                </div>
                <div className="pickup-detail-row">
                  <span>Pickup Address:</span>
                  <strong>{bookingResult.address}</strong>
                </div>

                {bookingResult.cartItems && bookingResult.cartItems.length > 0 && (
                  <>
                    <div className="pickup-detail-row" style={{ borderTop: "1px solid #E5E0D5", paddingTop: "12px", marginTop: "4px" }}>
                      <span>Garments Included:</span>
                      <strong>
                        {bookingResult.cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)} items
                      </strong>
                    </div>
                    <div className="pickup-confirmed-garments-list">
                      {bookingResult.cartItems.map((item) => (
                        <div key={item.id} className="pickup-confirmed-garment-pill">
                          <span>{item.name} × {item.quantity}</span>
                          <span>₹{(item.price || 0) * (item.quantity || 1)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pickup-detail-row">
                      <span>Estimated Subtotal:</span>
                      <strong style={{ fontSize: "1.1rem", color: "#071A33" }}>
                        ₹{bookingResult.totalAmount}
                      </strong>
                    </div>
                  </>
                )}
              </div>

              <div className="pickup-confirmed-actions">
                <a
                  href={`#/track-order?id=${bookingResult.orderId}`}
                  className="pickup-track-btn"
                >
                  Track Order Live →
                </a>
                <button
                  type="button"
                  className="pickup-new-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setBookingResult(null);
                    const freshSchedule = getInitialPickupDateAndSlot();
                    setFormData({
                      name: "",
                      phone: "",
                      email: "",
                      pickupDate: freshSchedule.date,
                      pickupSlot: freshSchedule.slot,
                      services: getInitialServices(),
                      otherServices: "",
                      flatBuilding: "",
                      address: "",
                      landmark: "",
                      pincode: "",
                      message: "",
                    });
                    setPinnedLocation(null);
                  }}
                >
                  Book Another Pickup
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE PICKUP FORM */
            <form className="pickup-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <span>BOOK YOUR PICKUP</span>
                <h2>LET'S GET STARTED</h2>
              </div>

              {/* ========================================================================= */}
              {/* CART ITEMS SUMMARY CARD (Shown when user has items in their cart) */}
              {/* ========================================================================= */}
              {cart.length > 0 && (
                <div className="pickup-form-cart-card">
                  <div className="pickup-form-cart-header">
                    <div className="pickup-form-cart-title-box">
                      <span className="pickup-form-cart-tag">ITEMS FROM YOUR BAG</span>
                      <h3 className="pickup-form-cart-title">
                        Selected Garments <span>({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                      </h3>
                    </div>
                    <a href="#/cart" className="pickup-form-cart-edit-link">
                      Edit Bag ✎
                    </a>
                  </div>

                  <div className="pickup-form-cart-list">
                    {cart.map((item) => (
                      <div className="pickup-form-cart-item" key={item.id}>
                        <div className="pickup-form-cart-item-main">
                          <span className="pickup-form-cart-item-name">{item.name}</span>
                          <span className="pickup-form-cart-item-meta">
                            {item.category || item.service} • ₹{item.price} {item.unit || 'each'}
                          </span>
                        </div>
                        <div className="pickup-form-cart-item-qty">
                          Qty: <strong>{item.quantity || 1}</strong>
                        </div>
                        <div className="pickup-form-cart-item-total">
                          ₹{(item.price || 0) * (item.quantity || 1)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pickup-form-cart-footer">
                    <div className="pickup-form-cart-footer-note">
                      <span>✓ Free door inspection & pickup</span>
                    </div>
                    <div className="pickup-form-cart-total-box">
                      <span className="pickup-form-cart-total-label">Estimated Total:</span>
                      <strong className="pickup-form-cart-total-val">₹{totalAmount}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* GRID ROW 1: NAME & PHONE */}
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name-input">FULL NAME *</label>
                  <input
                    id="name-input"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone-input">PHONE NUMBER *</label>
                  <input
                    id="phone-input"
                    type="tel"
                    name="phone"
                    placeholder="Enter your 10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* GRID ROW 2: EMAIL & OTHER SERVICES */}
              <div className="form-grid form-row-spacing">
                <div className="form-group">
                  <label htmlFor="email-input">EMAIL ADDRESS</label>
                  <input
                    id="email-input"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="other-services-input">
                    OTHER SERVICES
                    <span className="label-helper-text"> — Custom or specialty items</span>
                  </label>
                  <input
                    id="other-services-input"
                    type="text"
                    name="otherServices"
                    placeholder="e.g. Curtains, Carpets, Bags, Starching, Dyeing"
                    value={formData.otherServices}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* GRID ROW 3: PREFERRED PICKUP DATE & TIME */}
              <div className="form-grid form-row-spacing">
                <div className="form-group">
                  <label htmlFor="pickup-date-input">
                    PREFERRED PICKUP DATE *
                    <span className="label-helper-text"> — {formatFriendlyDate(formData.pickupDate)}</span>
                  </label>
                  <input
                    id="pickup-date-input"
                    type="date"
                    name="pickupDate"
                    min={todayString}
                    value={formData.pickupDate}
                    onChange={handleChange}
                    required
                    className="pickup-date-input"
                  />
                  <div className="quick-date-chips">
                    <button
                      type="button"
                      className={`quick-date-btn ${formData.pickupDate === todayString ? "quick-date-btn--active" : ""}`}
                      onClick={() => setFormData((p) => ({ ...p, pickupDate: todayString }))}
                      disabled={todayAvailableSlots.length === 0}
                      title={todayAvailableSlots.length === 0 ? "Today's pickup slots have concluded" : "Schedule for Today"}
                    >
                      Today{todayAvailableSlots.length === 0 ? " (Closed)" : ""}
                    </button>
                    <button
                      type="button"
                      className={`quick-date-btn ${formData.pickupDate === tomorrowString ? "quick-date-btn--active" : ""}`}
                      onClick={() => setFormData((p) => ({ ...p, pickupDate: tomorrowString }))}
                    >
                      Tomorrow
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="slot-select">
                    PREFERRED PICKUP TIME SLOT *
                    <span className="label-helper-text">
                      {formData.pickupDate === todayString
                        ? ` — ${availableSlots.length} available today`
                        : " — Select window"}
                    </span>
                  </label>
                  <select
                    id="slot-select"
                    name="pickupSlot"
                    value={formData.pickupSlot}
                    onChange={handleChange}
                    required
                    disabled={availableSlots.length === 0}
                  >
                    {availableSlots.length === 0 ? (
                      <option value="" disabled>All slots closed for today — Choose Tomorrow</option>
                    ) : (
                      availableSlots.map((slot) => (
                        <option key={slot.id} value={slot.value}>
                          {slot.label}
                        </option>
                      ))
                    )}
                  </select>
                  {formData.pickupDate === todayString && availableSlots.length === 0 && (
                    <p className="slot-helper-closed">
                      All pickup windows for today have ended (operating hours: 9 AM – 8 PM). Please select <strong>Tomorrow</strong> for doorstep pickup.
                    </p>
                  )}
                </div>
              </div>

              {/* GRID ROW 4: SERVICE REQUIRED (MULTI-SELECT) */}
              <div className="form-group form-row-spacing multi-select-group" ref={dropdownRef}>
                <label>
                  SERVICE REQUIRED (MULTI-SELECT) *
                  <span className="label-helper-text"> — Choose all that apply</span>
                </label>

                <div
                  className={`multi-select-trigger ${isDropdownOpen ? "multi-select-trigger--open" : ""}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isDropdownOpen}
                >
                  <div className="multi-select-chips">
                    {formData.services.length === 0 ? (
                      <span className="multi-select-placeholder">Select one or more services...</span>
                    ) : (
                      formData.services.map((srv) => (
                        <span className="service-chip" key={srv}>
                          {srv}
                          <button
                            type="button"
                            className="chip-remove-btn"
                            onClick={(e) => handleRemoveService(e, srv)}
                            aria-label={`Remove ${srv}`}
                          >
                            ✕
                          </button>
                        </span>
                      ))
                    )}
                  </div>

                  <span className="multi-select-arrow">{isDropdownOpen ? "▲" : "▼"}</span>
                </div>

                {/* DROPDOWN MENU */}
                {isDropdownOpen && (
                  <div className="multi-select-menu">
                    <div className="multi-select-menu-header">
                      <span>SELECT APPLICABLE SERVICES</span>
                      <button
                        type="button"
                        className="multi-select-clear-btn"
                        onClick={() => setFormData((p) => ({ ...p, services: [] }))}
                      >
                        Clear all
                      </button>
                    </div>

                    <div className="multi-select-options-list">
                      {AVAILABLE_SERVICES.map((service) => {
                        const isChecked = formData.services.includes(service.name);
                        return (
                          <label
                            key={service.id}
                            className={`multi-select-option ${isChecked ? "multi-select-option--selected" : ""}`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleService(service.name)}
                            />
                            <div className="option-text">
                              <span className="option-name">{service.name}</span>
                              <span className="option-rate">{service.rate}</span>
                            </div>
                            {isChecked && <span className="option-check-icon">✓</span>}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* ========================================================================= */}
              {/* ADDRESS SECTION (LIVE LOCATION PIN + MANUAL ADDRESS BOTH) */}
              {/* ========================================================================= */}
              <div className="address-section-wrapper">
                <div className="address-section-top">
                  <div className="address-title-box">
                    <label className="address-main-label">PICKUP ADDRESS & LOCATION PIN *</label>
                    <span className="address-sublabel">
                      Use high-accuracy GPS, search your society/street, or drag the map pin directly to your gate.
                    </span>
                  </div>
                </div>

                {/* INTERACTIVE LOCATION PICKER (GPS + SEARCH + DRAGGABLE PIN + ACCURACY) */}
                <LocationPicker
                  initialLocation={pinnedLocation}
                  onLocationSelect={handleLocationSelect}
                  onClear={handleClearPin}
                />

                {/* MANUAL ADDRESS FIELDS */}
                <div className="manual-address-container">
                  <div className="manual-address-header">
                    <span className="manual-address-header-tag">DOORSTEP DETAILS</span>
                    <span className="manual-address-header-desc">
                      Refine your specific flat, floor, and landmark for our courier executive
                    </span>
                  </div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="flat-building-input">HOUSE / FLAT / BUILDING / FLOOR *</label>
                      <input
                        id="flat-building-input"
                        type="text"
                        name="flatBuilding"
                        placeholder="e.g. Flat 302, Tower B, Lotus Apartments"
                        value={formData.flatBuilding}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="landmark-input">LANDMARK / GATE NUMBER</label>
                      <input
                        id="landmark-input"
                        type="text"
                        name="landmark"
                        placeholder="e.g. Opposite Community Park / Near Gate 2"
                        value={formData.landmark}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group form-row-spacing">
                    <label htmlFor="address-textarea">STREET ADDRESS / LOCALITY / AREA *</label>
                    <textarea
                      id="address-textarea"
                      name="address"
                      placeholder="Enter complete street name, road, area, and city"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group form-row-spacing">
                    <label htmlFor="pincode-input">PIN CODE</label>
                    <input
                      id="pincode-input"
                      type="text"
                      name="pincode"
                      placeholder="e.g. 560038"
                      value={formData.pincode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* ADDITIONAL DETAILS / SPECIAL INSTRUCTIONS */}
              <div className="form-group form-group-full">
                <label htmlFor="message-textarea">ADDITIONAL DETAILS / SPECIAL INSTRUCTIONS</label>
                <textarea
                  id="message-textarea"
                  name="message"
                  placeholder="Tell us about special fabric care, heavy stains, gate codes, or preferred delivery packaging..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="submit-pickup-btn"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "SCHEDULING PICKUP..." : "REQUEST PICKUP"}</span>
                <span>{isSubmitting ? "⏳" : "→"}</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}