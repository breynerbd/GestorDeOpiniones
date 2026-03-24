import { Router } from 'express';
import { createPublication, getPublications, updatePublication, deletePublication } from './publication.controller.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = Router();

router.post('/', authenticate, createPublication);
router.get('/', authenticate, getPublications);
router.put('/:id', authenticate, updatePublication);
router.delete('/:id', authenticate, deletePublication);

export default router;
