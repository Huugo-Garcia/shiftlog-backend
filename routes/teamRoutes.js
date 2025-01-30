import express from 'express';
import { getTeams } from '../controllers/teamController.js';

const router = express.Router();

router.get('/teams', getTeams);

export default router;
