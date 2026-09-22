/**
 * Gallabox Service Integration
 * Handles outbound WhatsApp messages via Gallabox API
 * Endpoint: POST https://server.gallabox.com/devapi/messages/whatsapp
 */

/**
 * Centralized WhatsApp Template Parameter Sanitizer.
 * Meta template parameters CANNOT contain \n, \r, \t, or >4 consecutive spaces.
 * @param {any} value 
 * @returns {string} Single-line string sanitized of newlines/tabs/extra spaces.
 */
export const sanitizeTemplateParam = (value) => {
  if (value === null || value === undefined) return '';
  let str = typeof value === 'string' ? value : String(value);
  str = str.replace(/[\r\n\t]+/g, ' ');
  str = str.replace(/\s+/g, ' ');
  return str.trim();
};

/**
 * Recursively sanitize all parameter strings in a Gallabox/WhatsApp payload boundary.
 * Leaves structural keys intact while sanitizing all parameter values.
 * @param {any} obj 
 * @returns {any} Sanitized object
 */
export const sanitizePayloadBoundary = (obj) => {
  if (obj === null || obj === undefined) return '';
  if (typeof obj === 'number' || typeof obj === 'boolean') return obj;

  if (typeof obj === 'string') {
    return sanitizeTemplateParam(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizePayloadBoundary(item));
  }

  if (typeof obj === 'object') {
    const sanitizedObj = {};
    for (const [key, value] of Object.entries(obj)) {
      if (['templateName', 'channelId', 'channelType', 'phone', 'type', 'index', 'sub_type'].includes(key)) {
        sanitizedObj[key] = value;
      } else {
        sanitizedObj[key] = sanitizePayloadBoundary(value);
      }
    }
    return sanitizedObj;
  }

  return String(obj);
};

/**
 * Strict runtime assertion for WhatsApp template parameters.
 * Throws an error if any parameter contains \n, \r, \t, excessive spaces, or null/undefined.
 * @param {Object} payload 
 */
export const assertWhatsAppPayloadSafety = (payload) => {
  const templateObj = payload?.whatsapp?.template;
  if (!templateObj) return;

  const checkValue = (val, path) => {
    if (val === undefined || val === null) {
      throw new Error(`Unsafe WhatsApp template parameter detected: ${path} is ${val}`);
    }
    if (typeof val === 'string') {
      if (val.includes('\n') || val.includes('\r') || val.includes('\t')) {
        throw new Error(`Unsafe WhatsApp template parameter detected: ${path} contains newline/tab`);
      }
      if (/\s{5,}/.test(val)) {
        throw new Error(`Unsafe WhatsApp template parameter detected: ${path} contains >4 consecutive spaces`);
      }
    }
  };

  const walk = (obj, path) => {
    if (!obj) return;
    if (typeof obj === 'string') {
      checkValue(obj, path);
    } else if (Array.isArray(obj)) {
      obj.forEach((item, idx) => walk(item, `${path}[${idx}]`));
    } else if (typeof obj === 'object') {
      for (const [k, v] of Object.entries(obj)) {
        walk(v, `${path}.${k}`);
      }
    }
  };

  if (templateObj.bodyValues) {
    walk(templateObj.bodyValues, 'bodyValues');
  }
  if (templateObj.buttonValues) {
    walk(templateObj.buttonValues, 'buttonValues');
  }
};

/**
 * Validate and sanitize all parameters in bodyValues before sending to Gallabox
 * @param {Object} bodyValues 
 * @returns {Object} Sanitized bodyValues
 */
export const sanitizeAndValidateBodyValues = (bodyValues) => {
  const sanitized = {};
  for (const key of Object.keys(bodyValues)) {
    const val = sanitizeTemplateParam(bodyValues[key]);
    if (/[\r\n\t]/.test(val) || /\s{5,}/.test(val)) {
      throw new Error(`Unsafe WhatsApp template parameter detected for variable {{${key}}}`);
    }
    sanitized[key] = val;
  }
  return sanitized;
};

/**
 * Normalize Indian phone numbers for Gallabox API format (e.g. 919876543210)
 * @param {string} phone 
 * @returns {string}
 */
export const normalizePhoneForGallabox = (phone) => {
  if (!phone || typeof phone !== 'string') return '';
  let cleaned = phone.trim().replace(/\D/g, '');
  if (!cleaned) return '';

  if (cleaned.length === 10) {
    return `91${cleaned}`;
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return cleaned;
  }
  return cleaned;
};

