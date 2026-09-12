import { sendPickupTemplates, normalizePhoneForGallabox } from './gallabox.service.js';

export const ALLOWED_PICKUP_SLOTS = [
  'Morning (9 AM – 12 PM)',
  'Afternoon (12 PM – 4 PM)',
  'Evening (4 PM – 8 PM)',
  'Express / Immediate Pickup'
];

/**
 * Process Pickup Booking Payload
 * Sends pickup notification via Gallabox WhatsApp Service (No DB persistence)
 * @param {Object} rawPayload 
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const createPickupBooking = async (rawPayload) => {
  const {
    fullName,
    phone,
    email,
    preferredPickupTime,
    services,
    otherServices,
    pickupAddress,
    area,
    latitude,
    longitude,
    source = 'website'
  } = rawPayload || {};

  // Server-side validation
  const errors = [];
  
  const trimmedName = typeof fullName === 'string' ? fullName.trim() : '';
  if (!trimmedName) {
    errors.push('Full name is required.');
  }

  const normalizedPhone = normalizePhoneForGallabox(phone);
  if (!normalizedPhone || normalizedPhone.length < 10) {
    errors.push('A valid phone number is required (e.g. +91 9876543210).');
  }

  const trimmedTime = typeof preferredPickupTime === 'string' ? preferredPickupTime.trim() : '';
  if (!trimmedTime) {
    errors.push('Preferred pickup time is required.');
  } else if (!ALLOWED_PICKUP_SLOTS.includes(trimmedTime)) {
    errors.push(`Invalid pickup time slot. Allowed slots: ${ALLOWED_PICKUP_SLOTS.join(', ')}`);
  }

  if (!Array.isArray(services) || services.length === 0) {
    errors.push('At least one service must be selected.');
  }

  const trimmedAddress = typeof pickupAddress === 'string' ? pickupAddress.trim() : '';
  if (!trimmedAddress) {
    errors.push('Pickup address is required.');
  }

  if (errors.length > 0) {
    const errorObj = new Error(errors.join(' '));
    errorObj.statusCode = 400;
    errorObj.validationErrors = errors;
    throw errorObj;
  }

  // Format booking data for Gallabox WhatsApp integration
  const bookingData = {
    customerName: trimmedName,
    phone: normalizedPhone,
    email: email && typeof email === 'string' ? email.trim() : undefined,
    pickupTime: trimmedTime,
    services: services.map((s) => ({
      name: typeof s === 'string' ? s : s.name,
      price: typeof s === 'object' && s.price ? s.price : undefined
    })),
    otherServices: otherServices && typeof otherServices === 'string' ? otherServices.trim() : undefined,
    address: trimmedAddress,
    area: area && typeof area === 'string' ? area.trim() : undefined,
    latitude: typeof latitude === 'number' ? latitude : undefined,
    longitude: typeof longitude === 'number' ? longitude : undefined,
    source
  };

  // Dispatch to Gallabox Service (Team Notification & Customer Confirmation)
  const result = await sendPickupTemplates(bookingData);

  return {
    success: true,
    message: result.message || 'Pickup request sent successfully.',
    mock: result.mock
  };
};
