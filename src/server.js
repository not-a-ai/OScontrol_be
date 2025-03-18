import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './database.js';
import usuarioRoutes from './routes/usuario.js';

const app = express();
app.use(express.json());

// Banco de dados
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Banco de dados sincronizado!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });

// Rotas
app.use('/usuario', usuarioRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
