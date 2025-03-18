import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import bcrypt from 'bcrypt';

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('gestor', 'tecnico'),
    allowNull: false
  }
}, {
  tableName: 'Usuarios'
});

Usuario.prototype.validPassword = async function (senha) {
  return bcrypt.compare(senha, this.senha_hash);
};

export default Usuario;
