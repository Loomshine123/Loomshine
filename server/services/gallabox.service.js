/**
 * Gallabox Service Integration
 * Handles outbound WhatsApp messages via Gallabox API
 * Endpoint: POST https://server.gallabox.com/devapi/messages/whatsapp
 */

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
 * Format multi-select services and optional custom otherServices into a single clean string
 * @param {Array} services 
 * @param {string} [otherServices] 
 * @returns {string}
 */
export const formatServicesString = (services, otherServices) => {
  let list = [];
  if (Array.isArray(services)) {
    list = services
      .map((s) => {
        const rawName = typeof s === 'string' ? s : s.name;
        if (!rawName || rawName.toUpperCase() === 'OTHER SERVICES') return null;
        return rawName;
      })
      .filter(Boolean);
  }

  if (otherServices && typeof otherServices === 'string' && otherServices.trim()) {
    list.push(`Other: ${otherServices.trim()}`);
  }

  return list.join(', ');
};

/**
 * Construct Team Notification Template Payload (loomshine_new_pickup_request - 6 variables)
 * @param {Object} bookingData 
 * @returns {Object}
 */
export const buildTeamTemplatePayload = (bookingData) => {
  const {
    customerName,
    phone,
    pickupTime,
    services,
    otherServices,
    address,
    area
  } = bookingData;

  const normalizedCustomerPhone = normalizePhoneForGallabox(phone);
  const formattedServices = formatServicesString(services, otherServices);
  const cleanArea = area && area.trim() ? area.trim() : (address || 'Not specified');

  const channelId = process.env.GALLABOX_CHANNEL_ID || '6aa11ad775795e015df71b70';
  const templateName = process.env.GALLABOX_PICKUP_TEMPLATE_NAME || 'loomshine_new_pickup_request';
  const teamRecipientPhone = process.env.GALLABOX_PICKUP_TEAM_PHONE || '918877286066';

  return {
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
        bodyValues: {
          "1": customerName,
          "2": normalizedCustomerPhone,
          "3": pickupTime,
          "4": formattedServices,
          "5": address,
          "6": cleanArea
        }
      }
    }
  };
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
    address
  } = bookingData;

  const normalizedCustomerPhone = normalizePhoneForGallabox(phone);
  const formattedServices = formatServicesString(services, otherServices);

  const channelId = process.env.GALLABOX_CHANNEL_ID || '6aa11ad775795e015df71b70';
  const templateName = process.env.GALLABOX_PICKUP_CONFIRMATION_TEMPLATE_NAME || 'loomshine_pickup_confirmation';

  return {
    channelId,
    channelType: 'whatsapp',
    recipient: {
      name: customerName,
      phone: normalizedCustomerPhone
    },
    whatsapp: {
      type: 'template',
      template: {
        templateName,
        bodyValues: {
          "1": customerName,
          "2": pickupTime,
          "3": formattedServices,
          "4": address
        }
      }
    }
  };
};

/**
 * Internal helper to dispatch an HTTP request to Gallabox API
 * @param {Object} payload 
 * @returns {Promise<Object>}
 */
const postToGallaboxApi = async (payload) => {
  const isMock = process.env.GALLABOX_MOCK === 'true';

  if (isMock) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Gallabox Mock Mode] Payload Validated for ${payload.whatsapp.template.templateName}:`, JSON.stringify(payload, null, 2));
    }
    return {
      success: true,
      message: 'Pickup request sent successfully.',
      mock: true,
      payload
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
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'apiKey': apiKey,
        'apiSecret': apiSecret,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
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
      console.error(`[Gallabox API Failure] Template: ${payload.whatsapp.template.templateName}, Status: ${response.status}:`, resData ? JSON.stringify(resData) : 'No JSON response');
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
      console.error(`[Gallabox API Error] Request timed out for ${payload.whatsapp.template.templateName}`);
      const timeoutErr = new Error('We could not send your pickup request. Please try again.');
      timeoutErr.statusCode = 504;
      throw timeoutErr;
    }

    if (error.statusCode) {
      throw error;
    }

    console.error(`[Gallabox Network Error] Template ${payload.whatsapp.template.templateName}:`, error.message);
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
