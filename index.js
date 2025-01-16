import express from 'express';
import db from './config/db.js';
import cors from 'cors';
// import './models/Index.js;
import User from './models/User.js';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import shiftRoutes from './routes/shiftRoutes.js';
import passwordRoutes from './routes/passwordRoutes.js';

const app = express();

// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:5173'
  })
);

// Requirements in JSON
app.use(express.json());

// Connection to user routes
app.use('/api', userRoutes);

// Connection to auth routes
app.use('/api', authRoutes);

// Conection to password routes
app.use('/api', passwordRoutes);

// Connection to shift routes
app.use('/api', shiftRoutes);

// Conection to database
try {
  await db.authenticate();
  db.sync();
  console.log('Connection has been established successufully');
} catch (error) {
  console.error('Unable to connect to the database: ', error);
}

// Port selection
const port = 3000;

app.listen(port, () => {
  console.log(`Server works in port ${port}`);
});
