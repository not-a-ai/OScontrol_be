// routes/atendimentos.js
import express from "express";
import {
  criarAtendimento,
  deletarAtendimento,
  listarAtendimentosPorOrdem,
  listarTodosAtendimentos,
} from "../controllers/atendimentoController.js";
import authToken from "../middlewares/authToken.js";

const atendimentoRoutes = express.Router();

atendimentoRoutes.post("/:ordem_id", authToken, criarAtendimento);
atendimentoRoutes.get("/:ordem_id", authToken, listarAtendimentosPorOrdem);
atendimentoRoutes.get("", authToken, listarTodosAtendimentos);
atendimentoRoutes.delete("/:atendimento_id", authToken, deletarAtendimento);

export default atendimentoRoutes;
