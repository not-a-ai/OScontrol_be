"use strict";

import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Servico = sequelize.define(
  "Servico",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    precoBase: {
      type: DataTypes.DECIMAL(10, 2),
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
    },
  },
  {}
);

Servico.associate = function (models) {
  Servico.belongsTo(models.Usuario, {
    foreignKey: "user_id",
    as: "criador",
  });
};

export default Servico;
