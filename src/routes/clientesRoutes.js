import { Router } from "express";
import {
  atualizarCliente,
  buscarClientePorId,
  criarCliente,
  deletarCliente,
  listarClientes,
} from "../controllers/clienteController.js";
import authToken from "../middlewares/authToken.js";

const clientesRoutes = Router();

clientesRoutes.post("/", authToken, criarCliente);
clientesRoutes.get("/", authToken, listarClientes);
clientesRoutes.get("/:id", authToken, buscarClientePorId);
clientesRoutes.put("/:id", authToken, atualizarCliente);
clientesRoutes.delete("/:id", authToken, deletarCliente);

export default clientesRoutes;
