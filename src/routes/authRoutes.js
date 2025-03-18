import { Router } from 'express';
import login from '../controllers/authController.js';

const authRoutes = Router();


authRoutes.post('/login', login);

export default authRoutes;
