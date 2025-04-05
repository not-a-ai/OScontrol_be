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
sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
    console.log("Banco de dados sincronizado!");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco de dados:", err);
  });

// Rotas
app.use("/usuario", usuarioRoutes);
app.use("/auth", authRoutes);
app.use("/os", ordemServicoRoutes);
app.use("/clientes", clientesRouter);
app.use("/servico", servicoRoutes);
