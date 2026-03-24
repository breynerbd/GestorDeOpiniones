import { Router } from 'express';
import { createComment, getCommentsByPublication, updateComment, deleteComment, getComments, getMyComments } from './comments.controller.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = Router();

router.post('/', authenticate, createComment);

router.get('/mycomments', authenticate, getMyComments);

router.get('/', authenticate, getComments);
router.get('/:publicationId', authenticate, getCommentsByPublication);

router.put('/:id', authenticate, updateComment);
router.delete('/:id', authenticate, deleteComment);

export default router;
