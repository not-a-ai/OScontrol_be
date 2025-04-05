import express from "express";
import sequelize from "./database.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import ordemServicoRoutes from "./routes/ordemServicoRoutes.js";
import cors from "cors";
import clientesRouter from "./routes/clientesRoutes.js";
import servicoRoutes from "./routes/servicosRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

// Banco de dados
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado com sucesso.");

    await sequelize.sync({ alter: true }); // ou force: true, se for dev
    console.log("Modelos sincronizados com o banco.");

    app.listen(3000, () => console.log("Servidor rodando!"));
  } catch (err) {
    console.error("Erro ao conectar:", err);
  }
})();

// Rotas
app.use("/usuario", usuarioRoutes);
app.use("/auth", authRoutes);
app.use("/os", ordemServicoRoutes);
app.use("/clientes", clientesRouter);
app.use("/servico", servicoRoutes);
