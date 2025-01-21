import express from 'express';
import {
  handleShift,
  getShiftsOfWeek
} from '../controllers/shiftController.js';

const router = express.Router();

// Handle shifts
router.post('/shifts', handleShift);

// Get the shifts for a period week
router.get('/shifts/week', getShiftsOfWeek);

export default router;
