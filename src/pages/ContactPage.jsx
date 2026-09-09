import { useState, useEffect, useRef } from "react";
import LocationPicker from "../components/common/LocationPicker";
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

export default function ContactPage() {
  useEffect(() => {
    document.title = "Book a Pickup | LOOMSHINE Luxury Garment Care";
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    services: ["Wash & Fold"], // Multi-select array
    otherServices: "", // Dedicated column for other services
    pickupSlot: "Morning (9 AM – 12 PM)",
    flatBuilding: "",
    address: "",
    landmark: "",
    pincode: "",
    message: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [pinnedLocation, setPinnedLocation] = useState(null);

  const dropdownRef = useRef(null);

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

  // Handle location update from LocationPicker (GPS detection, Area Search, or Map Pin Drag)
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.services.length === 0 && !formData.otherServices.trim()) {
      alert("Please select at least one service or specify your requirement in 'Other Services'.");
      return;
    }

    const payload = {
      ...formData,
      pinnedLocation,
      submittedAt: new Date().toISOString(),
    };

    console.log("Pickup Request Payload:", payload);
    setSubmitted(true);

    alert(
      `Thank you, ${formData.name}! Your pickup request has been scheduled.\n` +
      `Services: ${formData.services.join(", ") || formData.otherServices}\n` +
      `Our logistics executive will arrive at your address.`
    );

    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      services: ["Wash & Fold"],
      otherServices: "",
      pickupSlot: "Morning (9 AM – 12 PM)",
      flatBuilding: "",
      address: "",
      landmark: "",
      pincode: "",
      message: "",
    });
    setPinnedLocation(null);
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
            Schedule a convenient pickup and let Loomshine take care of your laundry, steam pressing, and dry cleaning needs.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="contact-form-section">
        <div className="contact-container contact-layout">
          {/* LEFT: INFO & BENEFITS */}
          <div className="contact-info">
            <span className="contact-section-label">GET STARTED</span>
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

          {/* RIGHT: PICKUP FORM */}
          <form className="pickup-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <span>BOOK YOUR PICKUP</span>
              <h2>LET'S GET STARTED</h2>
            </div>

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

            {/* GRID ROW 2: EMAIL & PREFERRED TIME */}
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
                <label htmlFor="slot-select">PREFERRED PICKUP TIME</label>
                <select
                  id="slot-select"
                  name="pickupSlot"
                  value={formData.pickupSlot}
                  onChange={handleChange}
                >
                  <option value="Morning (9 AM – 12 PM)">Morning (9 AM – 12 PM)</option>
                  <option value="Afternoon (12 PM – 4 PM)">Afternoon (12 PM – 4 PM)</option>
                  <option value="Evening (4 PM – 8 PM)">Evening (4 PM – 8 PM)</option>
                  <option value="Express / Immediate">Express / Immediate Pickup</option>
                </select>
              </div>
            </div>

            {/* GRID ROW 3: SERVICE REQUIRED (MULTI-SELECT) & OTHER SERVICES */}
            <div className="form-grid form-row-spacing">
              {/* MULTI-SELECT DROPDOWN */}
              <div className="form-group multi-select-group" ref={dropdownRef}>
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

              {/* OTHER SERVICES COLUMN */}
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
            <button type="submit" className="submit-pickup-btn">
              <span>REQUEST PICKUP</span>
              <span>→</span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}