/**
 * Format Contact Info for Variable {{2}}
 * Single-line format: Phone: +91 7877161550 | Email: manish@example.com
 * @param {string} phone 
 * @param {string} [email] 
 * @returns {string}
 */
export const formatContactInfo = (phone, email) => {
  let displayPhone = phone || '';
  if (phone) {
    const cleaned = String(phone).replace(/\D/g, '');
    if (cleaned.length === 10) {
      displayPhone = `+91 ${cleaned}`;
    } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
      displayPhone = `+91 ${cleaned.slice(2)}`;
    }
  }
  const displayEmail = email && typeof email === 'string' && email.trim() ? email.trim() : 'Not provided';
  return sanitizeTemplateParam(`Phone: ${displayPhone} | Email: ${displayEmail}`);
};

/**
 * Format Items & Services for Variable {{4}}
 * Single-line format without newlines or bullets.
 * Example: Bag Items: Kurta Pyjama × 1 — ₹250 | Services: Dry Cleaning | Estimated Subtotal: ₹250
 * @param {Array} services 
 * @param {string} [otherServices] 
 * @param {Array} [cartItems]
 * @returns {string}
 */
export const formatItemsAndServices = (services, otherServices, cartItems) => {
  const parts = [];

  // 1. Cart Products
  if (Array.isArray(cartItems) && cartItems.length > 0) {
    const bagItemStrings = cartItems.map((item) => {
      const name = sanitizeTemplateParam(item.name || 'Garment Item');
      const qty = Number(item.quantity) || 1;
      const price = Number(item.price) || 0;
      const itemTotal = price * qty;
      return `${name} × ${qty} — ₹${itemTotal}`;
    });
    if (bagItemStrings.length > 0) {
      parts.push(`Bag Items: ${bagItemStrings.join(' | ')}`);
    }
  }

  // 2. Selected Services
  const serviceNames = [];
  if (Array.isArray(services)) {
    services.forEach((s) => {
      const rawName = typeof s === 'string' ? s : s?.name;
      const cleanName = sanitizeTemplateParam(rawName);
      if (cleanName && cleanName.toUpperCase() !== 'OTHER SERVICES') {
        // Remove leading bullets if present in service name
        const noBulletName = cleanName.replace(/^[•\-\*]\s*/, '').trim();
        if (noBulletName) serviceNames.push(noBulletName);
      }
    });
  }
  if (otherServices && typeof otherServices === 'string' && otherServices.trim()) {
    serviceNames.push(`Other: ${sanitizeTemplateParam(otherServices)}`);
  }

  if (serviceNames.length > 0) {
    parts.push(`Services: ${serviceNames.join(', ')}`);
  }

  // 3. Estimated Subtotal (only if cart items present)
  if (Array.isArray(cartItems) && cartItems.length > 0) {
    let subtotal = 0;
    cartItems.forEach((item) => {
      const qty = Number(item.quantity) || 1;
      const price = Number(item.price) || 0;
      subtotal += price * qty;
    });
    parts.push(`Estimated Subtotal: ₹${subtotal}`);
  }

  const result = parts.length > 0 ? parts.join(' | ') : 'Services: Garment Care';
  return sanitizeTemplateParam(result);
};

/**
 * Format Pickup Address for Variable {{5}}
 * Single-line format: House / Flat: Flat 302, Tower B | Street / Locality: Golf Course Road | Landmark: Opposite Central Park Gate 2
 * @param {Object} bookingData 
 * @returns {string}
 */
export const formatPickupAddress = (bookingData = {}) => {
  const { houseFlat, streetAddress, landmark, address } = bookingData;
  const parts = [];

  if (houseFlat && String(houseFlat).trim()) {
    parts.push(`House / Flat: ${sanitizeTemplateParam(houseFlat)}`);
  }
  if (streetAddress && String(streetAddress).trim()) {
    parts.push(`Street / Locality: ${sanitizeTemplateParam(streetAddress)}`);
  }
  if (landmark && String(landmark).trim()) {
    parts.push(`Landmark: ${sanitizeTemplateParam(landmark)}`);
  }

  if (parts.length > 0) {
    return sanitizeTemplateParam(parts.join(' | '));
  }

  return sanitizeTemplateParam(address && String(address).trim() ? address : 'Address provided');
};

