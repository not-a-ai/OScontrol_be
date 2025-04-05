import { Router } from "express";

import authGestor from "../middlewares/authGestor.js";
import authToken from "../middlewares/authToken.js";
import {
  atualizar,
  criar,
  deletar,
  visualizar,
  visualizarTodas,
} from "../controllers/servicoController.js";

const servicoRoutes = Router();

servicoRoutes.post("/", authGestor, criar);
servicoRoutes.get("/:id", authToken, visualizar);
servicoRoutes.get("/", authToken, visualizarTodas);
servicoRoutes.put("/:id", authToken, atualizar);
servicoRoutes.delete("/:id", authGestor, deletar);

export default servicoRoutes;
