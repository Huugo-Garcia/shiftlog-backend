import Shift from '../models/Shift.js';

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
