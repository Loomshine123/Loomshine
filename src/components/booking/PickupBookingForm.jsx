import React, { useState, useEffect } from 'react';
import servicesData from '../../data/servicesData';
import LocationPicker from '../common/LocationPicker';
import { useCart } from '../../context/CartContext';
import { submitPickupBooking } from '../../services/pickup.service';
import './PickupBookingForm.css';

// Operating hours cutoff logic
const ALL_TIME_SLOTS = [
  { id: 'morning', label: 'Morning (9 AM – 12 PM)', value: 'Morning (9 AM – 12 PM)', cutoffHour: 12 },
  { id: 'afternoon', label: 'Afternoon (12 PM – 4 PM)', value: 'Afternoon (12 PM – 4 PM)', cutoffHour: 16 },
  { id: 'evening', label: 'Evening (4 PM – 8 PM)', value: 'Evening (4 PM – 8 PM)', cutoffHour: 20 },
  { id: 'express', label: 'Express / Immediate Pickup', value: 'Express / Immediate Pickup', cutoffHour: 20 }
];

const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getTomorrowDateString = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatFriendlyDate = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
};

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

const getInitialSchedule = () => {
  const todayStr = getTodayDateString();
  const todaySlots = getAvailableTimeSlots(todayStr);

  if (todaySlots.length > 0) {
    return { date: todayStr, slot: todaySlots[0].value };
  }
  return { date: getTomorrowDateString(), slot: ALL_TIME_SLOTS[0].value };
};

