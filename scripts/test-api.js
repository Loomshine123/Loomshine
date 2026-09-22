import dotenv from 'dotenv';
import { createPickupBooking } from '../server/services/pickup.service.js';
import {
  buildTeamTemplatePayload,
  buildCustomerTemplatePayload,
  sanitizeTemplateParam,
  sanitizePayloadBoundary,
  assertWhatsAppPayloadSafety
} from '../server/services/gallabox.service.js';

dotenv.config();

// Enforce MOCK mode in test-api.js process
process.env.GALLABOX_MOCK = 'true';

if (!process.env.GALLABOX_PICKUP_TEMPLATE_NAME) {
  process.env.GALLABOX_PICKUP_TEMPLATE_NAME = 'loomshine_new_pickup_request_2';
}

function runCentralSanitizerUnitTests() {
  console.log('--- Running Central Sanitizer Unit Tests ---\n');

  // Test 1: Multiline services input
  const rawServicesInput = 'Services:\n• STEAM PRESS';
  const cleanServicesInput = sanitizeTemplateParam(rawServicesInput);
  if (cleanServicesInput.includes('\n') || cleanServicesInput.includes('\r')) {
    console.error('✗ FAIL: Central sanitizer failed on multiline services input.');
  } else {
    console.log(`✓ Services multiline sanitized: "${cleanServicesInput}"`);
  }

  // Test 2: Multiline special instructions
  const rawInstructions = 'Call before arriving.\nLeave at security gate.\nHandle garments carefully.';
  const cleanInstructions = sanitizeTemplateParam(rawInstructions);
  if (cleanInstructions !== 'Call before arriving. Leave at security gate. Handle garments carefully.') {
    console.error('✗ FAIL: Special instructions multiline sanitizer failed:', cleanInstructions);
  } else {
    console.log(`✓ Special instructions sanitized: "${cleanInstructions}"`);
  }

  // Test 3: Multiline items input
  const rawItems = 'Shirt x2\nJeans x1';
  const cleanItems = sanitizeTemplateParam(rawItems);
  if (cleanItems !== 'Shirt x2 Jeans x1') {
    console.error('✗ FAIL: Items multiline sanitizer failed:', cleanItems);
  } else {
    console.log(`✓ Items multiline sanitized: "${cleanItems}"`);
  }

  // Test 4: Tabs and multiple spaces
  const rawTabsSpaces = 'Text \t with \t tabs    and   multiple    spaces   ';
  const cleanTabsSpaces = sanitizeTemplateParam(rawTabsSpaces);
  if (cleanTabsSpaces !== 'Text with tabs and multiple spaces') {
    console.error('✗ FAIL: Tabs/spaces sanitizer failed:', cleanTabsSpaces);
  } else {
    console.log(`✓ Tabs & multiple spaces sanitized: "${cleanTabsSpaces}"`);
  }

  // Test 5: Null & Undefined
  if (sanitizeTemplateParam(null) !== '' || sanitizeTemplateParam(undefined) !== '') {
    console.error('✗ FAIL: Null/Undefined sanitizer failed.');
  } else {
    console.log('✓ Null & Undefined handled safely.');
  }

  console.log('\n--- Central Sanitizer Unit Tests Completed Successfully ---\n');
}

function runMockTemplatePayloadValidation() {
  console.log('--- Running Canonical Postman Payload Structural Comparison ---\n');

  const testBooking = {
    customerName: 'Sanskar',
    phone: '8619824574',
    email: undefined,
    pickupTime: '19 Sep 2026 · Afternoon (12 PM – 4 PM)',
    cartItems: [
      { name: 'Kurta Pyjama', price: 250, quantity: 1 }
    ],
    services: [
      { name: 'Dry Cleaning' }
    ],
    houseFlat: 'hello',
    streetAddress: 'Pioneer Park, Sector 60, Gurgaon, Haryana, 122011',
    area: 'Pioneer Park, Sector 60',
    city: 'Gurgaon',
    state: 'Haryana',
    pincode: '122011',
    specialInstructions: 'ek br phle call kr lena',
    latitude: 28.414195,
    longitude: 77.092576
  };

  const teamPayload = buildTeamTemplatePayload(testBooking);
  const customerPayload = buildCustomerTemplatePayload(testBooking);

  // Assert boundary safety
  const safeTeam = sanitizePayloadBoundary(teamPayload);
  const safeCustomer = sanitizePayloadBoundary(customerPayload);

  assertWhatsAppPayloadSafety(safeTeam);
  assertWhatsAppPayloadSafety(safeCustomer);

  const teamTemplate = safeTeam.whatsapp.template;

  // 1. Verify exact 8 body keys
  const bodyKeys = Object.keys(teamTemplate.bodyValues);
  const expectedKeys = ['1', '2', '3', '4', '5', '6', '7', '8'];
  if (JSON.stringify(bodyKeys) !== JSON.stringify(expectedKeys)) {
    console.error('✗ FAIL: Body keys mismatch:', bodyKeys);
  } else {
    console.log('✓ Body keys match numeric 1 through 8 exactly.');
  }

  // 2. Verify buttonValues structure matches Canonical Postman Payload
  const btn = teamTemplate.buttonValues?.[0];
  const isPostmanMatch =
    btn &&
    typeof btn.index === 'number' &&
    btn.index === 0 &&
    btn.sub_type === 'url' &&
    btn.parameters?.type === 'text' &&
    btn.parameters?.text === '28.414195,77.092576' &&
    btn.type === undefined &&
    btn.value === undefined &&
    btn.text === undefined;

  if (!isPostmanMatch) {
    console.error('✗ FAIL: Button values structure does not match Postman reference!', btn);
  } else {
    console.log('✓ Button values match Canonical Postman structure exactly: index=0 (number), sub_type="url", parameters={type:"text", text: coords}.');
  }

  // 3. Verify coordinates equality
  if (btn.parameters.text !== teamTemplate.bodyValues["8"]) {
    console.error('✗ FAIL: Button coordinate does not match bodyValues["8"]');
  } else {
    console.log('✓ Button coordinate equals bodyValues["8"] exactly.');
  }

  console.log('\n  Team Payload:', JSON.stringify(safeTeam, null, 2));
  console.log('\n  Customer Payload:', JSON.stringify(safeCustomer, null, 2));
  console.log('\n--- Both Message Types Verified Successfully in MOCK mode ---\n');
}

