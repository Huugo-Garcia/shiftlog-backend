import Team from '../models/Team.js';

export const getTeams = async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
