import User from './User.js';
import Team from './Team.js';
import Shift from './Shift.js';

// Relation between User and Team (Many-to-One)
User.belongsTo(Team, { foreignKey: 'teamId', as: 'team' });
Team.hasMany(User, { foreignKey: 'teamId', as: 'users' });

// Relation between User and Shift (One-to-Many)
User.hasMany(Shift, { foreignKey: 'userId', as: 'shifts' });
Shift.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { User, Team, Shift };
