import Team from '../models/Team.js';

const teams = [
  { name: 'Sin espeficiar' },
  { name: 'Ingeniate' },
  { name: 'Proameise' }
];

export const up = async (queryInterface, Sequelize) => {
  await Team.bulkCreate(teams);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Teams', null, {});
};
