import sequelize from "../database.js";
import Usuario from "./usuario.js";
import OrdemServico from "./ordemServico.js";

// Definir as associações
Usuario.hasMany(OrdemServico, {
  foreignKey: "gestor_id",
  as: "ordensGerenciadas",
});
Usuario.hasMany(OrdemServico, {
  foreignKey: "tecnico_id",
  as: "ordensTecnico",
});

OrdemServico.belongsTo(Usuario, { foreignKey: "gestor_id", as: "gestor" });
OrdemServico.belongsTo(Usuario, { foreignKey: "tecnico_id", as: "tecnico" });

// Certifique-se de que está chamando o método associate para cada modelo
Usuario.associate && Usuario.associate(sequelize.models);
OrdemServico.associate && OrdemServico.associate(sequelize.models);

export default { Usuario, OrdemServico };
