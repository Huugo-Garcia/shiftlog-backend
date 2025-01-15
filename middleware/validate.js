import { validationResult } from 'express-validator';

// This middleware function will check if there are any validation errors
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};
