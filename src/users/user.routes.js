import { Router } from 'express';
import { createUser, getUsers } from './user.controller.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = Router();

router.post('/', createUser);
router.get('/', authenticate, getUsers);

export default router;
