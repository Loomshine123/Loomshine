import { sendPickupTemplates, normalizePhoneForGallabox } from './gallabox.service.js';

export const CANONICAL_PICKUP_SLOTS = [
  'Morning (9 AM – 12 PM)',
  'Afternoon (12 PM – 4 PM)',
  'Evening (4 PM – 8 PM)',
  'Express / Immediate Pickup'
];

export const ALLOWED_PICKUP_SLOTS = CANONICAL_PICKUP_SLOTS;

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
    pickupDate,
    pickupSlot,
    services,
    cartItems,
    otherServices,
    pickupAddress,
    houseFlat,
    streetAddress,
    landmark,
    area,
    pincode,
    city,
    state,
    specialInstructions,
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

  const rawSlot = typeof pickupSlot === 'string' ? pickupSlot.trim() : '';
  const rawTime = typeof preferredPickupTime === 'string' ? preferredPickupTime.trim() : '';
  const inputToValidate = rawSlot || rawTime;

  const normalizeDashes = (str) => String(str || '').replace(/[\u2010-\u2015\u2212]/g, '-').trim();
  const normInput = normalizeDashes(inputToValidate).toLowerCase();

  const canonicalMatch = CANONICAL_PICKUP_SLOTS.find((slot) => {
    const normSlot = normalizeDashes(slot).toLowerCase();
    if (normInput === normSlot) return true;
    if (normInput.includes(normSlot)) return true;
    if (normSlot.includes('morning') && normInput.includes('morning')) return true;
    if (normSlot.includes('afternoon') && normInput.includes('afternoon')) return true;
    if (normSlot.includes('evening') && normInput.includes('evening')) return true;
    if (normSlot.includes('express') && normInput.includes('express')) return true;
    return false;
  });

  if (!inputToValidate || !canonicalMatch) {
    errors.push(`Invalid pickup time slot. Allowed slots: ${CANONICAL_PICKUP_SLOTS.join(', ')}`);
  }

  const hasServices = Array.isArray(services) && services.length > 0;
  const hasCartItems = Array.isArray(cartItems) && cartItems.length > 0;
  const hasOther = typeof otherServices === 'string' && otherServices.trim().length > 0;

  if (!hasServices && !hasCartItems && !hasOther) {
    errors.push('At least one service or shopping bag item must be selected.');
  }

  const trimmedAddress = typeof pickupAddress === 'string' ? pickupAddress.trim() : '';
  if (!trimmedAddress) {
    errors.push('Pickup address is required.');
  }

  const parsedLat = typeof latitude === 'number' ? latitude : (typeof latitude === 'string' && String(latitude).trim() !== '' && !isNaN(Number(latitude)) ? Number(latitude) : undefined);
  const parsedLng = typeof longitude === 'number' ? longitude : (typeof longitude === 'string' && String(longitude).trim() !== '' && !isNaN(Number(longitude)) ? Number(longitude) : undefined);

  if (parsedLat === undefined || parsedLng === undefined || isNaN(parsedLat) || isNaN(parsedLng) || parsedLat < -90 || parsedLat > 90 || parsedLng < -180 || parsedLng > 180) {
    errors.push('Please select your exact pickup location on the map before submitting.');
  }

  if (errors.length > 0) {
    const errorObj = new Error(errors.join(' '));
    errorObj.statusCode = 400;
    errorObj.validationErrors = errors;
    throw errorObj;
  }

  let extractedDate = pickupDate && typeof pickupDate === 'string' ? pickupDate.trim() : '';
  if (!extractedDate && rawTime.includes('·')) {
    extractedDate = rawTime.split('·')[0].trim();
  }

  const canonicalSlot = canonicalMatch;
  const humanReadableTime = extractedDate ? `${extractedDate} · ${canonicalSlot}` : canonicalSlot;

  // Format booking data for Gallabox WhatsApp integration
  const bookingData = {
    customerName: trimmedName,
    phone: normalizedPhone,
    email: email && typeof email === 'string' ? email.trim() : undefined,
    pickupTime: humanReadableTime,
    pickupDate: extractedDate || undefined,
    pickupSlot: canonicalSlot,
    services: hasServices ? services.map((s) => ({
      name: typeof s === 'string' ? s : s.name,
      price: typeof s === 'object' && s.price ? s.price : undefined
    })) : [],
    cartItems: hasCartItems ? cartItems : [],
    otherServices: hasOther ? otherServices.trim() : undefined,
    houseFlat: houseFlat && typeof houseFlat === 'string' ? houseFlat.trim() : undefined,
    streetAddress: streetAddress && typeof streetAddress === 'string' ? streetAddress.trim() : undefined,
    landmark: landmark && typeof landmark === 'string' ? landmark.trim() : undefined,
    address: trimmedAddress,
    area: area && typeof area === 'string' ? area.trim() : undefined,
    pincode: pincode && typeof pincode === 'string' ? pincode.trim() : undefined,
    city: city && typeof city === 'string' ? city.trim() : undefined,
    state: state && typeof state === 'string' ? state.trim() : undefined,
    specialInstructions: specialInstructions && typeof specialInstructions === 'string' ? specialInstructions.trim() : undefined,
    latitude: parsedLat,
    longitude: parsedLng,
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
