import User from './User.js';
import Team from './Team.js';
import Shift from './Shift.js';

// Relation between User and Team (Many-to-One)
User.belongsTo(Team, { foreignKey: 'team_id', as: 'team' });
Team.hasMany(User, { foreignKey: 'team_id', as: 'users' });

// Relation between User and Shift (One-to-Many)
User.hasMany(Shift, { foreignKey: 'user_id', as: 'shifts' });
Shift.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export { User, Team, Shift };
