import { check } from 'express-validator';
import User from '../models/User.js';

// This array contains the rules to validate the user data
export const createUserValidationsRules = [
  check('payroll_number')
    .trim()
    .notEmpty()
    .withMessage('El número de nómina es requerido')
    .isNumeric()
    .withMessage('El número de nómina debe ser numérico')
    .isLength({ min: 4, max: 4 })
    .withMessage('El número de nómina debe tener 4 caracteres')
    .custom(async (payroll_number) => {
      const user = await User.findOne({ where: { payroll_number } });
      if (user) {
        throw new Error('El número de nómina ya está en uso');
      }
      return true;
    }),
  check('first_name').notEmpty().withMessage('El nombre es requerido'),
  check('last_name').notEmpty().withMessage('El apellido es requerido'),
  check('phone_number')
    .isMobilePhone('es-MX')
    .withMessage('El número de teléfono es inválido'),
  check('password').notEmpty().withMessage('La contraseña es requerida')
];

export const updateUserValidationRules = [
  check('payroll_number')
    .trim()
    .notEmpty()
    .withMessage('El número de nómina es requerido')
    .isNumeric()
    .withMessage('El número de nómina debe ser numérico')
    .isLength({ min: 4, max: 4 })
    .withMessage('El número de nómina debe tener 4 caracteres')
    .custom(async (payroll_number, { req }) => {
      const user = await User.findOne({ where: { payroll_number } });
      if (user && user.id !== parseInt(req.params.id, 10)) {
        throw new Error('El número de nómina ya está en uso');
      }
      return true;
    }),
  check('first_name').notEmpty().withMessage('El nombre es requerido'),
  check('last_name').notEmpty().withMessage('El apellido es requerido'),
  check('phone_number')
    .isMobilePhone('es-MX')
    .withMessage('El número de teléfono es inválido'),
  check('password')
    .optional()
    .notEmpty()
    .withMessage('La contraseña es requerida')
];