/**
 * Format Area & Pin Code for Variable {{6}}
 * Single-line format: Pioneer Park, Sector 60, Gurgaon, Haryana — 122011
 * @param {Object} bookingData 
 * @returns {string}
 */
export const formatAreaAndPinCode = (bookingData = {}) => {
  const { area, city, state, pincode, address } = bookingData;
  const parts = [];

  if (area && String(area).trim()) parts.push(sanitizeTemplateParam(area));
  if (city && String(city).trim()) parts.push(sanitizeTemplateParam(city));
  if (state && String(state).trim()) parts.push(sanitizeTemplateParam(state));

  let mainStr = parts.join(', ');
  if (pincode && String(pincode).trim()) {
    const cleanPin = sanitizeTemplateParam(pincode);
    mainStr = mainStr ? `${mainStr} — ${cleanPin}` : cleanPin;
  }

  if (mainStr) return sanitizeTemplateParam(mainStr);
  return sanitizeTemplateParam(address && String(address).trim() ? address : 'Gurugram, Haryana');
};

/**
 * Format Special Instructions for Variable {{7}}
 * Single-line format
 * @param {string} [specialInstructions] 
 * @returns {string}
 */
export const formatSpecialInstructions = (specialInstructions) => {
  if (specialInstructions && typeof specialInstructions === 'string' && specialInstructions.trim()) {
    return sanitizeTemplateParam(specialInstructions);
  }
  return 'No special instructions provided.';
};

/**
 * Backward compatibility alias for single service string format
 */
export const formatServicesString = formatItemsAndServices;

/**
 * Validate final Team Template Payload before sending to Gallabox API.
 * Throws a backend validation error if any requirement is not met.
 * @param {Object} payload 
 */
export const validateTeamPayloadBeforeDispatch = (payload) => {
  if (!payload.channelId) {
    throw new Error('Gallabox validation failed: channelId is missing.');
  }
  if (!payload.recipient?.name || !payload.recipient?.phone) {
    throw new Error('Gallabox validation failed: recipient name or phone is missing.');
  }
  
  const template = payload.whatsapp?.template;
  if (!template || !template.templateName) {
    throw new Error('Gallabox validation failed: templateName is missing.');
  }

  const bodyValues = template.bodyValues;
  if (!bodyValues || typeof bodyValues !== 'object') {
    throw new Error('Gallabox validation failed: bodyValues is missing.');
  }

  const bodyKeys = Object.keys(bodyValues);
  if (bodyKeys.length !== 8) {
    throw new Error(`Gallabox validation failed: bodyValues must contain exactly 8 keys, got ${bodyKeys.length}`);
  }

  for (let i = 1; i <= 8; i++) {
    const key = String(i);
    const val = bodyValues[key];
    if (typeof val !== 'string' || val === '' || val === null || val === undefined) {
      throw new Error(`Gallabox validation failed: bodyValues["${key}"] must be a non-empty string.`);
    }
    if (val.includes('\n') || val.includes('\r') || val.includes('\t')) {
      throw new Error(`Gallabox validation failed: bodyValues["${key}"] contains newline or tab.`);
    }
  }

  const buttonValues = template.buttonValues;
  if (!Array.isArray(buttonValues) || buttonValues.length !== 1) {
    throw new Error('Gallabox validation failed: buttonValues must be an array with exactly 1 button.');
  }

  const btn = buttonValues[0];
  if (typeof btn.index !== 'number' || btn.index !== 0) {
    throw new Error(`Gallabox validation failed: button index must be numeric 0, got ${btn.index}`);
  }
  if (btn.sub_type !== 'url') {
    throw new Error(`Gallabox validation failed: button sub_type must be "url", got ${btn.sub_type}`);
  }
  if (!btn.parameters || btn.parameters.type !== 'text' || typeof btn.parameters.text !== 'string' || !btn.parameters.text) {
    throw new Error('Gallabox validation failed: button parameters.text must be a non-empty string.');
  }
  if (btn.parameters.text !== bodyValues["8"]) {
    throw new Error(`Gallabox validation failed: button coordinate (${btn.parameters.text}) does not match bodyValues["8"] (${bodyValues["8"]}).`);
  }
};

/**
 * Construct Team Notification Template Payload (loomshine_new_pickup_request_2 - 8 variables + 1 Dynamic URL Button parameter)
 * Reproduces the canonical working Postman request structure.
>>>>>>> origin/master
 * @param {Object} bookingData 
 * @returns {Object}
 */
