import { Router } from "express";
import {
  atualizar,
  criar,
  deletar,
  visualizar,
  visualizarTodas,
} from "../controllers/ordemServicoController.js";
import authGestor from "../middlewares/authGestor.js";
import authOS from "../middlewares/authOS.js";
import authToken from "../middlewares/authToken.js";

const ordemServicoRoutes = Router();

ordemServicoRoutes.post("/", authGestor, criar);
ordemServicoRoutes.get("/:id", authToken, authOS, visualizar);
ordemServicoRoutes.get("/", authToken, visualizarTodas);
ordemServicoRoutes.patch("/:id", authToken, authOS, atualizar);
ordemServicoRoutes.delete("/:id", authGestor, deletar);

export default ordemServicoRoutes;
