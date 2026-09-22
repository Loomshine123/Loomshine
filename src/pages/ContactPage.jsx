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
  useEffect(() => {
    document.title = 'Book a Pickup | LOOMSHINE Luxury Garment Care';
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

      {/* FORM / CONCIERGE SECTION */}
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

          {/* RIGHT: UNIFIED PICKUP BOOKING FORM */}
          <div className="contact-form-wrapper">
            <PickupBookingForm
              source="contact"
              initialService={initialService}
              initialItem={initialItem}
            />
          </div>
        </div>
      </section>
    </main>
  );
}