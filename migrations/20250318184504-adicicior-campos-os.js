'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Ordem_Servicos', 'gestor_id', {
    type: Sequelize.INTEGER,
    allowNull: true, 
    references: {
      model: 'Usuarios', 
      key: 'id' 
    },
    onUpdate: 'CASCADE', 
    onDelete: 'SET NULL',
  });

  await queryInterface.addColumn('Ordem_Servicos', 'tecnico_id', {
    type: Sequelize.INTEGER,
    allowNull: true, 
    references: {
      model: 'Usuarios', 
      key: 'id' 
    },
    onUpdate: 'CASCADE', 
    onDelete: 'SET NULL', 
  });
}
export async function down(queryInterface, Sequelize) {
  // Caso a migration precise ser revertida, remova
}
