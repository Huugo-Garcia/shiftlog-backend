import express from 'express';
import { loginValidationRules } from '../validators/authValidations.js';
import { validate } from '../middleware/validate.js';
import { loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginValidationRules, validate, loginUser);

export default router;
