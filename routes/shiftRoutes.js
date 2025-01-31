import express from 'express';
import {
  handleShift,
  getShiftsOfWeek,
  downloadShiftsExcel
} from '../controllers/shiftController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Handle shifts
router.post('/shifts', protect, handleShift);

// Get the shifts for a period week
router.get('/shifts/week', protect, getShiftsOfWeek);

// Download excel file
router.get('/shifts/excel', protect, downloadShiftsExcel);

export default router;
