import React, { useState } from 'react';
import servicesData from '../../data/servicesData';
import { submitPickupBooking } from '../../services/pickup.service';
import './PickupBookingForm.css';

const TIME_SLOTS = [
  'Morning (9 AM – 12 PM)',
  'Afternoon (12 PM – 4 PM)',
  'Evening (4 PM – 8 PM)',
  'Express / Immediate Pickup'
];

export const PickupBookingForm = ({ onBookingSuccess }) => {
  // Form Field States
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredPickupTime, setPreferredPickupTime] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [otherServices, setOtherServices] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [area, setArea] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');

  // Form Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [bookingResult, setBookingResult] = useState(null);

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

  // Browser Geolocation Detector
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationStatus('Detecting coordinates...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = parseFloat(position.coords.latitude.toFixed(6));
        const lng = parseFloat(position.coords.longitude.toFixed(6));
        setLatitude(lat);
        setLongitude(lng);
        setIsLocating(false);
        setLocationStatus(`Location pin attached (${lat}, ${lng})`);
      },
      (err) => {
        setIsLocating(false);
        setLocationStatus('Could not fetch exact coordinates. Please enter address manually.');
        console.warn('Geolocation error:', err.message);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
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

    if (!preferredPickupTime) {
      errors.preferredPickupTime = 'Please select a preferred pickup time slot.';
    }

    if (selectedServices.length === 0) {
      errors.services = 'Please select at least one service required.';
    }

    if (isServiceSelected('OTHER SERVICES') && !otherServices.trim()) {
      errors.otherServices = 'Please specify your other service requirements.';
    }

    if (!pickupAddress.trim()) {
      errors.pickupAddress = 'Pickup address is required.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validateForm()) {
      setErrorMsg('Please complete all required fields highlighted in red.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      fullName,
      phone,
      email: email || undefined,
      preferredPickupTime,
      services: selectedServices,
      otherServices: isServiceSelected('OTHER SERVICES') ? otherServices : undefined,
      pickupAddress,
      area: area || undefined,
      latitude: latitude !== null ? latitude : undefined,
      longitude: longitude !== null ? longitude : undefined,
      source: 'website'
    };

    try {
      const response = await submitPickupBooking(payload);
      setIsSubmitting(false);
      setBookingResult(response);
      
      if (onBookingSuccess) {
        onBookingSuccess(response);
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(
        err.message || "We couldn't submit your pickup request right now. Please try again."
      );
    }
  };

  // Reset Form for another booking
  const handleResetForm = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    setPreferredPickupTime('');
    setSelectedServices([]);
    setOtherServices('');
    setPickupAddress('');
    setArea('');
    setLatitude(null);
    setLongitude(null);
    setLocationStatus('');
    setBookingResult(null);
    setErrorMsg('');
    setFieldErrors({});
  };

  // Render Success Banner
  if (bookingResult && bookingResult.success) {
    return (
      <div className="loom-pickup-success">
        <div className="loom-pickup-success__badge">✓ REQUEST CONFIRMED</div>
        <h2 className="loom-pickup-success__heading">PICKUP BOOKED SUCCESSFULLY</h2>
        <p className="loom-pickup-success__subheading">
          {bookingResult.message || "Pickup request received successfully. We'll contact you shortly on WhatsApp."}
        </p>

        {bookingResult.bookingId && (
          <div className="loom-pickup-success__reference">
            <span className="loom-ref-label">BOOKING REFERENCE ID:</span>
            <strong className="loom-ref-id">{bookingResult.bookingId}</strong>
          </div>
        )}

        <div className="loom-pickup-success__actions">
          <button
            type="button"
            className="loom-btn-primary"
            onClick={handleResetForm}
          >
            Book Another Pickup
          </button>
          <a href="#track-order" className="loom-btn-secondary">
            Track Order Status →
          </a>
        </div>
      </div>
    );
  }

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
        {/* Full Name & Phone Row */}
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

        {/* Email & Preferred Time Slot Row */}
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
            <label htmlFor="pickup-time" className="loom-label">
              PREFERRED PICKUP TIME <span className="loom-required">*</span>
            </label>
            <select
              id="pickup-time"
              className={`loom-select ${fieldErrors.preferredPickupTime ? 'loom-input--error' : ''}`}
              value={preferredPickupTime}
              onChange={(e) => setPreferredPickupTime(e.target.value)}
              required
            >
              <option value="">Select a pickup time slot</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {fieldErrors.preferredPickupTime && (
              <span className="loom-error-text">{fieldErrors.preferredPickupTime}</span>
            )}
          </div>
        </div>

        {/* Services Required Multi-select */}
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
                  {s.price && <span className="loom-chip-price">{s.price}</span>}
                </button>
              );
            })}

            {/* Other Services Option */}
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

        {/* Conditional Other Services Input */}
        {isServiceSelected('OTHER SERVICES') && (
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
            {fieldErrors.otherServices && (
              <span className="loom-error-text">{fieldErrors.otherServices}</span>
            )}
          </div>
        )}

        {/* Pickup Address & Location Pin */}
        <div className="loom-form-group">
          <div className="loom-address-header">
            <label htmlFor="pickup-address" className="loom-label">
              PICKUP ADDRESS & LOCATION PIN <span className="loom-required">*</span>
            </label>
            <button
              type="button"
              className="loom-btn-location"
              onClick={handleDetectLocation}
              disabled={isLocating}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polygon points="12 8 8 16 12 14 16 16 12 8" />
              </svg>
              <span>{isLocating ? 'Detecting Location...' : 'Use Current Location'}</span>
            </button>
          </div>

          <textarea
            id="pickup-address"
            rows="3"
            className={`loom-textarea ${fieldErrors.pickupAddress ? 'loom-input--error' : ''}`}
            placeholder="Flat/House No., Building Name, Street Address, Landmark, City, Pincode"
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)}
            required
          />
          {fieldErrors.pickupAddress && (
            <span className="loom-error-text">{fieldErrors.pickupAddress}</span>
          )}

          {locationStatus && (
            <div className="loom-location-status">
              <span className="loom-status-dot" />
              <span>{locationStatus}</span>
            </div>
          )}
        </div>

        {/* Detected Area */}
        <div className="loom-form-group">
          <label htmlFor="pickup-area" className="loom-label">
            DETECTED / NEAREST AREA <span className="loom-optional">(OPTIONAL)</span>
          </label>
          <input
            id="pickup-area"
            type="text"
            className="loom-input"
            placeholder="e.g. South Extension II, New Delhi or Sector 54, Gurugram"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>

        {/* Submit Button */}
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
