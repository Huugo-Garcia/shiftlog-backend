import express from 'express';
import {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
  changePassword
} from '../controllers/userController.js';
import {
  createUserValidationsRules,
  updateUserValidationRules,
  changePasswordValidationRules
} from '../validators/userValidations.js';
import { validate } from '../middleware/validate.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all the users
router.get('/users', protect, getUsers);

// Create a new user
router.post(
  '/users',
  //protect,
  createUserValidationsRules,
  validate,
  createUser
);

// Get a user by id
router.get('/users/:id', protect, getUserById);

// Update a user by id
router.put(
  '/users/:id',
  protect,
  updateUserValidationRules,
  validate,
  updateUser
);

// Delete a user by id
router.delete('/users/:id', protect, deleteUser);

// Change password
router.put(
  '/users/:id/change-password',
  protect,
  changePasswordValidationRules,
  validate,
  changePassword
);

export default router;
