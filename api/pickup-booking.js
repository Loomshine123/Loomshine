import dotenv from 'dotenv';
import { createPickupBooking } from '../server/services/pickup.service.js';

dotenv.config();

/**
 * Vercel Serverless Function Handler
 * POST /api/pickup-booking
 */
export default async function handler(req, res) {
  // CORS Headers for Vercel Serverless Deployment
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
    return;
  }

  try {
    const result = await createPickupBooking(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Vercel Serverless Pickup Controller Error:', error.message);

    const statusCode = error.statusCode || 500;
    
    return res.status(statusCode).json({
      success: false,
      message: statusCode === 400 
        ? error.message 
        : 'We could not send your pickup request. Please try again.',
      errors: error.validationErrors || undefined
    });
  }
}
