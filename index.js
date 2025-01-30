import express from 'express';
import db from './config/db.js';
import cors from 'cors';
import './models/index.js';
// import User from './models/User.js';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import shiftRoutes from './routes/shiftRoutes.js';
import passwordRoutes from './routes/passwordRoutes.js';
import teamRoutes from './routes/teamRoutes.js';

const app = express();

// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Contection to team routes
app.use('/api', teamRoutes);

// Conection to database
try {
  await db.authenticate();
  db.sync();
  console.log('Connection has been established successufully');
} catch (error) {
  console.error('Unable to connect to the database: ', error);
}

// Port selection
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server works in port ${port}`);
});
