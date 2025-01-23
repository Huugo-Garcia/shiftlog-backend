import Shift from '../models/Shift.js';
import User from '../models/User.js';
import { Op, where } from 'sequelize';
import {
  getStartOfPayrollPeriod,
  getEndOfPayrollPeriod
} from '../utils/dateUtils.js';

// Get all shifts
export const getShifts = async (req, res) => {
  try {
    const shifts = await Shift.findAll();
    res.json(shifts);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener el registo de turnos'
    });
  }
};

// Handle shifts
export const handleShift = async (req, res) => {
  const { start_time, end_time, start_location, end_location, user_id } =
    req.body;

  try {
    // Search a active shift
    let shift = await Shift.findOne({
      where: {
        user_id,
        end_time: null,
        end_location: null
      }
    });

    if (shift) {
      // If the shift is active, update with end_status
      shift.end_time = end_time;
      shift.end_location = end_location;
      await shift.save();
      res.json(shift);
    } else {
      // If dont exist active shift create a new shift
      shift = await Shift.create({
        user_id,
        start_time,
        start_location
      });

      res.status(201).json(shift);
    }
  } catch (error) {
    res.status(500).json({ error: 'Algo salió mal intentalo nuevamente.' });
  }
};

// Get shifts of any period
export const getShiftsOfWeek = async (req, res) => {
  const { startDate } = req.query;

  if (!startDate) {
    return res
      .status(400)
      .json({ error: 'Proporciona una fecha de inicio valida' });
  }

  const startOfWeek = getStartOfPayrollPeriod(new Date(startDate));
  const endOfWeek = getEndOfPayrollPeriod(new Date(startDate));

  console.log('Start of Week:', startOfWeek);
  console.log('End of Week:', endOfWeek);

  try {
    const shifts = await Shift.findAll({
      where: {
        start_time: {
          [Op.between]: [startOfWeek, endOfWeek]
        }
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name', 'payroll_number']
        }
      ]
    });
    res.json(shifts);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Error al obtener los turnos de la semana'
    });
  }
};
