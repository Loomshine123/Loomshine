import { createPickupBooking } from '../server/services/pickup.service.js';
import { buildTeamTemplatePayload, buildCustomerTemplatePayload } from '../server/services/gallabox.service.js';

// Enable Gallabox Mock Mode for validation test
process.env.GALLABOX_MOCK = 'true';

async function runComprehensiveVerification() {
  console.log('===================================================');
  console.log('   LOOMSHINE FULL PICKUP & GALLABOX SUITE TEST    ');
  console.log('===================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, testName, details = '') {
    totalTests++;
    if (condition) {
      console.log(`[PASS] Test ${totalTests}: ${testName}`);
      if (details) console.log(`       -> ${details}`);
      passedTests++;
    } else {
      console.error(`[FAIL] Test ${totalTests}: ${testName}`);
      if (details) console.error(`       -> ${details}`);
    }
  }

  // 1. Hero Section Pickup Form Submission Test
  try {
    const heroPayload = {
      fullName: 'Hero Section Customer',
      phone: '9876543210',
      email: 'hero@loomshine.com',
      preferredPickupTime: 'Today · Afternoon (12 PM – 4 PM)',
      services: [{ name: 'Wash & Fold' }, { name: 'Steam Press' }],
      otherServices: '',
      pickupAddress: 'Flat 302, Tower A, Rosewood Heights, Sector 54, Gurugram',
      area: '122002',
      latitude: 28.4595,
      longitude: 77.0266,
      source: 'hero_pickup_contact_form'
    };

    const res = await createPickupBooking(heroPayload);
    assert(res.success === true, 'Hero Section Pickup -> Gallabox Dispatch', `Message: "${res.message}"`);
  } catch (err) {
    assert(false, 'Hero Section Pickup -> Gallabox Dispatch', err.message);
  }

  // 2. Navbar Pickup Form Submission Test
  try {
    const navbarPayload = {
      fullName: 'Navbar Booking Customer',
      phone: '+91 8877286066',
      email: 'navbar@loomshine.com',
      preferredPickupTime: 'Morning (9 AM – 12 PM)',
      services: [{ name: 'Dry Cleaning', price: '₹— AS PER GARMENT' }],
      otherServices: 'Silk saree dry clean & polishing',
      pickupAddress: 'House 42, Civil Lines, Jaipur',
      area: 'Civil Lines',
      source: 'website'
    };

    const res = await createPickupBooking(navbarPayload);
    assert(res.success === true, 'Navbar Booking Form -> Gallabox Dispatch', `Message: "${res.message}"`);
  } catch (err) {
    assert(false, 'Navbar Booking Form -> Gallabox Dispatch', err.message);
  }

  // 3. Express Pickup Time Slot Test
  try {
    const expressPayload = {
      fullName: 'Express Pickup Customer',
      phone: '9123456789',
      preferredPickupTime: 'Express / Immediate Pickup',
      services: [{ name: 'Shoe Cleaning' }],
      pickupAddress: 'Suite 101, Business Park, Connaught Place, New Delhi',
      source: 'hero_pickup_contact_form'
    };

    const res = await createPickupBooking(expressPayload);
    assert(res.success === true, 'Express Slot Pickup -> Gallabox Dispatch', `Message: "${res.message}"`);
  } catch (err) {
    assert(false, 'Express Slot Pickup -> Gallabox Dispatch', err.message);
  }

  // 4. Team WhatsApp Template Structure (6 parameters)
  try {
    const booking = {
      customerName: 'Ananya Verma',
      phone: '9876543210',
      pickupTime: 'Tomorrow · Evening (4 PM – 8 PM)',
      services: [{ name: 'Dry Cleaning' }, { name: 'Curtain Care' }],
      otherServices: 'Curtains with lining',
      address: 'Plot 18, DLF Phase 1, Gurugram',
      area: 'DLF Phase 1'
    };

    const teamPayload = buildTeamTemplatePayload(booking);
    const bodyValues = teamPayload.whatsapp.template.bodyValues;
    const isValid =
      teamPayload.whatsapp.template.templateName === 'loomshine_new_pickup_request' &&
      bodyValues["1"] === 'Ananya Verma' &&
      bodyValues["2"] === '919876543210' &&
      bodyValues["3"] === 'Tomorrow · Evening (4 PM – 8 PM)' &&
      bodyValues["4"].includes('Dry Cleaning') &&
      bodyValues["5"] === 'Plot 18, DLF Phase 1, Gurugram';

    assert(isValid, 'Team WhatsApp Template Structure (loomshine_new_pickup_request)', `6 Body Values Mapped Correctly`);
  } catch (err) {
    assert(false, 'Team WhatsApp Template Structure', err.message);
  }

  // 5. Customer Confirmation WhatsApp Template Structure (4 parameters)
  try {
    const booking = {
      customerName: 'Ananya Verma',
      phone: '9876543210',
      pickupTime: 'Tomorrow · Evening (4 PM – 8 PM)',
      services: [{ name: 'Dry Cleaning' }],
      address: 'Plot 18, DLF Phase 1, Gurugram'
    };

    const customerPayload = buildCustomerTemplatePayload(booking);
    const bodyValues = customerPayload.whatsapp.template.bodyValues;
    const isValid =
      customerPayload.whatsapp.template.templateName === 'loomshine_pickup_confirmation' &&
      customerPayload.recipient.phone === '919876543210' &&
      bodyValues["1"] === 'Ananya Verma' &&
      bodyValues["2"] === 'Tomorrow · Evening (4 PM – 8 PM)' &&
      bodyValues["3"] === 'Dry Cleaning' &&
      bodyValues["4"] === 'Plot 18, DLF Phase 1, Gurugram';

    assert(isValid, 'Customer Confirmation Template Structure (loomshine_pickup_confirmation)', `4 Body Values Mapped Correctly`);
  } catch (err) {
    assert(false, 'Customer Confirmation Template Structure', err.message);
  }

  // 6. Validation Error Handlers (Invalid Phone Number)
  try {
    await createPickupBooking({
      fullName: 'Test User',
      phone: '123',
      preferredPickupTime: 'Morning (9 AM – 12 PM)',
      services: [{ name: 'Dry Cleaning' }],
      pickupAddress: 'Address'
    });
    assert(false, 'Invalid Phone Validation', 'Should have thrown error');
  } catch (err) {
    assert(err.statusCode === 400, 'Invalid Phone Validation Catch', `Rejected properly with 400 error`);
  }

  // 7. Validation Error Handlers (Missing Address)
  try {
    await createPickupBooking({
      fullName: 'Test User',
      phone: '9876543210',
      preferredPickupTime: 'Morning (9 AM – 12 PM)',
      services: [{ name: 'Dry Cleaning' }],
      pickupAddress: ''
    });
    assert(false, 'Missing Address Validation', 'Should have thrown error');
  } catch (err) {
    assert(err.statusCode === 400, 'Missing Address Validation Catch', `Rejected properly with 400 error`);
  }

  console.log('\n===================================================');
  console.log(` RESULTS: ${passedTests} / ${totalTests} TEST SUITES PASSED `);
  console.log('===================================================\n');
}

runComprehensiveVerification();