export const buildTeamTemplatePayload = (bookingData) => {
  const {
    customerName,
    phone,
    email,
    pickupTime,
    services,
    otherServices,
    cartItems,
    specialInstructions,
    latitude,
    longitude
  } = bookingData;

  const templateName = process.env.GALLABOX_PICKUP_TEMPLATE_NAME || 'loomshine_new_pickup_request_2';
  if (!templateName) {
    console.error('[Gallabox Error] Missing GALLABOX_PICKUP_TEMPLATE_NAME environment variable.');
    const configError = new Error('Server configuration error: missing pickup template name.');
    configError.statusCode = 500;
    throw configError;
  }

  const cleanName = sanitizeTemplateParam(customerName);
  const cleanPickupTime = sanitizeTemplateParam(pickupTime);
  const contactInfo = formatContactInfo(phone, email);
  const itemsAndServices = formatItemsAndServices(services, otherServices, cartItems);
  const pickupAddressFormatted = formatPickupAddress(bookingData);
  const areaAndPinCode = formatAreaAndPinCode(bookingData);
  const instructionsFormatted = formatSpecialInstructions(specialInstructions);

  // Variable 8 / Button Parameter: Exact latitude,longitude from customer's map selection
  const parsedLat = Number(latitude);
  const parsedLng = Number(longitude);
  if (latitude === undefined || latitude === null || longitude === undefined || longitude === null || isNaN(parsedLat) || isNaN(parsedLng) || parsedLat < -90 || parsedLat > 90 || parsedLng < -180 || parsedLng > 180) {
    const errorObj = new Error('Pickup location coordinates are required.');
    errorObj.statusCode = 400;
    throw errorObj;
  }

  const locationCoords = sanitizeTemplateParam(`${parsedLat},${parsedLng}`);

  const rawBodyValues = {
    "1": cleanName,
    "2": contactInfo,
    "3": cleanPickupTime,
    "4": itemsAndServices,
    "5": pickupAddressFormatted,
    "6": areaAndPinCode,
    "7": instructionsFormatted,
    "8": locationCoords
  };

  const sanitizedBodyValues = sanitizeAndValidateBodyValues(rawBodyValues);

  const channelId = process.env.GALLABOX_CHANNEL_ID || '6aa11ad775795e015df71b70';
  const teamRecipientPhone = process.env.GALLABOX_PICKUP_TEAM_PHONE || '918877286066';

  const rawPayload = {
    channelId,
    channelType: 'whatsapp',
    recipient: {
      name: 'Loomshine Team',
      phone: normalizePhoneForGallabox(teamRecipientPhone)
    },
    whatsapp: {
      type: 'template',
      template: {
        templateName,
        bodyValues: sanitizedBodyValues,
        buttonValues: [
          {
            index: 0,
            sub_type: 'url',
            parameters: {
              type: 'text',
              text: locationCoords
            }
          }
        ]
      }
    }
  };

  const sanitizedPayload = sanitizePayloadBoundary(rawPayload);
  validateTeamPayloadBeforeDispatch(sanitizedPayload);

  return sanitizedPayload;
};

/**
 * Construct Customer Confirmation Template Payload (loomshine_pickup_confirmation - 4 variables)
 * @param {Object} bookingData 
 * @returns {Object}
 */
export const buildCustomerTemplatePayload = (bookingData) => {
  const {
    customerName,
    phone,
    pickupTime,
    services,
    otherServices,
    cartItems,
    address
  } = bookingData;

  const normalizedCustomerPhone = normalizePhoneForGallabox(phone);
  const cleanCustomerName = sanitizeTemplateParam(customerName);
  const cleanPickupTime = sanitizeTemplateParam(pickupTime);
  const formattedServices = formatItemsAndServices(services, otherServices, cartItems);
  const formattedAddress = formatPickupAddress(bookingData);
  const cleanAddress = sanitizeTemplateParam(address && String(address).trim() ? address : formattedAddress);

  const rawBodyValues = {
    "1": cleanCustomerName,
    "2": cleanPickupTime,
    "3": formattedServices,
    "4": cleanAddress
  };

  const sanitizedBodyValues = sanitizeAndValidateBodyValues(rawBodyValues);

  const channelId = process.env.GALLABOX_CHANNEL_ID || '6aa11ad775795e015df71b70';
  const templateName = process.env.GALLABOX_PICKUP_CONFIRMATION_TEMPLATE_NAME || 'loomshine_pickup_confirmation';

  const rawPayload = {
    channelId,
    channelType: 'whatsapp',
    recipient: {
      name: cleanCustomerName,
      phone: normalizedCustomerPhone
    },
    whatsapp: {
      type: 'template',
      template: {
        templateName,
        bodyValues: sanitizedBodyValues
      }
    }
  };

  const sanitizedPayload = sanitizePayloadBoundary(rawPayload);
  assertWhatsAppPayloadSafety(sanitizedPayload);

  return sanitizedPayload;
};

