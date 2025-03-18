const User = require('./user')(sequelize);
const OrdemServico = require('./ordemServico')(sequelize);

// Relacionamento
User.hasMany(OrdemServico, { foreignKey: 'gestorId', as: 'ordensGerenciadas' });
User.hasMany(OrdemServico, { foreignKey: 'tecnicoId', as: 'ordensTecnico' });

OrdemServico.belongsTo(User, { foreignKey: 'gestorId', as: 'gestor' });
OrdemServico.belongsTo(User, { foreignKey: 'tecnicoId', as: 'tecnico' });

export default { User, OrdemServico };
