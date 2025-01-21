import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Shift = db.define('shifts', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },

  start_time: {
    type: DataTypes.DATE,
    allowNull: false
  },

  end_time: {
    type: DataTypes.DATE,
    allowNull: true
  },

  start_location: {
    type: DataTypes.STRING,
    allowNull: false
  },

  end_location: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

export default Shift;
