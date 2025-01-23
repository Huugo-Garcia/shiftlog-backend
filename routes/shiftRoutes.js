import express from 'express';
import {
  handleShift,
  getShiftsOfWeek,
  getShiftByID
} from '../controllers/shiftController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Handle shifts
router.post('/shifts', handleShift);

// Get the shifts for a period week
router.get('/shifts/week', getShiftsOfWeek);

//Get a specific shoift
router.get('/shifts/:id', getShiftByID);

export default router;
