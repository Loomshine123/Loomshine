import dotenv from 'dotenv';
dotenv.config();

/**
 * Single Controlled Live Test Script for Dual Gallabox WhatsApp Templates
 * 1. Team Template: loomshine_new_pickup_request -> 918877286066 (6 variables)
 * 2. Customer Confirmation: loomshine_pickup_confirmation -> 917877161550 (4 variables)
 */

async function postGallabox(payload) {
  const apiKey = process.env.GALLABOX_API_KEY;
  const apiSecret = process.env.GALLABOX_API_SECRET;
  const endpoint = 'https://server.gallabox.com/devapi/messages/whatsapp';

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

async function runDualLiveTest() {
  console.log('--- Executing Controlled Live Gallabox Dual Template Test ---\n');

  const channelId = process.env.GALLABOX_CHANNEL_ID || '6aa11ad775795e015df71b70';
  const teamTemplateName = process.env.GALLABOX_PICKUP_TEMPLATE_NAME || 'loomshine_new_pickup_request';
  const customerTemplateName = process.env.GALLABOX_PICKUP_CONFIRMATION_TEMPLATE_NAME || 'loomshine_pickup_confirmation';
  const teamPhone = process.env.GALLABOX_PICKUP_TEAM_PHONE || '918877286066';
  const testCustomerPhone = '917877161550';

  // 1. Team Notification Payload (loomshine_new_pickup_request)
  const teamPayload = {
    channelId,
    channelType: 'whatsapp',
    recipient: {
      name: 'Loomshine Team',
      phone: teamPhone
    },
    whatsapp: {
      type: 'template',
      template: {
        templateName: teamTemplateName,
        bodyValues: {
          "1": "Loomshine Test Customer",
          "2": testCustomerPhone,
          "3": "Morning (9 AM – 12 PM)",
          "4": "Wash & Fold, Steam Press",
          "5": "Sector 57, Gurugram",
          "6": "Sector 57"
        }
      }
    }
  };

  // 2. Customer Confirmation Payload (loomshine_pickup_confirmation)
  const customerPayload = {
    channelId,
    channelType: 'whatsapp',
    recipient: {
      name: 'Loomshine Test Customer',
      phone: testCustomerPhone
    },
    whatsapp: {
      type: 'template',
      template: {
        templateName: customerTemplateName,
        bodyValues: {
          "1": "Loomshine Test Customer",
          "2": "Morning (9 AM – 12 PM)",
          "3": "Wash & Fold, Steam Press",
          "4": "Sector 57, Gurugram"
        }
      }
    }
  };

  console.log('[Sanitized Team Payload]:', JSON.stringify(teamPayload, null, 2));
  const teamRes = await postGallabox(teamPayload);
  console.log(`\n[Team Gallabox HTTP Status]: ${teamRes.status}`);
  console.log('[Team Gallabox Response]:', teamRes.data);

  console.log('\n----------------------------------------\n');

  console.log('[Sanitized Customer Payload]:', JSON.stringify(customerPayload, null, 2));
  const customerRes = await postGallabox(customerPayload);
  console.log(`\n[Customer Gallabox HTTP Status]: ${customerRes.status}`);
  console.log('[Customer Gallabox Response]:', customerRes.data);
}

runDualLiveTest();
