import { check } from 'express-validator';

export const loginValidationRules = [
  check('payroll_number')
    .trim()
    .notEmpty()
    .withMessage('El número de nómina es requerido')
    .isNumeric()
    .withMessage('El número de nómina debe ser numérico')
    .isLength({ min: 4, max: 4 })
    .withMessage('El número de nómina debe tener 4 caracteres'),
  check('password').notEmpty().withMessage('La contraseña es requerida')
];
