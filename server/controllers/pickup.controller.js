import { createPickupBooking } from '../services/pickup.service.js';

/**
 * Pickup Booking Controller
 * POST /api/pickup-booking
 */
export const handlePickupBooking = async (req, res) => {
  try {
    const result = await createPickupBooking(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Pickup Booking Controller Error:', error.message);

    const statusCode = error.statusCode || 500;
    
    // Return customer-friendly error message without exposing stack traces or internals
    return res.status(statusCode).json({
      success: false,
      message: statusCode === 400 
        ? error.message 
        : "We could not send your pickup request. Please try again.",
      errors: error.validationErrors || undefined
    });
  }
};