/**
 * Internal helper to dispatch an HTTP request to Gallabox API
 * @param {Object} payload 
 * @returns {Promise<Object>}
 */
const postToGallaboxApi = async (payload) => {
  // Final payload boundary sanitization & strict safety assertion before network dispatch
  const safePayload = sanitizePayloadBoundary(payload);
  assertWhatsAppPayloadSafety(safePayload);

  const isMock = process.env.GALLABOX_MOCK === 'true';

  if (isMock) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Gallabox Mock Mode] Payload Validated for ${safePayload.whatsapp.template.templateName}:`, JSON.stringify(safePayload, null, 2));
    }
    return {
      success: true,
      message: 'Pickup request sent successfully.',
      mock: true,
      payload: safePayload
    };
  }

  const apiKey = process.env.GALLABOX_API_KEY;
  const apiSecret = process.env.GALLABOX_API_SECRET;
  const endpoint = 'https://server.gallabox.com/devapi/messages/whatsapp';

  if (!apiKey || !apiSecret) {
    console.error('[Gallabox Error] Missing required Gallabox API credentials.');
    const configError = new Error('We could not send your pickup request. Please try again.');
    configError.statusCode = 500;
    throw configError;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const headers = {
      'apiKey': apiKey,
      'apiSecret': apiSecret,
      'Content-Type': 'application/json'
    };
    if (process.env.GALLABOX_ACCOUNT_ID) {
      headers['accountId'] = process.env.GALLABOX_ACCOUNT_ID;
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(safePayload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    let resData;
    try {
      resData = await response.json();
    } catch (_e) {
      resData = null;
    }

    if (!response.ok) {
      console.error(`[Gallabox API Failure] Template: ${safePayload.whatsapp.template.templateName}, Status: ${response.status}:`, resData ? JSON.stringify(resData) : 'No JSON response');
      const err = new Error('We could not send your pickup request. Please try again.');
      err.statusCode = response.status >= 500 ? 502 : 400;
      err.responseData = resData;
      throw err;
    }

    return {
      success: true,
      message: 'Pickup request sent successfully.',
      data: resData
    };
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      console.error(`[Gallabox API Error] Request timed out for ${safePayload.whatsapp.template.templateName}`);
      const timeoutErr = new Error('We could not send your pickup request. Please try again.');
      timeoutErr.statusCode = 504;
      throw timeoutErr;
    }

    if (error.statusCode) {
      throw error;
    }

    console.error(`[Gallabox Network Error] Template ${safePayload.whatsapp.template.templateName}:`, error.message);
    const networkErr = new Error('We could not send your pickup request. Please try again.');
    networkErr.statusCode = 503;
    throw networkErr;
  }
};

/**
 * Dispatch Team Notification and Customer Confirmation WhatsApp Templates
 * @param {Object} bookingData 
 * @returns {Promise<{success: boolean, message: string, teamResult?: Object, customerResult?: Object}>}
 */
export const sendPickupTemplates = async (bookingData) => {
  // STEP 1: Team Notification (CRITICAL: if team notification fails, booking submission fails)
  const teamPayload = buildTeamTemplatePayload(bookingData);
  const teamResult = await postToGallaboxApi(teamPayload);

  // STEP 2: Customer Confirmation (NON-BLOCKING FOR SUBMISSION STATUS)
  const customerPayload = buildCustomerTemplatePayload(bookingData);
  let customerResult = null;

  try {
    customerResult = await postToGallaboxApi(customerPayload);
  } catch (customerError) {
    // Log failure server-side safely without crashing customer submission
    console.warn('[Gallabox Customer Confirmation Notice]: Team notification succeeded, but customer confirmation template failed to send.', customerError.message);
  }

  return {
    success: true,
    message: 'Pickup request sent successfully.',
    mock: teamResult ? teamResult.mock : undefined,
    teamResult,
    customerResult
  };
};

// Backward compatibility alias for single template caller
export const sendPickupTemplate = sendPickupTemplates;

