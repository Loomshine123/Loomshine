import http from 'node:http';
import { buildTeamTemplatePayload, buildCustomerTemplatePayload } from '../server/services/gallabox.service.js';

const testCases = [
  {
    name: '1. Valid Pickup Booking Submission (Dual Template Flow)',
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
      source: 'website'
    },
    expectedStatus: 200,
    expectedMessage: 'Pickup request sent successfully.',
    verifyDualTemplates: true
  },
  {
    name: '2. Missing Required Name Validation Error',
    payload: {
      fullName: '',
      phone: '9876543210',
      preferredPickupTime: 'Morning (9 AM – 12 PM)',
      services: [{ name: 'DRY CLEANING' }],
      pickupAddress: '12 Tech Park'
    },
    expectedStatus: 400
  },
  {
    name: '3. Missing Required Phone Validation Error',
    payload: {
      fullName: 'Test User',
      phone: '',
      preferredPickupTime: 'Morning (9 AM – 12 PM)',
      services: [{ name: 'DRY CLEANING' }],
      pickupAddress: '12 Tech Park'
    },
    expectedStatus: 400
  },
  {
    name: '4. Invalid Phone Format Validation Error',
    payload: {
      fullName: 'Test User',
      phone: '123',
      preferredPickupTime: 'Morning (9 AM – 12 PM)',
      services: [{ name: 'DRY CLEANING' }],
      pickupAddress: '12 Tech Park'
    },
    expectedStatus: 400
  },
  {
    name: '5. Missing Preferred Pickup Time Error',
    payload: {
      fullName: 'Test User',
      phone: '9876543210',
      preferredPickupTime: '',
      services: [{ name: 'DRY CLEANING' }],
      pickupAddress: '12 Tech Park'
    },
    expectedStatus: 400
  },
  {
    name: '6. Invalid Preferred Pickup Time Slot Error',
    payload: {
      fullName: 'Test User',
      phone: '9876543210',
      preferredPickupTime: 'Random Time 3 AM',
      services: [{ name: 'DRY CLEANING' }],
      pickupAddress: '12 Tech Park'
    },
    expectedStatus: 400
  },
  {
    name: '7. Missing Services Selection Error',
    payload: {
      fullName: 'Test User',
      phone: '9876543210',
      preferredPickupTime: 'Evening (4 PM – 8 PM)',
      services: [],
      pickupAddress: '12 Tech Park'
    },
    expectedStatus: 400
  },
  {
    name: '8. Missing Pickup Address Error',
    payload: {
      fullName: 'Test User',
      phone: '9876543210',
      preferredPickupTime: 'Evening (4 PM – 8 PM)',
      services: [{ name: 'SHOE CLEANING' }],
      pickupAddress: ''
    },
    expectedStatus: 400
  },
  {
    name: '9. Custom Other Services Payload Test',
    payload: {
      fullName: 'Siddharth V.',
      phone: '+919877286066',
      email: 'siddharth@example.com',
      preferredPickupTime: 'Afternoon (12 PM – 4 PM)',
      services: [
        { name: 'DRY CLEANING', price: '₹— AS PER GARMENT' },
        { name: 'OTHER SERVICES' }
      ],
      otherServices: 'Special velvet curtain dry cleaning & leather shoes restoration',
      pickupAddress: '45 Park Street, Suite 2A, Sector 54, Gurugram 122002',
      area: 'Sector 54, Gurugram',
      source: 'website'
    },
    expectedStatus: 200,
    expectedMessage: 'Pickup request sent successfully.'
  }
];

async function runTest(tc) {
  return new Promise((resolve) => {
    const data = JSON.stringify(tc.payload);
    const req = http.request(
      'http://localhost:5000/api/pickup-booking',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data)
        }
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          let json = {};
          try {
            json = JSON.parse(body);
          } catch (_e) {
            json = {};
          }

          let passed = res.statusCode === tc.expectedStatus;
          if (passed && tc.expectedMessage && json.message !== tc.expectedMessage) {
            console.error(`✗ Message mismatch: Expected "${tc.expectedMessage}", got "${json.message}"`);
            passed = false;
          }

          if (passed && tc.verifyDualTemplates) {
            const bookingData = {
              customerName: tc.payload.fullName,
              phone: tc.payload.phone,
              pickupTime: tc.payload.preferredPickupTime,
              services: tc.payload.services,
              otherServices: tc.payload.otherServices,
              address: tc.payload.pickupAddress,
              area: tc.payload.area
            };

            const teamMapped = buildTeamTemplatePayload(bookingData);
            const customerMapped = buildCustomerTemplatePayload(bookingData);

            const teamBv = teamMapped.whatsapp.template.bodyValues;
            const customerBv = customerMapped.whatsapp.template.bodyValues;

            const expectedTeamBv = {
              "1": "Loomshine Test Customer",
              "2": "917877161550",
              "3": "Morning (9 AM – 12 PM)",
              "4": "Wash & Fold, Steam Press",
              "5": "Sector 57, Gurugram",
              "6": "Sector 57"
            };

            const expectedCustomerBv = {
              "1": "Loomshine Test Customer",
              "2": "Morning (9 AM – 12 PM)",
              "3": "Wash & Fold, Steam Press",
              "4": "Sector 57, Gurugram"
            };

            const isTeamMatch =
              teamMapped.whatsapp.template.templateName === 'loomshine_new_pickup_request' &&
              teamMapped.recipient.phone === '918877286066' &&
              JSON.stringify(teamBv) === JSON.stringify(expectedTeamBv);

            const isCustomerMatch =
              customerMapped.whatsapp.template.templateName === 'loomshine_pickup_confirmation' &&
              customerMapped.recipient.phone === '917877161550' &&
              JSON.stringify(customerBv) === JSON.stringify(expectedCustomerBv);

            if (!isTeamMatch) {
              console.error('✗ Team Template Payload Mismatch:', teamMapped);
              passed = false;
            } else {
              console.log('✓ Team Template (loomshine_new_pickup_request -> 918877286066) Verified:', JSON.stringify(teamBv, null, 2));
            }

            if (!isCustomerMatch) {
              console.error('✗ Customer Template Payload Mismatch:', customerMapped);
              passed = false;
            } else {
              console.log('✓ Customer Template (loomshine_pickup_confirmation -> 917877161550) Verified:', JSON.stringify(customerBv, null, 2));
            }
          }

          console.log(`\n--- Test: ${tc.name} ---`);
          console.log(`Status: ${res.statusCode} (Expected: ${tc.expectedStatus}) => ${passed ? '✓ PASSED' : '✗ FAILED'}`);
          console.log(`Response:`, json);
          resolve(passed);
        });
      }
    );

    req.on('error', (err) => {
      console.error(`Test ${tc.name} Error:`, err.message);
      resolve(false);
    });

    req.write(data);
    req.end();
  });
}

async function runAll() {
  console.log('Running Dual Template Gallabox Integrated Verification Suite...\n');
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
