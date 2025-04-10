// models/Atendimento.js
import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Atendimento = sequelize.define(
  "Atendimento",
  {
    ordem_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Ordem_Servicos",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    tecnico_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Usuarios",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    diagnostico: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    solucao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    observacao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "Atendimentos",
  }
);

// Associação com OrdemServico e Técnico
Atendimento.associate = (models) => {
  Atendimento.belongsTo(models.OrdemServico, {
    foreignKey: "ordem_id",
    as: "ordem",
  });

  Atendimento.belongsTo(models.Usuario, {
    foreignKey: "tecnico_id",
    as: "tecnico",
  });
};

export default Atendimento;
