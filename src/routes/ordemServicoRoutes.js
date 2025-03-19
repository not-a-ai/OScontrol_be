import { Router } from 'express';
import { atualizar, criar, visualizar } from '../controllers/ordemServicoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authOS from '../middlewares/authOS.js';
import authToken from '../middlewares/authToken.js';

const ordemServicoRoutes = Router();


ordemServicoRoutes.post('/', authMiddleware, criar);
ordemServicoRoutes.get('/:id', authOS, visualizar);
ordemServicoRoutes.patch('/:id', authToken , authOS , atualizar);

export default ordemServicoRoutes;
