'use strict';
import { QueryInterface, Sequelize } from 'sequelize';

export async function up(queryInterface, Sequelize) {
  await queryInterface.renameColumn('Usuarios', 'senha', 'senha_hash');
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.renameColumn('Usuarios', 'senha_hash', 'senha');
}
