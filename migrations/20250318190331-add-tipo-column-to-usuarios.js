'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Usuarios', 'tipo', {
    type: Sequelize.STRING, // ou outro tipo, dependendo do necessário
    allowNull: true, // ou false, dependendo da sua necessidade
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Usuarios', 'tipo');
}
