import express from 'express';
import {
  handleShift,
  getShiftsOfWeek,
  downloadShiftsExcel
} from '../controllers/shiftController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Handle shifts
router.post('/shifts', handleShift);

// Get the shifts for a period week
router.get('/shifts/week', getShiftsOfWeek);

// Download excel file
router.get('/shifts/excel', downloadShiftsExcel);

export default router;
