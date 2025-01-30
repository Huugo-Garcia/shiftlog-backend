import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const db = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: 'mysql',
    define: {
      timestamps: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 3000,
      idle: 10000,
    },
    operatorAliases: false,
  },
);

export default db;
