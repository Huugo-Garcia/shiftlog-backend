import { generatePassword } from '../utils/password.js';

// Method to generate a random password
export const generateRandomPassword = (req, res) => {
  const password = generatePassword();
  res.json({ password });
};
