import express from 'express';
import { handleShift } from '../controllers/shiftController.js';

const router = express.Router();

router.post('/shifts', handleShift);

export default router;
