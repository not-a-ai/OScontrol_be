import { Router } from 'express';
import { atualizar, criar, visualizar } from '../controllers/ordemServicoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authEditarOS from '../middlewares/authGestorOuTecnico.js';
import autenticaToken from '../middlewares/autenticaToken.js';

const ordemServicoRoutes = Router();


ordemServicoRoutes.post('/', authMiddleware, criar);
ordemServicoRoutes.get('/:id', authMiddleware, visualizar);
ordemServicoRoutes.patch('/:id', autenticaToken , authEditarOS , atualizar);

export default ordemServicoRoutes;
