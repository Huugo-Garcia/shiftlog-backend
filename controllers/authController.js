import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const loginUser = async (req, res) => {
  const { payroll_number, password } = req.body;

  try {
    const user = await User.findOne({ where: { payroll_number } });
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Número de nómina o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: 'Número de nómina o contraseña incorrectos' });
    }

    // Genarate JWT token
    const token = jwt.sign(
      { id: user.id, payroll_number: user.payroll_number, is_admin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    

    res.json({ message: 'Login exitoso', token, is_admin: user.is_admin });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};
