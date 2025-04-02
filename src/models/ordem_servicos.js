import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const OrdemServico = sequelize.define(
  "OrdemServico",
  {
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("aberta", "em_andamento", "concluida", "cancelada"),
      allowNull: false,
      defaultValue: "aberta",
    },
    data_abertura: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    data_fechamento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    valor_final: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gestor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tecnico_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Ordem_Servicos",
  }
);

OrdemServico.associate = (models) => {
  OrdemServico.belongsTo(models.Usuario, {
    foreignKey: "gestor_id",
    as: "gestor",
  });

  OrdemServico.belongsTo(models.Usuario, {
    foreignKey: "tecnico_id",
    as: "tecnico",
  });
};

export default OrdemServico;
