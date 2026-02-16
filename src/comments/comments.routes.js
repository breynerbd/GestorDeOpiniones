// src/comments/comment.routes.js

import { Router } from 'express';
import { createComment, getComments } from './comments.controller.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = Router();

router.post('/', authenticate, createComment);  // Crear comentario
router.get('/', authenticate, getComments);  // Obtener todos los comentarios

export default router;
