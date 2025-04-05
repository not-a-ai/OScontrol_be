import sequelize from "../database.js";

// Importa os models
import Usuario from "./usuario.js";
import Cliente from "./cliente.js";
import OrdemServico from "./ordem_servicos.js";

// Inicializa os models (se necessário)
const models = {
  Usuario,
  Cliente,
  OrdemServico,
};

// Executa as associações, passando todos os models como argumento
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Exporta os models e a instância do sequelize
export { sequelize };
export default models;
