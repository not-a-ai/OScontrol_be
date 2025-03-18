import { Router } from 'express';
import { criar, visualizar } from '../controllers/ordemServicoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const ordemServicoRoutes = Router();


ordemServicoRoutes.post('/', authMiddleware, roleMiddleware('gestor'), criar);
ordemServicoRoutes.get('/:id', authMiddleware, roleMiddleware('gestor', 'tecnico'), visualizar);

export default ordemServicoRoutes;
