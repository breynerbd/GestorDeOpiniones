import { Router } from 'express';
import { createUser, getUsers } from './user.controller.js';
import { authenticate } from '../../middlewares/authenticate.js'; // Si quieres proteger rutas

const router = Router();

// Crear usuario
router.post('/', createUser);

// Obtener todos los usuarios (opcional, protegido)
router.get('/', authenticate, getUsers);

export default router;
