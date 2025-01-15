import express from 'express';
import { generateRandomPassword } from '../controllers/passwordController.js';

const router = express.Router();

// Generate password
router.get('/generate-password', generateRandomPassword);

export default router;
