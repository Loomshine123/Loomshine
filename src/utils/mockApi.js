/**
 * Mock API layer for Loomshine Frontend
 * Provides simulated network responses for Pincode availability and Order Tracking.
 */

// List of covered pincodes for mock check
const SERVICED_PINCODES = ['110001', '110020', '110048', '122001', '122002', '400001', '560001'];

// Mock Order Database
const MOCK_ORDERS = {
  'TL-482917': {
    orderId: 'TL-482917',
    customerName: 'Siddharth V.',
    service: 'Dry Cleaning',
    itemCount: '6 garments',
    pickupDate: 'Mon, Aug 31 · 9–11 AM',
    address: '221 Baker Street, Apt 4B',
    estimatedDelivery: 'TODAY, 4–6 PM',
    currentStepIndex: 2, // 0: Picked Up, 1: Cleaning, 2: Quality Check, 3: Out for Delivery, 4: Delivered
    steps: [
      { code: '01', label: 'PICKED UP', date: 'Mon, 10:24 AM', status: 'completed' },
      { code: '02', label: 'CLEANING', date: 'Mon, 2:10 PM', status: 'completed' },
      { code: '03', label: 'QUALITY CHECK', date: 'Today, 9:00 AM', status: 'active' },
      { code: '04', label: 'OUT FOR DELIVERY', date: 'Expected today, 4–6 PM', status: 'pending' },
      { code: '05', label: 'DELIVERED', date: '—', status: 'pending' }
    ]
  },
  'TL-1001': {
    orderId: 'TL-1001',
    customerName: 'Ananya M.',
    service: 'Dry Cleaning & Pressing',
    itemCount: '4 garments',
    pickupDate: 'Mon, Aug 31 · 10–12 PM',
    address: '45 Park Street, Suite 2A',
    estimatedDelivery: 'TODAY, 5–7 PM',
    currentStepIndex: 2,
    steps: [
      { code: '01', label: 'PICKED UP', date: 'Sep 01, 10:30 AM', status: 'completed' },
      { code: '02', label: 'CLEANING', date: 'Sep 02, 02:15 PM', status: 'completed' },
      { code: '03', label: 'QUALITY CHECK', date: 'Sep 03, 11:00 AM', status: 'active' },
      { code: '04', label: 'OUT FOR DELIVERY', date: 'Expected today, 5–7 PM', status: 'pending' },
      { code: '05', label: 'DELIVERED', date: '—', status: 'pending' }
    ]
  },
  'TL-1002': {
    orderId: 'TL-1002',
    customerName: 'Rohan K.',
    service: 'Executive Laundry per kg',
    itemCount: '12 garments',
    pickupDate: 'Tue, Sep 01 · 8–10 AM',
    address: '12 Tech Park Avenue, Flat 801',
    estimatedDelivery: 'TODAY, 2–4 PM',
    currentStepIndex: 3,
    steps: [
      { code: '01', label: 'PICKED UP', date: 'Sep 02, 09:00 AM', status: 'completed' },
      { code: '02', label: 'CLEANING', date: 'Sep 02, 04:00 PM', status: 'completed' },
      { code: '03', label: 'QUALITY CHECK', date: 'Sep 03, 08:30 AM', status: 'completed' },
      { code: '04', label: 'OUT FOR DELIVERY', date: 'Sep 03, 01:15 PM', status: 'active' },
      { code: '05', label: 'DELIVERED', date: 'Expected today, 2–4 PM', status: 'pending' }
    ]
  }
};

/**
 * Check if a Pincode is in the service area
 * @param {string} pincode 
 * @returns {Promise<{isAvailable: boolean, message: string}>}
 */
export const checkPincodeAvailability = async (pincode) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cleanPin = String(pincode).trim();
      if (!cleanPin || cleanPin.length !== 6 || !/^\d+$/.test(cleanPin)) {
        resolve({
          isAvailable: false,
          error: true,
          message: 'Please enter a valid 6-digit PIN code.'
        });
        return;
      }

      if (SERVICED_PINCODES.includes(cleanPin) || cleanPin.startsWith('11') || cleanPin.startsWith('12')) {
        resolve({
          isAvailable: true,
          error: false,
          message: `Great news! Doorstep pickup and delivery is available in area ${cleanPin}.`
        });
      } else {
        resolve({
          isAvailable: false,
          error: false,
          message: `We currently don't service area ${cleanPin} directly, but we are expanding rapidly!`
        });
      }
    }, 400);
  });
};

/**
 * Track an Order by ID
 * @param {string} orderId 
 * @returns {Promise<{found: boolean, order?: object, error?: string}>}
 */
export const trackOrderById = async (orderId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cleanId = String(orderId || '').trim().toUpperCase();
      if (!cleanId) {
        resolve({
          found: false,
          error: 'Please enter a valid Order ID (e.g., TL-482917).'
        });
        return;
      }

      // Check explicit mock DB
      if (MOCK_ORDERS[cleanId]) {
        resolve({
          found: true,
          order: MOCK_ORDERS[cleanId]
        });
        return;
      }

      // Format regex matching TL-XXXXXX or TL-XXXX
      if (/^TL-\d{4,6}$/.test(cleanId)) {
        resolve({
          found: true,
          order: {
            orderId: cleanId,
            customerName: 'Valued Customer',
            service: 'Premium Dry Cleaning',
            itemCount: '5 garments',
            pickupDate: 'Mon, Aug 31 · 9–11 AM',
            address: 'Verified Customer Address',
            estimatedDelivery: 'TODAY, 4–6 PM',
            currentStepIndex: 2,
            steps: [
              { code: '01', label: 'PICKED UP', date: 'Mon, 10:24 AM', status: 'completed' },
              { code: '02', label: 'CLEANING', date: 'Mon, 2:10 PM', status: 'completed' },
              { code: '03', label: 'QUALITY CHECK', date: 'Today, 9:00 AM', status: 'active' },
              { code: '04', label: 'OUT FOR DELIVERY', date: 'Expected today, 4–6 PM', status: 'pending' },
              { code: '05', label: 'DELIVERED', date: '—', status: 'pending' }
            ]
          }
        });
      } else {
        resolve({
          found: false,
          error: `No active order found for "${cleanId}". Try sample Order ID: "TL-482917".`
        });
      }
    }, 400);
  });
};
