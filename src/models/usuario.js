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

// Função para definir associações
Usuario.associate = (models) => {
  // Um usuário pode ter muitas ordens (gestor ou técnico)
  Usuario.hasMany(models.OrdemServico, { foreignKey: 'gestor_id', as: 'ordensGerenciadas' });
  Usuario.hasMany(models.OrdemServico, { foreignKey: 'tecnico_id', as: 'ordensTecnico' });
};

export default Usuario;
