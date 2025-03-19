// Exemplo de migração para adicionar chaves estrangeiras
export async function up(queryInterface, Sequelize) {
  await queryInterface.addConstraint('Ordem_Servicos', {
    fields: ['gestor_id'],
    type: 'foreign key',
    name: 'fk_gestor_id',
    references: {
      table: 'Usuarios', // Tabela referenciada
      field: 'id' // Campo na tabela referenciada
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  await queryInterface.addConstraint('Ordem_Servicos', {
    fields: ['tecnico_id'],
    type: 'foreign key',
    name: 'fk_tecnico_id',
    references: {
      table: 'Usuarios',
      field: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.removeConstraint('Ordem_Servicos', 'fk_gestor_id');
  await queryInterface.removeConstraint('Ordem_Servicos', 'fk_tecnico_id');
}
