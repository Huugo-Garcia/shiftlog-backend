import Shift from '../models/Shift.js';
import User from '../models/User.js';
import { Op, where } from 'sequelize';
import ExcelJS from 'exceljs';
import { calculateWorkedHours } from '../utils/dateUtils.js';

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
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Proporciona las fechas startDate y endDate en el formato YYYY-MM-DD' });
  }

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    end.setHours(23, 59, 59, 999);
    const shifts = await Shift.findAll({
      where: {
        start_time: {
          [Op.between]: [start,end]
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
      error: 'Error al obtener los turnos'
    });
  }
};


//Generate and download excel file
export const downloadShiftsExcel = async (req, res) => {
  const start = new Date(startDate);
    const end = new Date(endDate);

    end.set(23, 59, 59, 999);

  if (!startDate) {
    return res
      .status(400)
      .json({ error: 'Proporciona una fecha de inicio valida' });
  }

  try {
    const shifts = await Shift.findAll({
      where: {
        start_time: {
          [Op.between]: [start,end]
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

    // Generate Excel file
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Turnos');

    worksheet.columns = [
      { header: 'Número de Nómina', key: 'payroll_number', width: 20 },
      { header: 'Nombre', key: 'name', width: 30 },
      {
        header: 'Fecha/Hora de Entrada',
        key: 'start_time',
        width: 30,
        style: { numFmt: 'dd/mm/yyyy hh:mm:ss' }
      },
      {
        header: 'Fecha/Hora de Salida',
        key: 'end_time',
        width: 30,
        style: { numFmt: 'dd/mm/yyyy hh:mm:ss' }
      },
      { header: 'Horas de Trabajo', key: 'worked_hours', width: 20 }
    ];

    shifts.forEach((shift) => {
      const { start_time, end_time, user } = shift.dataValues;
      const { payroll_number, first_name, last_name } = user.dataValues;

      worksheet.addRow({
        payroll_number,
        name: `${first_name} ${last_name}`,
        start_time,
        end_time: end_time || '--',
        worked_hours: end_time
          ? calculateWorkedHours(start_time, end_time)
          : '--'
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=turnos.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Error al generar el archivo de Excel'
    });
  }
};
