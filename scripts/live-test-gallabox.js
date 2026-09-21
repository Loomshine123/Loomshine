import dotenv from 'dotenv';
import { buildTeamTemplatePayload, buildCustomerTemplatePayload } from '../server/services/gallabox.service.js';

dotenv.config();

/**
 * Single Controlled Live Test Script for Gallabox WhatsApp Templates
 * 1. Team Template: loomshine_new_pickup_request_2 (8 variables)
 * 2. Customer Confirmation: loomshine_pickup_confirmation (4 variables)
 */

async function postGallabox(payload) {
  const apiKey = process.env.GALLABOX_API_KEY;
  const apiSecret = process.env.GALLABOX_API_SECRET;
  const endpoint = 'https://server.gallabox.com/devapi/messages/whatsapp';

  if (!apiKey || !apiSecret) {
    console.error('Missing GALLABOX_API_KEY or GALLABOX_API_SECRET in environment.');
    return { ok: false, status: 400, data: { message: 'Missing API credentials' } };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'apiKey': apiKey,
      'apiSecret': apiSecret,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const status = response.status;
  let resData;
  try {
    resData = await response.json();
  } catch (_e) {
    resData = null;
  }

  return { status, data: resData, ok: response.ok };
}

async function runLiveTest() {
  console.log('--- Executing Controlled Live Gallabox 8-Variable Template Test ---\n');

  const testBooking = {
    customerName: 'Manish Suthar',
    phone: '7877161550',
    email: 'manish@example.com',
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
    specialInstructions: 'Call before arriving.\nLeave at security gate.\nHandle garments carefully.',
    latitude: 28.414195,
    longitude: 77.092576
  };

  const teamPayload = buildTeamTemplatePayload(testBooking);
  const customerPayload = buildCustomerTemplatePayload(testBooking);

  console.log('[Sanitized Team Payload (loomshine_new_pickup_request_2)]:\n', JSON.stringify(teamPayload, null, 2));

  // Perform validation checks on parameters
  for (const [key, val] of Object.entries(teamPayload.whatsapp.template.bodyValues)) {
    const hasNewline = /[\r\n\t]/.test(val);
    const hasExcessiveSpaces = /\s{5,}/.test(val);
    if (hasNewline || hasExcessiveSpaces) {
      console.error(`✗ FAIL: Parameter {{${key}}} contains newline/tab or excessive spaces: "${val}"`);
    } else {
      console.log(`✓ Param {{${key}}} clean: "${val}"`);
    }
  }

  console.log('\nSending Live Request to Gallabox API...');
  const teamRes = await postGallabox(teamPayload);
  console.log(`\n[Team Gallabox HTTP Status]: ${teamRes.status}`);
  console.log('[Team Gallabox Response]:', JSON.stringify(teamRes.data, null, 2));

  if (teamRes.ok) {
    console.log('\n✓ LIVE GALLABOX TEST PASSED! WhatsApp notification delivered successfully.');
  } else {
    console.error('\n✗ LIVE GALLABOX TEST FAILED!');
  }

  console.log('\n----------------------------------------\n');
  console.log('[Sanitized Customer Payload (loomshine_pickup_confirmation)]:\n', JSON.stringify(customerPayload, null, 2));
  const customerRes = await postGallabox(customerPayload);
  console.log(`\n[Customer Gallabox HTTP Status]: ${customerRes.status}`);
  console.log('[Customer Gallabox Response]:', JSON.stringify(customerRes.data, null, 2));
}

runLiveTest();
