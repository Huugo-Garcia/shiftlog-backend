import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const User = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  payroll_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  phone_number: {
    type: DataTypes.STRING,
    allowNull: false
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

export default User;
