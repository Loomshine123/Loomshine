import { Router } from 'express';
import { handlePickupBooking } from '../controllers/pickup.controller.js';

const router = Router();

// POST /api/pickup-booking
router.post('/pickup-booking', handlePickupBooking);

export default router;
