/**
 * Mock API layer for Loomshine Frontend
 * Provides simulated network responses for Pincode availability and Order Tracking.
 */

// List of covered pincodes for mock check
const SERVICED_PINCODES = ['110001', '110020', '110048', '122001', '122002', '400001', '560001'];

// Mock Order Database
const MOCK_ORDERS = {
  'TL-1001': {
    orderId: 'TL-1001',
    customerName: 'Ananya M.',
    service: 'Dry Cleaning & Pressing',
    itemCount: 4,
    pickupDate: '2026-09-01',
    estimatedDelivery: '2026-09-04',
    currentStepIndex: 2, // 0: Picked Up, 1: Cleaning, 2: Quality Check, 3: Out for Delivery, 4: Delivered
    steps: [
      { label: 'Picked Up', date: 'Sep 01, 10:30 AM', completed: true },
      { label: 'Cleaning', date: 'Sep 02, 02:15 PM', completed: true },
      { label: 'Quality Check', date: 'Sep 03, 11:00 AM', active: true },
      { label: 'Out for Delivery', date: 'Est. Sep 04', completed: false },
      { label: 'Delivered', date: 'Est. Sep 04', completed: false }
    ]
  },
  'TL-1002': {
    orderId: 'TL-1002',
    customerName: 'Rohan K.',
    service: 'Executive Laundry per kg',
    itemCount: 12,
    pickupDate: '2026-09-02',
    estimatedDelivery: '2026-09-03',
    currentStepIndex: 3,
    steps: [
      { label: 'Picked Up', date: 'Sep 02, 09:00 AM', completed: true },
      { label: 'Cleaning', date: 'Sep 02, 04:00 PM', completed: true },
      { label: 'Quality Check', date: 'Sep 03, 08:30 AM', completed: true },
      { label: 'Out for Delivery', date: 'Sep 03, 01:15 PM', active: true },
      { label: 'Delivered', date: 'Est. Sep 03', completed: false }
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
      const cleanId = String(orderId).trim().toUpperCase();
      if (!cleanId) {
        resolve({
          found: false,
          error: 'Please enter an Order ID (e.g., TL-1001).'
        });
        return;
      }

      if (MOCK_ORDERS[cleanId]) {
        resolve({
          found: true,
          order: MOCK_ORDERS[cleanId]
        });
      } else {
        // Fallback demo order for testing any valid format
        if (/^TL-\d{4}$/.test(cleanId)) {
          resolve({
            found: true,
            order: {
              orderId: cleanId,
              customerName: 'Valued Customer',
              service: 'Standard Garment Care',
              itemCount: 5,
              pickupDate: '2026-09-02',
              estimatedDelivery: '2026-09-04',
              currentStepIndex: 1,
              steps: [
                { label: 'Picked Up', date: 'Sep 02', completed: true },
                { label: 'Cleaning', date: 'In Progress', active: true },
                { label: 'Quality Check', date: 'Pending', completed: false },
                { label: 'Out for Delivery', date: 'Pending', completed: false },
                { label: 'Delivered', date: 'Pending', completed: false }
              ]
            }
          });
        } else {
          resolve({
            found: false,
            error: `No active order found for "${cleanId}". Please try sample ID "TL-1001" or "TL-1002".`
          });
        }
      }
    }, 500);
  });
};
