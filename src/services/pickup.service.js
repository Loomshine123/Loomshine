/**
 * Frontend Pickup Booking Service
 * Communicates with backend API (POST /api/pickup-booking)
 */

/**
 * Safely format API Base URL without trailing slashes or duplicate /api
 * @param {string} baseUrl 
 * @returns {string}
 */
const getApiUrl = () => {
  const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const cleanUrl = rawUrl.replace(/\/+$/, '');
  
  if (cleanUrl.endsWith('/api')) {
    return `${cleanUrl}/pickup-booking`;
  }
  return `${cleanUrl}/api/pickup-booking`;
};

/**
 * Normalize Indian Phone Number for payload
 * @param {string} phone 
 * @returns {string}
 */
const normalizePhoneForPayload = (phone) => {
  if (!phone) return '';
  let cleaned = String(phone).trim();
  const hasPlus = cleaned.startsWith('+');
  cleaned = cleaned.replace(/\D/g, '');

  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+${cleaned}`;
  } else if (hasPlus && cleaned.length >= 10) {
    return `+${cleaned}`;
  }
  return phone.trim();
};

/**
 * Submit Pickup Booking Payload to Backend API
 * @param {Object} payload 
 * @returns {Promise<{success: boolean, bookingId: string, message: string}>}
 */
export const submitPickupBooking = async (payload) => {
  const endpoint = getApiUrl();

  // Normalize payload fields before sending
  const normalizedPayload = {
    fullName: (payload.fullName || '').trim(),
    phone: normalizePhoneForPayload(payload.phone),
    email: payload.email ? payload.email.trim() : undefined,
    preferredPickupTime: (payload.preferredPickupTime || '').trim(),
    services: Array.isArray(payload.services)
      ? payload.services.map((s) => {
          if (typeof s === 'string') return { name: s };
          return { name: s.name, price: s.price };
        })
      : [],
    otherServices: payload.otherServices ? payload.otherServices.trim() : undefined,
    pickupAddress: (payload.pickupAddress || '').trim(),
    area: payload.area ? payload.area.trim() : undefined,
    latitude: typeof payload.latitude === 'number' ? payload.latitude : undefined,
    longitude: typeof payload.longitude === 'number' ? payload.longitude : undefined,
    source: payload.source || 'website'
  };

  // Remove undefined properties
  Object.keys(normalizedPayload).forEach((key) => {
    if (normalizedPayload[key] === undefined) {
      delete normalizedPayload[key];
    }
  });

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(normalizedPayload)
    });

    let data;
    try {
      data = await response.json();
    } catch (_parseErr) {
      data = null;
    }

    if (!response.ok) {
      const errorMessage =
        (data && data.message) ||
        "We couldn't submit your pickup request right now. Please try again.";
      
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    // If it's a fetch network error or backend offline
    if (!error.status) {
      const networkError = new Error(
        "We couldn't reach the pickup server right now. Please check your internet connection or try again shortly."
      );
      networkError.isNetworkError = true;
      throw networkError;
    }
    throw error;
  }
};