export const PickupBookingForm = ({ initialService, initialItem, source = 'website', onBookingSuccess }) => {
  const { cart, totalItems, totalAmount, clearCart } = useCart();
  const todayStr = getTodayDateString();
  const tomorrowStr = getTomorrowDateString();
  const initialSchedule = getInitialSchedule();

  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pickupDate, setPickupDate] = useState(initialSchedule.date);
  const [pickupSlot, setPickupSlot] = useState(initialSchedule.slot);
  
  // Selected standalone services
  const [selectedServices, setSelectedServices] = useState([]);
  const [otherServices, setOtherServices] = useState(initialItem ? `Item: ${initialItem}` : '');

  // Detailed Address Fields
  const [houseFlat, setHouseFlat] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [area, setArea] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Map & Location State
  const [pinnedLocation, setPinnedLocation] = useState(null);

  // Form Submission & Validation State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [bookingResult, setBookingResult] = useState(null);

  // Auto-sync pickupSlot when pickupDate changes
  useEffect(() => {
    const validSlots = getAvailableTimeSlots(pickupDate);
    const isValid = validSlots.some((s) => s.value === pickupSlot);
    if (!isValid) {
      setPickupSlot(validSlots.length > 0 ? validSlots[0].value : '');
    }
  }, [pickupDate]);

  // Handle initialService prop
  useEffect(() => {
    if (initialService) {
      const s = initialService.toLowerCase();
      let matchedName = null;
      if (s.includes('dry') || s === 'dry-cleaning') matchedName = 'DRY CLEANING';
      else if (s.includes('steam') || s.includes('press')) matchedName = 'STEAM PRESS';
      else if (s.includes('shoe')) matchedName = 'SHOE CLEANING';
      else if (s.includes('iron')) matchedName = 'WASH & IRON';
      else if (s.includes('fold')) matchedName = 'WASH & FOLD';

      if (matchedName) {
        const found = servicesData.find((sd) => sd.name === matchedName);
        if (found) {
          setSelectedServices([{ name: found.name, price: `${found.price} ${found.unit}` }]);
        }
      }
    }
  }, [initialService]);

  // Service toggle handler
  const handleServiceToggle = (serviceObj) => {
    const serviceName = serviceObj.name;
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.name === serviceName);
      if (exists) {
        return prev.filter((s) => s.name !== serviceName);
      } else {
        return [...prev, { name: serviceName, price: serviceObj.price ? `${serviceObj.price} ${serviceObj.unit}` : undefined }];
      }
    });
  };

  const isServiceSelected = (serviceName) => {
    return selectedServices.some((s) => s.name === serviceName);
  };

  // Handle Map Pin Select (Auto-Populate editable fields while storing lat/lon)
  const handleLocationSelect = (newPin) => {
    setPinnedLocation(newPin);
    if (newPin) {
      if (newPin.street) setHouseFlat((prev) => prev || newPin.street);
      if (newPin.address) setStreetAddress(newPin.address);
      if (newPin.locality) setArea((prev) => prev || newPin.locality);
      if (newPin.pincode) setPincode((prev) => prev || newPin.pincode);
      if (newPin.city) setCity(newPin.city);
      if (newPin.state) setState(newPin.state);
    }
  };

  const handleClearPin = () => {
    setPinnedLocation(null);
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};

    if (!fullName.trim()) {
      errors.fullName = 'Full name is required.';
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!phone.trim() || cleanPhone.length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    const availableSlots = getAvailableTimeSlots(pickupDate);
    if (availableSlots.length === 0 || !pickupSlot) {
      errors.pickupSlot = 'All slots for today have closed. Please select Tomorrow.';
    }

    // Require service selection OR cart items
    if (selectedServices.length === 0 && !otherServices.trim() && cart.length === 0) {
      errors.services = 'Please select at least one service or add items to your bag.';
    }

    if (isServiceSelected('OTHER SERVICES') && !otherServices.trim()) {
      errors.otherServices = 'Please specify your other service requirements.';
    }

    if (!streetAddress.trim() && !houseFlat.trim()) {
      errors.streetAddress = 'Pickup address is required.';
    }

    // MAP COORDINATES VALIDATION
    const lat = pinnedLocation ? pinnedLocation.lat : null;
    const lon = pinnedLocation ? pinnedLocation.lon : null;

    const isLatValid = typeof lat === 'number' && !isNaN(lat) && lat >= -90 && lat <= 90;
    const isLonValid = typeof lon === 'number' && !isNaN(lon) && lon >= -180 && lon <= 180;

    if (!pinnedLocation || !isLatValid || !isLonValid) {
      errors.location = 'Please select your pickup location on the map before submitting.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validateForm()) {
      const firstErrKey = Object.keys(fieldErrors)[0];
      if (firstErrKey === 'location') {
        setErrorMsg('Please select your pickup location on the map before submitting.');
      } else {
        setErrorMsg('Please complete all required fields highlighted in red.');
      }
      return;
    }

    setIsSubmitting(true);

    const friendlyDate = formatFriendlyDate(pickupDate);
    const combinedPickupTime = `${friendlyDate} (${pickupDate}) · ${pickupSlot}`;

    // Full combined address
    const fullAddressParts = [
      houseFlat.trim(),
      streetAddress.trim(),
      landmark.trim() ? `Near ${landmark.trim()}` : '',
      area.trim(),
      city.trim() || 'Gurugram',
      state.trim() || 'Haryana',
      pincode.trim() ? `PIN: ${pincode.trim()}` : ''
    ].filter(Boolean);

    const fullPickupAddress = fullAddressParts.join(', ');

    const payload = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      preferredPickupTime: combinedPickupTime,
      pickupDate,
      pickupSlot,
      services: selectedServices,
      cartItems: cart,
      otherServices: isServiceSelected('OTHER SERVICES') || otherServices.trim() ? otherServices.trim() : undefined,
      houseFlat: houseFlat.trim(),
      streetAddress: streetAddress.trim(),
      landmark: landmark.trim(),
      area: area.trim() || undefined,
      pincode: pincode.trim(),
      city: city.trim(),
      state: state.trim(),
      pickupAddress: fullPickupAddress,
      specialInstructions: specialInstructions.trim() || undefined,
      latitude: pinnedLocation.lat,
      longitude: pinnedLocation.lon,
      source
    };

    try {
      const response = await submitPickupBooking(payload);
      setIsSubmitting(false);
      
      // CLEAR CART ONLY UPON SUCCESSFUL BACKEND RESPONSE
      if (cart.length > 0) {
        clearCart();
      }

      setBookingResult(response);
      if (onBookingSuccess) {
        onBookingSuccess(response);
      }
      window.scrollTo({ top: 180, behavior: 'smooth' });
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'We could not submit your pickup request right now. Please try again.');
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    const freshSched = getInitialSchedule();
    setPickupDate(freshSched.date);
    setPickupSlot(freshSched.slot);
    setSelectedServices([]);
    setOtherServices('');
    setHouseFlat('');
    setStreetAddress('');
    setLandmark('');
    setArea('');
    setPincode('');
    setCity('');
    setState('');
    setSpecialInstructions('');
    setPinnedLocation(null);
    setBookingResult(null);
    setErrorMsg('');
    setFieldErrors({});
  };

  // SUCCESS SCREEN VIEW
  if (bookingResult && bookingResult.success) {
    return (
      <div className="loom-pickup-success">
        <div className="loom-pickup-success__badge">✓ PICKUP REQUEST CONFIRMED</div>
        <h2 className="loom-pickup-success__heading">THANK YOU, {fullName || 'VALUED CUSTOMER'}!</h2>
        <p className="loom-pickup-success__subheading">
          {bookingResult.message || "Your pickup request has been received. Our concierge will contact you shortly on WhatsApp."}
        </p>

        {bookingResult.bookingId && (
          <div className="loom-pickup-success__reference">
            <span className="loom-ref-label">BOOKING REFERENCE ID:</span>
            <strong className="loom-ref-id">{bookingResult.bookingId}</strong>
            <span className="loom-ref-hint">Keep this reference ID for concierge coordination.</span>
          </div>
        )}

        <div className="loom-pickup-success__actions">
          <button type="button" className="loom-btn-primary" onClick={handleResetForm}>
            Book Another Pickup
          </button>
          <a href="#/track-order" className="loom-btn-secondary">
            Track Order Status →
          </a>
        </div>
      </div>
    );
  }

  const availableSlots = getAvailableTimeSlots(pickupDate);
  const todayAvailableSlots = getAvailableTimeSlots(todayStr);

  return (
    <div className="loom-pickup-form-wrap">
      <div className="loom-pickup-header">
        <span className="loom-pickup-eyebrow">DOORSTEP CONVENIENCE</span>
        <h1 className="loom-pickup-title">SCHEDULE A PICKUP.</h1>
        <p className="loom-pickup-subtitle">
          Select your services and pickup slot. Our white-glove logistics team will collect your garments at your convenience.
        </p>
      </div>

      {errorMsg && (
        <div className="loom-alert loom-alert--error" role="alert">
          <span>{errorMsg}</span>
        </div>
      )}

      <form className="loom-pickup-form" onSubmit={handleSubmit} noValidate>
        {/* SHOPPING BAG / CART SUMMARY CARD (WHEN CART HAS ITEMS) */}
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
                <span>✓ Free doorstep inspection & pickup</span>
              </div>
              <div className="pickup-form-cart-total-box">
                <span className="pickup-form-cart-total-label">Estimated Subtotal:</span>
                <strong className="pickup-form-cart-total-val">₹{totalAmount}</strong>
              </div>
            </div>
          </div>
        )}

        {/* FULL NAME & PHONE NUMBER ROW */}
        <div className="loom-form-row">
          <div className="loom-form-group">
            <label htmlFor="pickup-fullname" className="loom-label">
              FULL NAME <span className="loom-required">*</span>
            </label>
            <input
              id="pickup-fullname"
              type="text"
              className={`loom-input ${fieldErrors.fullName ? 'loom-input--error' : ''}`}
              placeholder="e.g. Eleanor Vance"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            {fieldErrors.fullName && <span className="loom-error-text">{fieldErrors.fullName}</span>}
          </div>

          <div className="loom-form-group">
            <label htmlFor="pickup-phone" className="loom-label">
              PHONE NUMBER <span className="loom-required">*</span>
            </label>
            <input
              id="pickup-phone"
              type="tel"
              className={`loom-input ${fieldErrors.phone ? 'loom-input--error' : ''}`}
              placeholder="e.g. 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {fieldErrors.phone && <span className="loom-error-text">{fieldErrors.phone}</span>}
          </div>
        </div>

        {/* EMAIL & PICKUP DATE ROW */}
        <div className="loom-form-row">
          <div className="loom-form-group">
            <label htmlFor="pickup-email" className="loom-label">
              EMAIL ADDRESS <span className="loom-optional">(OPTIONAL)</span>
            </label>
            <input
              id="pickup-email"
              type="email"
              className="loom-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="loom-form-group">
            <label htmlFor="pickup-date" className="loom-label">
              PREFERRED PICKUP DATE <span className="loom-required">*</span>
            </label>
            <input
              id="pickup-date"
              type="date"
              className="loom-input"
              min={todayStr}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              required
            />
            <div className="quick-date-chips">
              <button
                type="button"
                className={`quick-date-btn ${pickupDate === todayStr ? 'quick-date-btn--active' : ''}`}
                onClick={() => setPickupDate(todayStr)}
                disabled={todayAvailableSlots.length === 0}
                title={todayAvailableSlots.length === 0 ? "Today's pickup slots have closed" : 'Schedule for Today'}
              >
                Today{todayAvailableSlots.length === 0 ? ' (Closed)' : ''}
              </button>
              <button
                type="button"
                className={`quick-date-btn ${pickupDate === tomorrowStr ? 'quick-date-btn--active' : ''}`}
                onClick={() => setPickupDate(tomorrowStr)}
              >
                Tomorrow
              </button>
            </div>
          </div>
        </div>

        {/* TIME SLOT SELECTION */}
        <div className="loom-form-group">
          <label htmlFor="pickup-time" className="loom-label">
            PREFERRED PICKUP TIME SLOT <span className="loom-required">*</span>
          </label>
          <select
            id="pickup-time"
            className={`loom-select ${fieldErrors.pickupSlot ? 'loom-input--error' : ''}`}
            value={pickupSlot}
            onChange={(e) => setPickupSlot(e.target.value)}
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
          {fieldErrors.pickupSlot && <span className="loom-error-text">{fieldErrors.pickupSlot}</span>}
        </div>

        {/* SERVICES REQUIRED CHIPS */}
        <div className="loom-form-group">
          <label className="loom-label">
            SERVICES REQUIRED <span className="loom-required">*</span>
          </label>
          <div className="loom-services-grid">
            {servicesData.map((s) => {
              const selected = isServiceSelected(s.name);
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`loom-service-chip ${selected ? 'loom-service-chip--active' : ''}`}
                  onClick={() => handleServiceToggle(s)}
                >
                  <span className="loom-chip-checkbox">{selected ? '✓' : '+'}</span>
                  <span className="loom-chip-name">{s.name}</span>
                  {s.price && <span className="loom-chip-price">{s.price} {s.unit}</span>}
                </button>
              );
            })}

            {/* OTHER SERVICES CHIP */}
            <button
              type="button"
              className={`loom-service-chip ${isServiceSelected('OTHER SERVICES') ? 'loom-service-chip--active' : ''}`}
              onClick={() => handleServiceToggle({ name: 'OTHER SERVICES' })}
            >
              <span className="loom-chip-checkbox">{isServiceSelected('OTHER SERVICES') ? '✓' : '+'}</span>
              <span className="loom-chip-name">OTHER SERVICES</span>
            </button>
          </div>
          {fieldErrors.services && <span className="loom-error-text">{fieldErrors.services}</span>}
        </div>

        {/* CONDITIONAL OTHER SERVICES INPUT */}
        {(isServiceSelected('OTHER SERVICES') || otherServices.trim()) && (
          <div className="loom-form-group">
            <label htmlFor="other-services" className="loom-label">
              SPECIFY OTHER SERVICES <span className="loom-required">*</span>
            </label>
            <input
              id="other-services"
              type="text"
              className={`loom-input ${fieldErrors.otherServices ? 'loom-input--error' : ''}`}
              placeholder="Describe specialized items (e.g. Leather Jacket, Carpet, Curtains)"
              value={otherServices}
              onChange={(e) => setOtherServices(e.target.value)}
            />
            {fieldErrors.otherServices && <span className="loom-error-text">{fieldErrors.otherServices}</span>}
          </div>
        )}

        {/* INTERACTIVE LEAFLET MAP & LOCATION PICKER SECTION */}
        <div className="loom-form-group map-section-group">
          <div className="loom-address-header">
            <label className="loom-label">
              PICKUP LOCATION & INTERACTIVE MAP PIN <span className="loom-required">*</span>
            </label>
            {fieldErrors.location && (
              <span className="loom-error-text loom-error-text--inline">{fieldErrors.location}</span>
            )}
          </div>

          <LocationPicker
            initialLocation={pinnedLocation}
            onLocationSelect={handleLocationSelect}
            onClear={handleClearPin}
          />
        </div>

        {/* DETAILED EDITABLE ADDRESS FIELDS */}
        <div className="loom-form-row">
          <div className="loom-form-group">
            <label htmlFor="house-flat" className="loom-label">
              HOUSE / FLAT / BUILDING / FLOOR <span className="loom-required">*</span>
            </label>
            <input
              id="house-flat"
              type="text"
              className="loom-input"
              placeholder="e.g. Flat 302, Tower B, Lotus Apartments"
              value={houseFlat}
              onChange={(e) => setHouseFlat(e.target.value)}
              required
            />
          </div>

          <div className="loom-form-group">
            <label htmlFor="landmark" className="loom-label">
              LANDMARK / GATE NUMBER <span className="loom-optional">(OPTIONAL)</span>
            </label>
            <input
              id="landmark"
              type="text"
              className="loom-input"
              placeholder="e.g. Opposite Central Park Gate 2"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>
        </div>

        <div className="loom-form-group">
          <label htmlFor="street-address" className="loom-label">
            STREET ADDRESS / LOCALITY / AREA <span className="loom-required">*</span>
          </label>
          <textarea
            id="street-address"
            rows="2"
            className={`loom-textarea ${fieldErrors.streetAddress ? 'loom-input--error' : ''}`}
            placeholder="Enter street name, road, area, and city"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            required
          />
          {fieldErrors.streetAddress && <span className="loom-error-text">{fieldErrors.streetAddress}</span>}
        </div>

        <div className="loom-form-row">
          <div className="loom-form-group">
            <label htmlFor="area" className="loom-label">
              NEAREST AREA / SECTOR <span className="loom-optional">(OPTIONAL)</span>
            </label>
            <input
              id="area"
              type="text"
              className="loom-input"
              placeholder="e.g. Sector 57, Gurugram"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>

          <div className="loom-form-group">
            <label htmlFor="pincode" className="loom-label">
              PIN CODE <span className="loom-optional">(OPTIONAL)</span>
            </label>
            <input
              id="pincode"
              type="text"
              className="loom-input"
              placeholder="e.g. 122011"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
        </div>

        {/* SPECIAL INSTRUCTIONS */}
        <div className="loom-form-group">
          <label htmlFor="special-instructions" className="loom-label">
            SPECIAL INSTRUCTIONS <span className="loom-optional">(OPTIONAL)</span>
          </label>
          <textarea
            id="special-instructions"
            rows="2"
            className="loom-textarea"
            placeholder="e.g. Call before arriving, leave at security gate, fabric care notes..."
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="loom-form-submit">
          <button
            type="submit"
            className={`loom-submit-btn ${isSubmitting ? 'loom-submit-btn--loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>BOOKING PICKUP...</span>
            ) : (
              <>
                <span>CONFIRM PICKUP REQUEST</span>
                <span className="loom-submit-arrow">→</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PickupBookingForm;
