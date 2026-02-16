// src/publication/publication.routes.js

import { Router } from 'express';
import { createPublication, getPublications } from './publication.controller.js';
import { authenticate } from '../../middlewares/authenticate.js';  // Suponiendo que tienes un middleware de autenticación

const router = Router();

router.post('/', authenticate, createPublication);  // Crear publicación
router.get('/', getPublications);  // Obtener todas las publicaciones

export default router;