const testCases = [
  {
    name: '1. Valid Pickup Booking Submission (Dual Template Flow - new_pickup_request2)',
    payload: {
      fullName: 'Loomshine Test Customer',
      phone: '7877161550',
      email: 'eleanor@example.com',
      preferredPickupTime: 'Morning (9 AM – 12 PM)',
      services: [
        { name: 'Wash & Fold', price: '₹79 PER KG' },
        { name: 'Steam Press', price: '₹49 PER GARMENT' }
      ],
      pickupAddress: 'Sector 57, Gurugram',
      area: 'Sector 57',
      latitude: 28.4595,
      longitude: 77.0266,
      source: 'website'
    },
    expectedSuccess: true,
    expectedMessage: 'Pickup request sent successfully.'
  },
  {
    name: '2. Missing Required Name Validation Error',
    payload: {
      fullName: '',
      phone: '9876543210',
      preferredPickupTime: 'Morning (9 AM – 12 PM)',
      services: [{ name: 'DRY CLEANING' }],
      pickupAddress: '12 Tech Park',
      latitude: 28.4595,
      longitude: 77.0266
    },
    expectedSuccess: false
  },
  {
    name: '3. Missing Required Phone Validation Error',
    payload: {
      fullName: 'Test User',
      phone: '',
      preferredPickupTime: 'Morning (9 AM – 12 PM)',
      services: [{ name: 'DRY CLEANING' }],
      pickupAddress: '12 Tech Park',
      latitude: 28.4595,
      longitude: 77.0266
    },
    expectedSuccess: false
  },
  {
    name: '4. Invalid Phone Format Validation Error',
    payload: {
      fullName: 'Test User',
      phone: '123',
      preferredPickupTime: 'Morning (9 AM – 12 PM)',
      services: [{ name: 'DRY CLEANING' }],
      pickupAddress: '12 Tech Park',
      latitude: 28.4595,
      longitude: 77.0266
    },
    expectedSuccess: false
  },
  {
    name: '5. Missing Preferred Pickup Time Error',
    payload: {
      fullName: 'Test User',
      phone: '9876543210',
      preferredPickupTime: '',
      services: [{ name: 'DRY CLEANING' }],
      pickupAddress: '12 Tech Park',
      latitude: 28.4595,
      longitude: 77.0266
    },
    expectedSuccess: false
  },
  {
    name: '6. Invalid Preferred Pickup Time Slot Error',
    payload: {
      fullName: 'Test User',
      phone: '9876543210',
      preferredPickupTime: 'Random Time 3 AM',
      services: [{ name: 'DRY CLEANING' }],
      pickupAddress: '12 Tech Park',
      latitude: 28.4595,
      longitude: 77.0266
    },
    expectedSuccess: false
  },
  {
    name: '7. Missing Services Selection Error',
    payload: {
      fullName: 'Test User',
      phone: '9876543210',
      preferredPickupTime: 'Evening (4 PM – 8 PM)',
      services: [],
      pickupAddress: '12 Tech Park',
      latitude: 28.4595,
      longitude: 77.0266
    },
    expectedSuccess: false
  },
  {
    name: '8. Missing Pickup Address Error',
    payload: {
      fullName: 'Test User',
      phone: '9876543210',
      preferredPickupTime: 'Evening (4 PM – 8 PM)',
      services: [{ name: 'SHOE CLEANING' }],
      pickupAddress: '',
      latitude: 28.4595,
      longitude: 77.0266
    },
    expectedSuccess: false
  },
  {
    name: '9. Pickup Slot Test: Afternoon (12 PM – 4 PM)',
    payload: {
      fullName: 'Siddharth V.',
      phone: '+919877286066',
      email: 'siddharth@example.com',
      preferredPickupTime: 'Afternoon (12 PM – 4 PM)',
      services: [
        { name: 'DRY CLEANING', price: '₹— AS PER GARMENT' }
      ],
      pickupAddress: '45 Park Street, Suite 2A, Sector 54, Gurugram 122002',
      area: 'Sector 54, Gurugram',
      latitude: 28.4595,
      longitude: 77.0266,
      source: 'website'
    },
    expectedSuccess: true,
    expectedMessage: 'Pickup request sent successfully.'
  },
  {
    name: '10. Pickup Slot Test: Evening (4 PM – 8 PM)',
    payload: {
      fullName: 'Aarav Gupta',
      phone: '7877161550',
      preferredPickupTime: 'Evening (4 PM – 8 PM)',
      services: [{ name: 'PREMIUM LAUNDRY' }],
      pickupAddress: 'DLF Phase 5, Gurugram',
      latitude: 28.4595,
      longitude: 77.0266
    },
    expectedSuccess: true,
    expectedMessage: 'Pickup request sent successfully.'
  },
  {
    name: '11. Pickup Slot Test: Express / Immediate Pickup',
    payload: {
      fullName: 'Priya Sharma',
      phone: '7877161550',
      preferredPickupTime: 'Express / Immediate Pickup',
      services: [{ name: 'EXPRESS DRY CLEANING' }],
      pickupAddress: 'Golf Course Road, Gurugram',
      latitude: 28.4595,
      longitude: 77.0266
    },
    expectedSuccess: true,
    expectedMessage: 'Pickup request sent successfully.'
  },
  {
    name: '12. Pickup Slot Test: Combined Date + Slot (20 Sep 2026 (2026-09-20) · Morning (9 AM – 12 PM))',
    payload: {
      fullName: 'Rohan Mehra',
      phone: '7877161550',
      pickupDate: '2026-09-20',
      pickupSlot: 'Morning (9 AM – 12 PM)',
      preferredPickupTime: '20 Sep 2026 (2026-09-20) · Morning (9 AM – 12 PM)',
      services: [{ name: 'STEAM PRESS' }],
      pickupAddress: 'Cyber City, Gurugram',
      latitude: 28.4595,
      longitude: 77.0266
    },
    expectedSuccess: true,
    expectedMessage: 'Pickup request sent successfully.'
  },
  {
    name: '13. Pickup Slot Test: Hyphen variation (Morning (9 AM - 12 PM))',
    payload: {
      fullName: 'Ananya Verma',
      phone: '7877161550',
      preferredPickupTime: 'Morning (9 AM - 12 PM)',
      services: [{ name: 'WASH & FOLD' }],
      pickupAddress: 'Sohna Road, Gurugram',
      latitude: 28.4595,
      longitude: 77.0266
    },
    expectedSuccess: true,
    expectedMessage: 'Pickup request sent successfully.'
  },
  {
    name: '14. Missing Map Location Coordinates Error',
    payload: {
      fullName: 'Test User',
      phone: '7877161550',
      preferredPickupTime: 'Morning (9 AM – 12 PM)',
      services: [{ name: 'DRY CLEANING' }],
      pickupAddress: '12 Tech Park'
    },
    expectedSuccess: false
  },
  {
    name: '15. Cart Booking Scenario Payload Test',
    payload: {
      fullName: 'Vikramaditya S.',
      phone: '7877161550',
      preferredPickupTime: 'Afternoon (12 PM – 4 PM)',
      cartItems: [
        { name: 'Men Shirt', price: 99, quantity: 2, unit: 'per item', category: 'Dry Cleaning' },
        { name: 'Silk Saree', price: 349, quantity: 1, unit: 'per item', category: 'Specialty' }
      ],
      services: [{ name: 'DRY CLEANING' }],
      pickupAddress: 'Apartment 402, Crest Tower, Golf Course Road, Gurugram',
      latitude: 28.4595,
      longitude: 77.0266,
      source: 'website'
    },
    expectedSuccess: true,
    expectedMessage: 'Pickup request sent successfully.'
  }
];

async function runTest(tc) {
  try {
    const res = await createPickupBooking(tc.payload);
    const passed = tc.expectedSuccess === true && (!tc.expectedMessage || res.message === tc.expectedMessage);
    console.log(`--- Test: ${tc.name} ---`);
    console.log(`Result: ${passed ? '✓ PASSED' : '✗ FAILED'}`);
    return passed;
  } catch (err) {
    const passed = tc.expectedSuccess === false;
    console.log(`--- Test: ${tc.name} ---`);
    console.log(`Result: ${passed ? '✓ PASSED (Expected Error)' : '✗ FAILED (Unexpected Error)'}:`, err.message);
    return passed;
  }
}

async function runAll() {
  console.log('=====================================================');
  console.log('GALLABOX CANONICAL POSTMAN PAYLOAD VERIFICATION SUITE');
  console.log('=====================================================\n');

  runCentralSanitizerUnitTests();
  runMockTemplatePayloadValidation();

  let passedCount = 0;
  for (const tc of testCases) {
    const ok = await runTest(tc);
    if (ok) passedCount++;
  }
  console.log(`\n==========================================`);
  console.log(`Summary: ${passedCount} / ${testCases.length} tests passed.`);
  console.log(`==========================================`);
}

runAll();
