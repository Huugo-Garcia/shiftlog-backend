import User from '../models/User.js';
import Team from '../models/Team.js';
import bcrypt from 'bcrypt';

// Method to get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Team,
          as: 'team',
          attributes: ['name']
        }
      ]
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Method to create a new user
export const createUser = async (req, res) => {
  const {
    payroll_number,
    first_name,
    last_name,
    phone_number,
    password,
    is_admin,
    team_id
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      payroll_number,
      first_name,
      last_name,
      phone_number,
      password: hashedPassword,
      is_admin,
      team_id
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Method to get a user by id
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: {
        id
      }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Method to update a user by id
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    payroll_number,
    first_name,
    last_name,
    phone_number,
    password,
    is_admin,
    team_id
  } = req.body;

  try {
    const user = await User.findOne({
      where: {
        id
      }
    });

    if (user) {
      user.payroll_number = payroll_number;
      user.first_name = first_name;
      user.last_name = last_name;
      user.phone_number = phone_number;
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
      user.is_admin = is_admin;
      user.team_id = team_id;

      await user.save();
      res.json(user);
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Method to delete a user by id
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: {
        id
      }
    });

    if (user) {
      await user.destroy();
      res.json({
        message: 'User deleted'
      });
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
