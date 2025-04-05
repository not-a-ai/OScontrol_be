import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Cliente = sequelize.define(
  "Cliente",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Usuarios",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "Clientes",
  }
);

Cliente.associate = (models) => {
  Cliente.belongsTo(models.Usuario, { foreignKey: "user_id", as: "usuario" });
  Cliente.hasMany(models.OrdemServico, {
    foreignKey: "client_id",
    as: "ordens",
  });
};

export default Cliente;
