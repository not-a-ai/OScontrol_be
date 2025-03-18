import { Router } from 'express';
import { criar, visualizar } from '../controllers/ordemServicoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const ordemServicoRoutes = Router();


ordemServicoRoutes.post('/', authMiddleware, criar);
ordemServicoRoutes.get('/:id', authMiddleware, visualizar);

export default ordemServicoRoutes;
